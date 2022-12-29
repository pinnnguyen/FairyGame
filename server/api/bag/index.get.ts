import type { H3Event } from 'h3'
import { PlayerEquipmentSchema, PlayerSchema } from '~/server/schema'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event: H3Event) => {
  const uServer = await getServerSession(event)
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: uServer?.user?.email }).select('sid')
  if (!player?.sid) {
    return createError({
      statusCode: 404,
      statusMessage: 'Người chơi không tồn tại',
    })
  }

  const equipments = await PlayerEquipmentSchema.find({ sid: player?.sid }).limit(25)

  return {
    equipments,
  }
})
