import type { H3Event } from 'h3'
import { createError, sendError } from 'h3'
import type { BattleRequest } from '~/types/war'
import PlayerSchema from '~/server/schema/player'
import MonsterSchema from '~/server/schema/monster'
import { TARGET_TYPE } from '~/constants/war'
import type { PlayerInfo } from '~/types'
import { startWar } from '~/helpers/war'
import BattleSchema from '~/server/schema/battle'

export const handlePlayerVsMonster = async (_p: PlayerInfo, monsterId: string) => {
  // Get battle information has already used it
  const battle = await BattleSchema.findOne({ 'sid': _p.player.sid, 'kind': 'pve', 'mid.id': _p.player.midId }).sort({ createdAt: -1 })
  if (battle) {
    const doRefresh = new Date(battle.createdAt).getTime() + (_p as any)?.mid?.current?.ms ?? 60000
    const now = new Date().getTime()

    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        player: battle.player,
        enemy: battle.enemy,
      }
    }
  }

  const monster = await MonsterSchema.findOne({ id: monsterId })
  if (!monster) {
    return createError({
      statusCode: 400,
      statusMessage: 'monster not found!',
    })
  }

  const {
    player,
    enemy,
    emulators,
    winner,
  } = startWar(_p, monster)

  // Lưu lịch sử trận đánh
  await new BattleSchema({
    sid: _p.player.sid,
    mid: {
      id: _p.player.midId,
    },
    kind: 'pve',
    player,
    enemy,
    emulators,
    winner,
  }).save()

  await PlayerSchema.updateOne({ sid: _p.player.sid }, { lastTimeReceivedRss: new Date().getTime() })
  return {
    player,
    enemy,
    emulators,
    winner,
  }
}

export const handleWars = async (request: BattleRequest) => {
  const player = await (PlayerSchema as any).getPlayer(request.player.userId)

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

  switch (request.target.type) {
    case TARGET_TYPE.MONSTER:
      return handlePlayerVsMonster(player, request.target.id)
  }

  return true
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
