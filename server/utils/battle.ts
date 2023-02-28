import moment from 'moment/moment'
import { BATTLE_KIND } from '~/constants'
import {
  BattleSchema,
  BossCreatorSchema,
  BossDataSchema,
  MonsterSchema,
  PlayerSchema,
  PlayerStatusSchema, SendKnbRewardSystemMail, reviveBossElite,
} from '~/server/schema'
import { isBossDaily, isBossElite, isBossFrameTime, isNormalMonster } from '~/server/utils/war'
import type { BattleRequest, BossDaily, PlayerInfo } from '~/types'
import { PlayerStatusTypeCon } from '~/types'

const handleTargetNormal = async (_p: PlayerInfo) => {
  const now = new Date().getTime()
  const battle = await BattleSchema
    .findOne(
      {
        sid: _p.player.sid,
        kind: BATTLE_KIND.PVE,
        winner: _p.player._id,
      })
    .sort({
      createdAt: -1,
    })
    .select('match reward createdAt winner kind')

  if (battle) {
    // Clear pve history
    await BattleSchema.deleteMany({
      _id: {
        $nin: [battle._id],
      },
      kind: BATTLE_KIND.PVE,
      sid: _p.player.sid,
    })

    const playerStatus = await PlayerStatusSchema
      .findOne({
        sid: _p.player.sid,
        type: PlayerStatusTypeCon.reduce_waiting_time_training,
        timeLeft: {
          $gte: new Date().getTime(),
        },
      })
      .select('value')

    // validate
    let ms = 5000
    if (playerStatus && playerStatus.value)
      ms -= (ms / 100) * playerStatus.value

    const doRefresh = new Date((battle.createdAt) as string).getTime() + ms
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        match: battle.match,
        reward: battle.reward,
        winner: battle.winner,
        kind: battle.kind,
      }
    }
  }

  return {
    inRefresh: false,
  }
}

const handleTargetFrameTime = async (_p: PlayerInfo) => {
  const now = new Date().getTime()

  const battle = await BattleSchema
    .findOne({ sid: _p.player.sid, kind: BATTLE_KIND.BOSS_FRAME_TIME })
    .sort({ createdAt: -1 }).select('match reward createdAt winner kind')

  if (battle) {
    // validate
    const doRefresh = new Date((battle.createdAt as string)).getTime() + 60000
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        match: battle.match,
        reward: battle.reward,
        winner: battle.winner,
        kind: battle.kind,
        damageList: battle.damageList,
      }
    }
  }

  return {
    inRefresh: false,
  }
}

const handleTargetElite = async (sid: string) => {
  const now = new Date().getTime()

  const battle = await BattleSchema
    .findOne({ sid, kind: BATTLE_KIND.BOSS_ELITE })
    .sort({ createdAt: -1 }).select('match reward createdAt winner kind')

  if (battle) {
    // validate
    const doRefresh = new Date(battle.createdAt!).getTime() + 60000
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        match: battle.match,
        reward: battle.reward,
        winner: battle.winner,
        kind: battle.kind,
        damageList: battle.damageList,
      }
    }
  }

  return {
    inRefresh: false,
  }
}

const handleTargetDaily = async (_p: PlayerInfo, battleRequest: BattleRequest, _enemyObj: Partial<BossDaily>) => {
  const now = new Date().getTime()
  const today = moment().startOf('day')

  const battle = await BattleSchema.find({
    sid: _p.player.sid,
    kind: BATTLE_KIND.BOSS_DAILY,
    targetId: _enemyObj._id,
    createdAt: {
      $gte: moment().startOf('day'),
      $lte: moment(today).endOf('day').toDate(),
    },
  }).select('match reward winner kind')

  if (!battle.length) {
    return {
      inRefresh: false,
    }
  }

  const numberOfBattle = battle.length
  if (numberOfBattle >= _enemyObj.numberOfTurn!) {
    return {
      inRefresh: true,
      refreshTime: new Date(moment(today).endOf('day').toDate()).getTime() - now,
      match: battle[0].match,
      reward: battle[0].reward,
      winner: battle[0].winner,
      kind: battle[0].kind,
      damageList: battle[0].damageList,
    }
  }

  return {
    inRefresh: false,
  }
}

