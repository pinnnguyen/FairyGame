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

  const query = getQuery(event)
  if (query.sid) {
    const playerResource = await getPlayer('', query.sid as string)
    if (!playerResource) {
      return createError({
        statusCode: 404,
        statusMessage: 'Player not found',
      })
    }

    return {
      ...playerResource,
    } as PlayerServerResponse
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
