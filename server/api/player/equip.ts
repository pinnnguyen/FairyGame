import { PlayerSchema, PlayerEquipmentSchema, PlayerAttributeSchema } from '~/server/schema'

import { getServerSession } from '#auth'
import { prepareSlots } from '~/server/helpers'
interface Equip {
  action: 'equip' | 'unequip'
  _equipId: string
  slot: string
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const body = await readBody<Equip>(event)

  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('sid')
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
