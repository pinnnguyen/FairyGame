import type { H3Event } from 'h3'
import { createError, sendError } from 'h3'
import type { WarRequest } from '~/types/war'
import PlayerSchema from '~/server/schema/player'
import MonsterSchema from '~/server/schema/monster'
import { TARGET_TYPE } from '~/constants/war'
import type { PlayerInfo } from '~/types'
import { startWar } from '~/helpers/war'
import BattleSchema from '~/server/schema/battle'

const handlePlayerVsMonster = async (_p: PlayerInfo, monsterId: string) => {
  // Get battle information has already used it
  const battle = await BattleSchema.findOne({ 'sid': _p.player.sid, 'kind': 'pve', 'mid.id': _p.player.midId })
  if (battle) {
    return {
      player: battle.player,
      enemy: battle.enemy,
      emulators: battle.emulators,
      winner: battle.winner,
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
  return startWar(_p, monster)
}

const handleWars = async (request: WarRequest) => {
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
  const body = await readBody<WarRequest>(event)

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
