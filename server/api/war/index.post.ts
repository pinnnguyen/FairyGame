import type { H3Event } from 'h3'
import { createError, sendError } from 'h3'
import type { WarRequest } from '~/types/war'
import PlayerSchema from '~/server/schema/player'
import MonsterSchema from '~/server/schema/monster'
import { TARGET_TYPE } from '~/constants/war'
import type { PlayerInfo } from '~/types'
import { startWar } from '~/helpers/war'

const handlePlayerVsMonster = async (player: PlayerInfo, monsterId: string) => {
  const monster = await MonsterSchema.findOne({ id: monsterId })
  if (!monster) {
    return createError({
      statusCode: 400,
      statusMessage: 'monster not found!',
    })
  }

  return startWar(player, monster)
}

const handleWars = async (request: WarRequest) => {
  const player = await PlayerSchema.getPlayer(request.player.userId)

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
