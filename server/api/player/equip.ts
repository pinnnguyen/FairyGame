import { PlayerEquipmentSchema, PlayerSchema } from '~/server/schema'
import { getServerSession } from '#auth'
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
    console.log('playerEquipment.slot', playerEquipment.slot)
    console.log('player?.sid', player?.sid)
    await PlayerEquipmentSchema.updateMany({ sid: player?.sid, slot: playerEquipment.slot }, {
      used: false,
    })

    await PlayerEquipmentSchema.updateOne({ _id: playerEquipment._id, slot: playerEquipment.slot }, {
      used: true,
    })

    return {
      statusCode: 200,
      statusMessage: 'Trang bị thành công',
    }
  }

  if (body.action === 'unequip') {
    await PlayerEquipmentSchema.updateMany({ sid: player?.sid, slot: playerEquipment.slot }, {
      used: false,
    })

    return {
      statusCode: 200,
      statusMessage: 'Tháo bị thành công',
    }
  }
})