export const handleBeforeStartWar = async (battleRequest: BattleRequest, _p: PlayerInfo) => {
  const battleTargetType = battleRequest.target.type ?? ''

  if (isNormalMonster(battleTargetType)) {
    const _enemyObj = await MonsterSchema.findOne({ id: battleRequest.target.id })
    if (battleRequest?.skip) {
      return {
        _enemyObj,
        inRefresh: false,
      } as any
    }

    return {
      _enemyObj,
      ...await handleTargetNormal(_p),
    } as any
  }

  if (isBossDaily(battleTargetType)) {
    const _enemyObj = await BossDataSchema.findOne({ id: battleRequest.target.id })

    return {
      _enemyObj,
      ...await handleTargetDaily(_p, battleRequest, (_enemyObj as BossDaily)),
    } as any
  }

  if (isBossFrameTime(battleTargetType)) {
    const _enemyObj = await BossCreatorSchema.findById(battleRequest.target.id)
    return {
      _enemyObj,
      ...await handleTargetFrameTime(_p),
    } as any
  }

  if (isBossElite(battleTargetType)) {
    const _enemyObj = await BossCreatorSchema.findById(battleRequest.target.id)
    return {
      _enemyObj,
      ...await handleTargetElite(_p.player.sid),
    } as any
  }
}

export const afterNormal = async (sid: string, isWinner: boolean) => {
  if (isWinner)
    return

  await PlayerSchema.findOneAndUpdate({ sid }, {
    $inc: {
      midId: -1,
    },
  })
}

export const afterBossFrameTimeWar = async (targetId?: string, options?: {
  selfDamage: number
  isWinner: boolean
  playerName: string
  sid: string
}) => {
  if (!options)
    return

  if (options.selfDamage <= 0)
    return

  await BossCreatorSchema.findOneAndUpdate({ _id: targetId }, {
    $inc: {
      'attribute.hp': -options.selfDamage,
    },
  })

  await BossCreatorSchema.findOneAndUpdate({ _id: targetId }, {
    death: true,
    killer: {
      name: options.playerName,
      sid: options.sid,
    },
  })
}

