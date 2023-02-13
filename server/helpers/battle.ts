import moment from 'moment'
import {
  BattleSchema,
  BossCreatorSchema,
  BossDataSchema,
  MonsterSchema,
  PlayerStatusSchema,
  RewardLogSchema,
  SendKnbRewardSystemMail,
  reviveBossElite,
} from '~/server/schema'
import type { BattleRequest, Boss, PlayerInfo } from '~/types'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'
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
    .sort({ createdAt: -1 }).select('match reward createdAt winner kind')

  if (battle) {
    // Clear pve history
    await BattleSchema.deleteMany({
      _id: {
        $nin: [battle._id],
      },
      kind: BATTLE_KIND.PVE,
      sid: _p.player.sid,
    })

    const playerStatus = await PlayerStatusSchema.findOne({
      sid: _p.player.sid,
      type: PlayerStatusTypeCon.reduce_waiting_time_training,
      timeLeft: {
        $gte: new Date().getTime(),
      },
    }).select('value')

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
      }
    }
  }

  return {
    inRefresh: false,
  }
}

const handleTargetElite = async (_p: PlayerInfo) => {
  const now = new Date().getTime()

  const battle = await BattleSchema
    .findOne({ sid: _p.player.sid, kind: BATTLE_KIND.BOSS_ELITE })
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
      }
    }
  }

  return {
    inRefresh: false,
  }
}

const handleTargetDaily = async (_p: PlayerInfo, battleRequest: BattleRequest, _enemyObj: Partial<Boss>) => {
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
    }
  }

  return {
    inRefresh: false,
  }
}

export const handleBeforeStartWar = async (battleRequest: BattleRequest, _p: PlayerInfo) => {
  const bossFrameTime = battleRequest.target.type === TARGET_TYPE.BOSS_FRAME_TIME
  const bossDaily = battleRequest.target.type === TARGET_TYPE.BOSS_DAILY

  const normal = battleRequest.target.type === TARGET_TYPE.MONSTER
  const elite = battleRequest.target.type === TARGET_TYPE.BOSS_ELITE

  if (normal) {
    const _enemyObj = await MonsterSchema.findOne({ id: _p.player.midId })
    if (battleRequest?.skip) {
      return {
        _enemyObj,
        inRefresh: false,
      }
    }

    return { _enemyObj, ...await handleTargetNormal(_p) }
  }

  if (bossDaily) {
    const _enemyObj = await BossDataSchema.findOne({ id: battleRequest.target.id })

    return {
      _enemyObj,
      ...await handleTargetDaily(_p, battleRequest, (_enemyObj as Boss)),
    }
  }

  if (bossFrameTime) {
    const _enemyObj = await BossDataSchema.findOne({ id: battleRequest.target.id })
    return {
      _enemyObj,
      ...await handleTargetFrameTime(_p),
    }
  }

  if (elite) {
    const _enemyObj = await BossCreatorSchema.findById(battleRequest.target.id)
    return {
      _enemyObj,
      ...await handleTargetElite(_p),
    }
  }
}

export const handleAfterEndWar = async (request: {
  battleRequest: BattleRequest
  _p: any
  realWinner?: string
  totalDamage: any
}) => {
  const { battleRequest, _p, realWinner, totalDamage } = request
  const bossFrameTime = battleRequest.target.type === TARGET_TYPE.BOSS_FRAME_TIME
  const elite = battleRequest.target.type === TARGET_TYPE.BOSS_ELITE
  const isWinner = realWinner === _p.player._id

  const selfDamage = totalDamage.list[_p.player._id]
  // if (normal && isWinner) {
  //   console.log('heheheh')
  //   // await addSystemChat(_p.player.sid, `Chúc mừng đạo hữu ${_p.player.name} vượt qua cửa ải ${_p.player.midId}`)
  //   // await PlayerSchema.updateOne({ sid: _p.player.midId }, {
  //   //   $inc: {
  //   //     midId: 1,
  //   //   },
  //   // })
  // }

  if (bossFrameTime) {
    await BossDataSchema.findOneAndUpdate({ id: battleRequest.target.id }, {
      $inc: {
        hp: -selfDamage!,
      },
    })
  }

  if (elite) {
    await BossCreatorSchema.findOneAndUpdate({ _id: battleRequest.target.id }, {
      $inc: {
        'attribute.hp': -selfDamage!,
      },
    })

    if (!isWinner)
      return

    const eliteBossUpdated = await BossCreatorSchema.findOneAndUpdate({ _id: battleRequest.target.id }, {
      death: true,
      killer: {
        name: _p.player.name,
        sid: _p.player.sid,
      },
    })

    const bossHPmax = eliteBossUpdated?.hp
    const baseReward = eliteBossUpdated?.reward?.base

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

    console.log('topDMG', topDMG)
    await SendKnbRewardSystemMail(_p.player.sid, baseReward?.kill, {
      note: `Đạo hữu thành công trở thành người ra đòn kết liễu boss ${eliteBossUpdated?.name}`,
      title: 'Thưởng kích sát boss',
    })

    await RewardLogSchema.findOneAndUpdate({ targetId: eliteBossUpdated?._id, sid: _p.player.sid }, {
      $inc: {
        'reward.kill': baseReward?.kill,
        'reward.bag': 0,
        'reward.top': 0,
      },
    }, {
      new: true,
      upsert: true,
    })

    console.log('topDMG', topDMG)
    if (topDMG.length > 0) {
      // await PlayerSchema.findOneAndUpdate({ sid: topDMG[0].sid }, {
      //   $inc: {
      //     knb: baseReward?.top,
      //   },
      // })

      await SendKnbRewardSystemMail(topDMG[0].sid, baseReward?.top, {
        note: `Đạo hữu thành công trở thành người gây sát thương nhiều nhất lên boss ${eliteBossUpdated?.name} với sát thương ${topDMG[0].totalDamage}`,
        title: 'Thưởng kích sát boss',
      })

      // Thưởng sát thương cao nhất
      await RewardLogSchema.findOneAndUpdate({ targetId: eliteBossUpdated?._id, sid: topDMG[0].sid }, {
        $inc: {
          'reward.kill': 0,
          'reward.bag': 0,
          'reward.top': eliteBossUpdated?.reward?.base.top,
        },
      }, {
        new: true,
        upsert: true,
      })

      // Chia đều phần thưởng dựa theo sát thương gây ra
      for (let i = 0; i < topDMG.length; i++) {
        const damage = topDMG[i].totalDamage
        const sid = topDMG[i].sid

        const perDamage = (damage / bossHPmax!) * 100
        if (perDamage > 2) {
          const selfReward = (baseReward!.bag * perDamage) / 100

          if (selfReward <= 0)
            continue

          await SendKnbRewardSystemMail(sid, Math.round(selfReward), {
            note: `Tham gia kích sát boss ${eliteBossUpdated?.name} với sát thương ${damage}`,
            title: 'Thưởng kích sát boss',
          })

          // await PlayerSchema.findOneAndUpdate({ sid }, {
          //   $inc: {
          //     knb: selfReward,
          //   },
          // })

          await RewardLogSchema.findOneAndUpdate({ targetId: eliteBossUpdated?._id, sid }, {
            $inc: {
              'reward.kill': 0,
              'reward.bag': Math.round(selfReward),
              'reward.top': 0,
            },
          }, {
            new: true,
            upsert: true,
          })
        }
      }
    }

    await reviveBossElite(eliteBossUpdated?.bossId)
  }
}
