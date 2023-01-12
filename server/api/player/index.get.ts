import type { PlayerServerResponse } from '~/types'
import { getServerSession } from '#auth'
import { getPlayer } from '~/server/helpers'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const playerResource = await getPlayer(session?.user?.email, '')
  if (!playerResource) {
    return createError({
      statusCode: 404,
      statusMessage: 'Player not found',
    })
  }

  return {
    ...playerResource,
  } as PlayerServerResponse
})
