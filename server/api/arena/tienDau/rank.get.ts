import { PlayerSchema } from '~/server/schema'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const uServer = await getServerSession(event)
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const playerList = await PlayerSchema.find({})
    .sort({ 'arenas.tienDau.pos': -1 })
    .limit(30)
    .select('name level arenas power sid')

  return playerList
})
