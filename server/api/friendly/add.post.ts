import { getServerSession } from '#auth'
import { FriendlySchema, PlayerSchema } from '~/server/schema'

const handle = defineEventHandler(async (event) => {
  const body = await readBody<{
    friendSid: string
  }>(event)

  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!body.friendSid) {
    return createError({
      statusCode: 400,
      statusMessage: 'Params Ivalid',
    })
  }

  const player = await PlayerSchema.findOne({ userId: session.user?.email }).select('sid')
  if (!player) {
    return createError({
      statusCode: 404,
      statusMessage: 'Player Not Found',
    })
  }

  const friend = await PlayerSchema.findOne({ sid: body.friendSid }).select('name')
  if (!friend) {
    return createError({
      statusCode: 404,
      statusMessage: 'Friend Not Found',
    })
  }

  await FriendlySchema.create({
    sid: player.sid,
    friendSid: body.friendSid,
    relationship: 'friend',
  })

  return {
    success: true,
    message: `Kết bạn thành công với ${friend.name}`,
  }
})

export { handle as default }
