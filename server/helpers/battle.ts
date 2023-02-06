import moment from 'moment'
import { WINNER } from '~/constants/war'
import {
  BattleSchema,
  BossDataSchema,
  BossEliteSchema,
  MonsterSchema,
  PlayerSchema,
  PlayerStatusSchema,
  RewardLogSchema,
  // addSystemChat,
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
        winner: WINNER.youwin,
      })
    .sort({ createdAt: -1 }).select('player enemy reward createdAt winner kind')

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
        playerBefore: battle.player,
        enemyBefore: battle.enemy,
        reward: battle.reward,
        winnerBefore: battle.winner,
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
    .sort({ createdAt: -1 }).select('player enemy reward createdAt winner kind')

  if (battle) {
    // validate
    const doRefresh = new Date((battle.createdAt as string)).getTime() + 60000
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        playerBefore: battle.player,
        enemyBefore: battle.enemy,
        reward: battle.reward,
        winnerBefore: battle.winner,
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
    .sort({ createdAt: -1 }).select('player enemy reward createdAt winner kind')

  if (battle) {
    // validate
    const doRefresh = new Date(battle.createdAt!).getTime() + 60000
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        playerBefore: battle.player,
        enemyBefore: battle.enemy,
        reward: battle.reward,
        winnerBefore: battle.winner,
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
  }).select('player enemy reward winner kind')

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
      playerBefore: battle[0].player,
      enemyBefore: battle[0].enemy,
      reward: battle[0].reward,
      winnerBefore: battle[0].winner,
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
    const _enemyObj = await BossEliteSchema.findById(battleRequest.target.id)
    return {
      _enemyObj,
      ...await handleTargetElite(_p),
    }
  }
}

export const handleAfterEndWar = async (request: {
  battleRequest: BattleRequest
  _p: PlayerInfo
  winner: string
  totalDamage?: number
}) => {
  const { battleRequest, _p, winner, totalDamage } = request
  const bossFrameTime = battleRequest.target.type === TARGET_TYPE.BOSS_FRAME_TIME
  const elite = battleRequest.target.type === TARGET_TYPE.BOSS_ELITE
  // const normal = battleRequest.target.type === TARGET_TYPE.MONSTER
  const isWinner = winner === WINNER.youwin

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
        hp: -totalDamage!,
      },
    })
  }

  if (elite) {
    await BossEliteSchema.findOneAndUpdate({ _id: battleRequest.target.id }, {
      $inc: {
        'attribute.hp': -totalDamage!,
      },
    })

    if (isWinner) {
      const eliteBossUpdated = await BossEliteSchema.findOneAndUpdate({ _id: battleRequest.target.id }, {
        death: true,
        killer: {
          avatar: '',
          name: _p.player.name,
          sid: _p.player.sid,
        },
      })

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
                    totalDamage: { $sum: { $multiply: ['$damage'] } },
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

      // Thưởng kích sát boss
      await PlayerSchema.findOneAndUpdate({ sid: _p.player.sid }, {
        $inc: {
          knb: eliteBossUpdated?.reward?.base.kill,
        },
      })

      await RewardLogSchema.findOneAndUpdate({ targetId: eliteBossUpdated?._id, sid: _p.player.sid }, {
        $inc: {
          'reward.kill': eliteBossUpdated?.reward?.base.kill,
          'reward.bag': 0,
          'reward.top': 0,
        },
      }, {
        new: true,
        upsert: true,
      })

      const BossHPmax = eliteBossUpdated?.hp
      const baseReward = eliteBossUpdated?.reward?.base

      if (topDMG.length > 0) {
        await PlayerSchema.findOneAndUpdate({ sid: topDMG[0].sid }, {
          $inc: {
            knb: eliteBossUpdated?.reward?.base.top,
          },
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

          const perDamage = (damage / BossHPmax!) * 100
          if (perDamage > 2) {
            const selfReward = (baseReward!.bag * perDamage) / 100

            if (selfReward <= 0)
              continue

            await PlayerSchema.findOneAndUpdate({ sid }, {
              $inc: {
                knb: selfReward,
              },
            })

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

      return {
        kill: eliteBossUpdated?.reward?.base?.kill,
      }
    }
  }
}
