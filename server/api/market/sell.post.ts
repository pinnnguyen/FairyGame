import { getServerSession } from '#auth'
import { MarketSchema, PlayerEquipmentSchema, PlayerGemSchema, PlayerItemSchema, PlayerSchema } from '~/server/schema'
import { cloneDeep } from '~/helpers'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('sid')
  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: 'Player Invalid',
    })
  }

  const body = await readBody<{
    quantity: number
    price: number
    type: 'item' | 'gem' | 'equipment'
    _id: string
  }>(event)

  if (!body.price || body.price <= 0) {
    return createError({
      statusCode: 400,
      statusMessage: 'Price Invalid',
    })
  }

  if (!body.type) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid params',
    })
  }

  if (!body._id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid Id',
    })
  }

  if (body.type === 'equipment') {
    const equipment = await PlayerEquipmentSchema.findOne({ sid: player.sid, _id: body._id }, { _id: false, __v: false })
    if (!equipment) {
      return createError({
        statusCode: 400,
        statusMessage: 'Equipment Invalid',
      })
    }

    await PlayerEquipmentSchema.findOneAndDelete({ _id: body._id })
    const cloneItem = cloneDeep(equipment)

    await MarketSchema.create({
      sid: player.sid,
      type: body.type,
      price: body.price,
      record: {
        ...cloneItem,
      },
    })
  }

  if (body.type === 'item') {
    const playerItem = await PlayerItemSchema.findOne({
      sid: player.sid,
      _id: body._id,
      sum: {
        $gte: body.quantity,
      },
    }, { _id: false, __v: false })
    if (!playerItem) {
      return createError({
        statusCode: 400,
        statusMessage: 'Item Invalid',
      })
    }

    await PlayerItemSchema.findOneAndUpdate({
      sid: player.sid,
      _id: body._id,
      sum: {
        $gte: 1,
      },
    }, {
      $inc: {
        sum: -body.quantity,
      },
    })

    await MarketSchema.create({
      sid: player.sid,
      type: body.type,
      price: body.price,
      record: {
        itemId: playerItem.itemId,
        sum: body.quantity,
      },
    })
  }

  if (body.type === 'gem') {
    const playerGem = await PlayerGemSchema.findOne({
      sid: player.sid,
      _id: body._id,
      sum: {
        $gte: body.quantity,
      },
    }, { _id: false, __v: false })

    if (!playerGem) {
      return createError({
        statusCode: 400,
        statusMessage: 'Gem Invalid',
      })
    }

    await PlayerGemSchema.findOneAndUpdate({
      sid: player.sid,
      _id: body._id,
      sum: {
        $gte: body.quantity,
      },
    }, {
      $inc: {
        sum: -body.quantity,
      },
    })

    await MarketSchema.create({
      sid: player.sid,
      price: body.price,
      type: body.type,
      record: {
        ...cloneDeep(playerGem),
        sum: body.quantity,
      },
    })
  }

  return {
    success: true,
    message: 'Treo bán vật phẩm thành công',
  }
})
