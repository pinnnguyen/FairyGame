import type { H3Event } from 'h3'
import { createError, sendError } from 'h3'
import {
  getBaseReward,
  getPlayer,
  handleAfterEndWar,
  handleBeforeStartWar,
  receivedEquipment,
  receivedItems,
  setLastTimeReceivedRss,
} from '~/server/helpers'
import {
  BattleSchema,
  addPlayerGem,
  addSystemChat,
} from '~/server/schema'
import { startWar } from '~/helpers'
import type { BattleRequest, BattleResponse, PlayerInfo } from '~/types'

export const handlePlayerVsTarget = async (_p: PlayerInfo, battleRequest: BattleRequest) => {
  const {
    _enemyObj,
    inRefresh,
    refreshTime,
    playerBefore,
    enemyBefore,
    reward,
    winnerBefore,
    kind,
  } = await (handleBeforeStartWar(battleRequest, _p) as any)

  if (inRefresh) {
    return {
      inRefresh,
      refreshTime,
      player: playerBefore,
      enemy: enemyBefore,
      reward,
      winner: winnerBefore,
      kind,
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
  const { itemDrafts } = await receivedItems(_p.player.sid, _enemyObj, winner)

  await setLastTimeReceivedRss(_p.player.sid)
  await handleAfterEndWar({ battleRequest, _p, winner, totalDamage })

  // Log battle
  await new BattleSchema({
    sid: _p.player.sid,
    mid: {
      id: _p.player.midId,
    },
    kind: battleRequest.kind,
    targetId: _enemyObj._id,
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
      items: itemDrafts,
      equipments,
    },
  }).save()

  await addSystemChat('', `Bạn nhận được ${exp} XP ${gold} vàng`)
  return {
    player,
    enemy,
    emulators,
    winner,
    kind: battleRequest.kind,
    reward: {
      base: {
        exp,
        gold,
      },
      items: itemDrafts,
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

  await addPlayerGem(player.player.sid, 5, 1, 3)
  await addPlayerGem(player.player.sid, 6, 2, 3)
  await addPlayerGem(player.player.sid, 7, 3, 3)
  await addPlayerGem(player.player.sid, 8, 5, 3)
  await addPlayerGem(player.player.sid, 9, 5, 3)

  await addPlayerGem(player.player.sid, 10, 5, 3)
  await addPlayerGem(player.player.sid, 11, 5, 3)
  await addPlayerGem(player.player.sid, 12, 5, 3)
  await addPlayerGem(player.player.sid, 13, 5, 3)
  await addPlayerGem(player.player.sid, 14, 5, 3)

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
