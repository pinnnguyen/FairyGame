import { getServerSession } from '#auth'
import { FriendlySchema, PlayerSchema } from '~/server/schema'

const handle = defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: session.user?.email }).select('sid')
  if (!player) {
    return createError({
      statusCode: 404,
      statusMessage: 'Player Not Found',
    })
  }

  const friends = await FriendlySchema.aggregate([
    {
      $match: {
        sid: player.sid,
      },
    },
    {
      $lookup: {
        from: 'players',
        localField: 'friendSis',
        foreignField: 'sid',
        as: 'player',
      },
    },
  ])

  return friends
})

export { handle as default }
