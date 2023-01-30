import type { H3Event } from 'h3'
import { PlayerSchema } from '~/server/schema/player'
import { getServerSession } from '#auth'
import { getPlayerItems } from '~/server/schema'

export default defineEventHandler(async (event: H3Event) => {
  const uServer = await getServerSession(event)
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: uServer?.user?.email }).select('sid name')
  if (!player?.sid) {
    return createError({
      statusCode: 404,
      statusMessage: 'Người chơi không tồn tại',
    })
  }

  return getPlayerItems(player.sid)
})
