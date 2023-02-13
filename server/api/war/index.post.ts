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
} from '~/server/schema'
import { startWarSolo } from '~/helpers'
import type { BattleRequest, PlayerInfo } from '~/types'

export const handlePlayerVsTarget = async (_p: PlayerInfo, battleRequest: BattleRequest) => {
  const {
    _enemyObj,
    inRefresh,
    refreshTime,
    match: beforeMatch,
    reward,
    winner,
    kind,
  } = await (handleBeforeStartWar(battleRequest, _p) as any)

  if (inRefresh) {
    return {
      inRefresh,
      refreshTime,
      match: beforeMatch,
      reward,
      winner,
      kind,
    }
  }

  const targetA = {
    extends: {
      _id: _p.player._id ?? 'player',
      name: _p.player.name,
      level: _p.player.level,
    },
    attribute: _p.attribute,
  }

  const targetB = {
    extends: {
      _id: _enemyObj._id ?? 'monster',
      name: _enemyObj.name,
      level: _enemyObj.level,
    },
    attribute: _enemyObj.attribute,
  }

  const {
    emulators,
    match,
    winner: realWinner,
    totalDamage,
  } = startWarSolo(targetA, targetB, battleRequest.target.id)

  for (const d in totalDamage.list) {
    if (d === _p.player._id)
      totalDamage.self = totalDamage.list[d]
  }

  const { exp, gold } = await getBaseReward(_p.player, _enemyObj, realWinner)
  const { equipments } = await receivedEquipment(_p.player, _enemyObj, realWinner)
  const { itemDrafts } = await receivedItems(_p.player, _enemyObj, realWinner)

  await setLastTimeReceivedRss(_p.player.sid)

  // Log battle
  await new BattleSchema({
    sid: _p.player.sid,
    mid: {
      id: _p.player.midId,
    },
    kind: battleRequest.kind,
    targetId: battleRequest.target.id,
    match,
    emulators,
    winner: realWinner,
    damageList: totalDamage,
    reward: {
      base: {
        exp,
        gold,
      },
      items: itemDrafts,
      equipments,
    },
  }).save()

  await handleAfterEndWar({ battleRequest, _p, realWinner, totalDamage })

  return {
    match,
    emulators,
    winner: realWinner,
    kind: battleRequest.kind,
    reward: {
      base: {
        exp,
        gold,
      },
      items: itemDrafts,
      equipments,
    },
  }
}

export const handleWars = async (request: BattleRequest) => {
  const player = await getPlayer(request.player.userId, '')

  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: 'player not found!',
    })
  }

  // await addPlayerGem(player.player.sid, 5, 1, 3)
  // await addPlayerGem(player.player.sid, 6, 2, 3)
  // await addPlayerGem(player.player.sid, 7, 3, 3)
  // await addPlayerGem(player.player.sid, 8, 5, 3)
  // await addPlayerGem(player.player.sid, 9, 5, 3)
  //
  // await addPlayerGem(player.player.sid, 10, 5, 3)
  // await addPlayerGem(player.player.sid, 11, 5, 3)
  // await addPlayerGem(player.player.sid, 12, 5, 3)
  // await addPlayerGem(player.player.sid, 13, 5, 3)
  // await addPlayerGem(player.player.sid, 14, 5, 3)

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
