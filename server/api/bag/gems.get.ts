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

  const playerInfo = await PlayerSchema.findOne({ userId: session?.user?.email }).select('sid')
  console.log('playerInfo', playerInfo)
  return PlayerGemSchema.find({
    sid: playerInfo?.sid,
    sum: {
      $gte: 1,
    },
  })
})
