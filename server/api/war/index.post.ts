import type { H3Event } from 'h3'
import { createError, sendError } from 'h3'
import {
  getBaseReward,
  getPlayer,
  handleBeforeStartWar,
  receivedEquipment,
  setLastTimeReceivedRss,
} from '~/server/helpers'
import {
  BattleSchema,
  BossDataSchema,
  BossEliteSchema,
  BossRankSchema,
} from '~/server/schema'
import { startWar } from '~/helpers'
import type { BattleRequest, BattleResponse, PlayerInfo } from '~/types'
import { TARGET_TYPE } from '~/constants'

export const handlePlayerVsTarget = async (_p: PlayerInfo, battleRequest: BattleRequest) => {
  // const rankDMG: any = await BossRankSchema.aggregate(
  //   [
  //     {
  //       $group:
  //         {
  //           _id: '$name',
  //           totalDamage: { $sum: { $multiply: ['$damage'] } },
  //         },
  //     },
  //     {
  //       $sort: {
  //         totalDamage: -1,
  //       },
  //     },
  //   ],
  // )

  const bossFrameTime = battleRequest.target.type === TARGET_TYPE.BOSS_FRAME_TIME
  const elite = battleRequest.target.type === TARGET_TYPE.BOSS_ELITE

  const {
    _enemyObj,
    inRefresh,
    refreshTime,
    playerBefore,
    enemyBefore,
    reward,
    winnerBefore,
  } = await handleBeforeStartWar(battleRequest, _p)

  if (inRefresh) {
    return {
      inRefresh,
      refreshTime,
      player: playerBefore,
      enemy: enemyBefore,
      reward,
      winner: winnerBefore,
    }
  }

  const {
    player,
    enemy,
    emulators,
    winner,
    totalDamage,
  } = startWar(_p, _enemyObj)

  const { exp, gold } = await getBaseReward(_p.player.sid, _enemyObj, winner)
  const { equipments } = await receivedEquipment(_p.player.sid, _enemyObj, winner)
  await setLastTimeReceivedRss(_p.player.sid)

  if (bossFrameTime) {
    await new BossRankSchema({
      sid: _p.player.sid,
      bossId: battleRequest.target.id,
      startHours: _enemyObj.startHours,
      damage: totalDamage,
      name: _p.player.name,
    }).save()

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
  }

  console.log('_damage', totalDamage)
  // Lưu lịch sử trận đánh
  await new BattleSchema({
    sid: _p.player.sid,
    mid: {
      id: _p.player.midId,
    },
    kind: battleRequest.kind,
    targetId: _enemyObj.id,
    player,
    enemy,
    emulators,
    winner,
    damage: totalDamage,
    reward: {
      base: {
        exp,
        gold,
      },
      equipments,
    },
  }).save()

  return {
    player,
    enemy,
    emulators,
    winner,
    reward: {
      base: {
        exp,
        gold,
      },
      equipments,
    },
    // rankDMG,
  } as BattleResponse
}

export const handleWars = async (request: BattleRequest) => {
  const player = await getPlayer(request.player.userId, '')

  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: 'player not found!',
    })
  }

  if (!request.target.type) {
    return createError({
      statusCode: 400,
      statusMessage: 'target not found!',
    })
  }

  return handlePlayerVsTarget(player, request)
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<BattleRequest>(event)

  if (!body.kind) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'kind war not found!',
      }),
    )
  }

  return handleWars(body)
})