export const afterEliteEndWar = async (targetId?: string, options?: {
  selfDamage: number
  isWinner: boolean
  playerName: string
  sid: string
}) => {
  if (!options)
    return

  if (options.selfDamage <= 0)
    return

  // Todo: Update hp for boss
  await BossCreatorSchema.findOneAndUpdate({ _id: targetId }, {
    $inc: {
      'attribute.hp': -options.selfDamage,
    },
  })

  if (!options.isWinner)
    return

  // Todo: Handle case boss death
  const eliteBossUpdated = await BossCreatorSchema.findOneAndUpdate({ _id: targetId }, {
    death: true,
    killer: {
      name: options.playerName,
      sid: options.sid,
    },
  })

  const bossHpMaximum = eliteBossUpdated?.hp
  const baseReward = eliteBossUpdated?.reward?.base

  // Todo: Lấy danh người chơi sát thương lên boss
  const topDMG = await BattleSchema.aggregate(
    [
      {
        $match: {
          targetId: eliteBossUpdated?._id,
        },
      },
      {
        $group:
                    {
                      _id: '$sid',
                      totalDamage: { $sum: { $multiply: ['$damageList.self'] } },
                      sid: {
                        $first: '$sid',
                      },
                      name: {
                        $first: '$player.name',
                      },
                    },
      },
      {
        $sort: {
          totalDamage: -1,
        },
      },
      {
        $limit: 1,
      },
    ],
  )

  // Todo: Send mail trao thưởng cho người kill boss
  await SendKnbRewardSystemMail(options.sid, baseReward?.kill, {
    note: `Đạo hữu thành công trở thành người ra đòn kết liễu boss ${eliteBossUpdated?.name}`,
    title: 'Thưởng kích sát boss',
  })

  // // Log Lại reward
  // await RewardLogSchema.findOneAndUpdate({
  //   targetId: eliteBossUpdated?._id,
  //   sid: options.sid,
  // }, {
  //   $inc: {
  //     'reward.kill': baseReward?.kill,
  //     'reward.bag': 0,
  //     'reward.top': 0,
  //   },
  // }, {
  //   new: true,
  //   upsert: true,
  // })

  if (topDMG.length > 0) {
    // Todo: Trao thưởng cho người chơi gây sát thương lên boss cao nhất
    await SendKnbRewardSystemMail(topDMG[0].sid, baseReward?.top, {
      note: `Đạo hữu thành công trở thành người gây sát thương nhiều nhất lên boss ${eliteBossUpdated?.name} với sát thương ${topDMG[0].totalDamage}`,
      title: 'Thưởng kích sát boss',
    })

    // // Thưởng sát thương cao nhất
    // await RewardLogSchema.findOneAndUpdate({
    //   targetId: eliteBossUpdated?._id,
    //   sid: topDMG[0].sid,
    // }, {
    //   $inc: {
    //     'reward.kill': 0,
    //     'reward.bag': 0,
    //     'reward.top': eliteBossUpdated?.reward?.base.top,
    //   },
    // }, {
    //   new: true,
    //   upsert: true,
    // })

    // Todo: Chia đều phần thưởng dựa theo sát thương gây ra
    for (let i = 0; i < topDMG.length; i++) {
      const damage = topDMG[i].totalDamage
      const sid = topDMG[i].sid

      const perDamage = (damage / bossHpMaximum!) * 100
      if (perDamage > 2) {
        const selfReward = (baseReward!.bag * perDamage) / 100

        if (selfReward <= 0)
          continue

        await SendKnbRewardSystemMail(sid, Math.round(selfReward), {
          note: `Tham gia kích sát boss ${eliteBossUpdated?.name} với sát thương ${damage}`,
          title: 'Thưởng kích sát boss',
        })

        // await RewardLogSchema.findOneAndUpdate({
        //   targetId: eliteBossUpdated?._id,
        //   sid,
        // }, {
        //   $inc: {
        //     'reward.kill': 0,
        //     'reward.bag': Math.round(selfReward),
        //     'reward.top': 0,
        //   },
        // }, {
        //   new: true,
        //   upsert: true,
        // })
      }
    }
  }

  // Todo: Tạo lại boss sau khi boss bị kích sát
  await reviveBossElite(eliteBossUpdated?.bossId)
}

export const handleAfterEndWar = async (request: {
  battleRequest: BattleRequest
  _p: any
  realWinner?: string
  totalDamage: any
}) => {
  const { battleRequest, _p, realWinner, totalDamage } = request
  const battleTargetType = battleRequest.target.type
  const targetId = battleRequest.target.id
  const sid = _p.player.sid

  const isWinner = realWinner === _p.player._id

  const selfDamage = totalDamage.list[_p.player._id]
  if (isNormalMonster(battleTargetType))
    await afterNormal(sid, isWinner)

  if (isBossFrameTime(battleTargetType)) {
    await afterBossFrameTimeWar(targetId, {
      selfDamage,
      isWinner,
      playerName: _p.player.name,
      sid,
    })
  }

  if (isBossElite(battleTargetType)) {
    await afterEliteEndWar(targetId, {
      selfDamage,
      isWinner,
      playerName: _p.player.name,
      sid,
    })
  }
}

export const getDamageList = async (_bossId: string) => {
  return BattleSchema.aggregate(
    [
      {
        $match: {
          targetId: _bossId,
        },
      },
      {
        $group:
                  {
                    _id: '$sid',
                    totalDamage: { $sum: { $multiply: ['$damageList.self'] } },
                    sid: {
                      $first: '$sid',
                    },
                    match: {
                      $first: '$match',
                    },
                  },
      },
      {
        $sort: {
          totalDamage: -1,
        },
      },
    ],
  )
}
