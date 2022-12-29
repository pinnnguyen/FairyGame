import type { H3Event } from 'h3'
import { PlayerEquipmentSchema, PlayerSchema } from '~/server/schema'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event: H3Event) => {
  const uServer = await serverSupabaseUser(event)
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: uServer?.id }).select('sid')
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
