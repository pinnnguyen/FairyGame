import { getServerSession } from '#auth'
import { PlayerGemSchema, PlayerSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const query = getQuery(event)

  const playerInfo = await PlayerSchema.findOne({ userId: session?.user?.email })
  if (query.slot) {
    return PlayerGemSchema.find({
      sid: playerInfo?.sid,
      slot: query.slot,
      sum: {
        $gte: 1,
      },
    })
  }

  return []
})
