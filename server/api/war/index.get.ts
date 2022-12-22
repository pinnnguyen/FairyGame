import type { H3Event } from 'h3'
import { createError, sendError } from 'h3'
import type { WarRequest } from '~/types/war'
import PlayerSchema from '~/server/schema/player'
import MonsterSchema from '~/server/schema/monster'
import { TARGET_TYPE } from '~/constants/war'
import type { PlayerAttribute } from '~/types'
import { startWar } from '~/helpers/war'

const handlePlayerVsMonster = async (playerAtributes: PlayerAttribute, monsterId: string) => {
  const monster = await MonsterSchema.findOne({ id: monsterId })
  if (!monster) {
    return createError({
      statusCode: 400,
      statusMessage: 'monster not found!',
    })
  }

  const warResult = startWar(playerAtributes, monster)
  return warResult
}

const handleWars = async (request: WarRequest) => {
  console.log('request', request)
  const player = await PlayerSchema.getPlayer(request.player.userId)
  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: 'player not found!',
    })
  }

  switch (request.target.type) {
    case TARGET_TYPE.MONSTER:
      return handlePlayerVsMonster(player?.attribute, request.target.id)
  }

  return true
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<WarRequest>(event)

  console.log('body', body)
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
