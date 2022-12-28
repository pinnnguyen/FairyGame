import { PlayerAttributeSchema, PlayerEquipmentSchema, PlayerSchema } from '~/server/schema'
import { serverSupabaseUser } from '#supabase/server'
import { prepareSlots } from '~/server/helpers'
interface Equip {
  action: 'equip' | 'unequip'
  _equipId: string
  slot: string
}

export default defineEventHandler(async (event) => {
  const serverUser = await serverSupabaseUser(event)
  const body = await readBody<Equip>(event)

  if (!serverUser) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: serverUser.id }).select('sid')
  if (!player) {
    return createError({
      statusCode: 404,
      statusMessage: 'Player not found',
    })
  }

  const playerEquipment = await PlayerEquipmentSchema.findById(body._equipId).select('_id slot')
  if (!playerEquipment) {
    return createError({
      statusCode: 404,
      statusMessage: 'Bạn chưa sở hữu trang bị này',
    })
  }

  if (body.action === 'equip') {
    await PlayerAttributeSchema.updateOne({ sid: player?.sid }, prepareSlots(playerEquipment.slot, playerEquipment._id))

    return {
      statusCode: 200,
      statusMessage: 'Trang bị thành công',
    }
  }

  if (body.action === 'unequip') {
    await PlayerAttributeSchema.updateOne({ sid: player?.sid }, prepareSlots(playerEquipment.slot, ''))
    return {
      statusCode: 200,
      statusMessage: 'Tháo bị thành công',
    }
  }
})
