import type { H3Event } from 'h3'
import { PlayerEquipmentSchema, PlayerSchema } from '~/server/schema'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event: H3Event) => {
  const uServer = await serverSupabaseUser(event)
  const sid = await PlayerSchema.findOne({ userId: uServer?.id }).select('sid')
  if (!sid) {
    return createError({
      statusCode: 404,
      statusMessage: 'Người chơi không tồn tại',
    })
  }

  const equipment = await PlayerEquipmentSchema.find({ sid })

  return {
    equipment,
  }
})
