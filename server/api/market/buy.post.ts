import { getServerSession } from '#auth'
import { MarketSchema, PlayerSchema, sendKNBSystemMail, sendSystemMail } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('sid knb')
  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: 'Player Invalid',
    })
  }

  const body = await readBody<{
    _id: string
    name: string
  }>(event)

  if (!body._id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Id Invalid',
    })
  }

  const market = await MarketSchema.findById(body._id)
  if (!market) {
    return {
      success: false,
      message: 'Vật phẩm đã có người mua trước đó',
    }
  }

  if (player.knb < market.price!) {
    return createError({
      statusCode: 400,
      statusMessage: 'Price Invalid',
    })
  }

  await MarketSchema.findByIdAndDelete(market._id)
  await sendKNBSystemMail(market.sid, market.price, body.name)
  // Tru tien nguoi mua
  await PlayerSchema.findOneAndUpdate({ sid: player.sid }, {
    $inc: {
      knb: -market.price!,
    },
  })

  const recordType = market.type
  const record = market.record

  if (recordType === 'gem')
    await sendSystemMail(player.sid, 'gem', record, body.name)

  if (recordType === 'equipment')
    await sendSystemMail(player.sid, 'equipment', record, body.name)

  if (recordType === 'item')
    await sendSystemMail(player.sid, 'item', record, body.name)

  return {
    success: true,
    message: 'Mua thành công',
  }
})
