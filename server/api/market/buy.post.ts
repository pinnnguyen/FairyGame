import { getServerSession } from '#auth'
import {
  ItemSchema,
  MarketSchema,
  PlayerSchema,
  SendKnbMarketSystemMail,
  SendMarketSystemMail,
} from '~/server/schema'
import { cloneDeep } from '~/helpers'

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
  await SendKnbMarketSystemMail(market.sid, market.price, body.name)
  // Tru tien nguoi mua
  await PlayerSchema.findOneAndUpdate({ sid: player.sid }, {
    $inc: {
      knb: -market.price!,
    },
  })

  const recordType = market.type
  const record = market.record

  if (recordType === 'gem')
    await SendMarketSystemMail(player.sid, 'gem', record, body.name)

  if (recordType === 'equipment')
    await SendMarketSystemMail(player.sid, 'equipment', record, body.name)

  if (recordType === 'item') {
    const item = await ItemSchema.findOne({ id: record.itemId }, { _id: false, __v: false })
    const cloneItem = cloneDeep(item)

    await SendMarketSystemMail(player.sid, 'item', {
      sum: record.sum,
      itemId: cloneItem?.id,
      ...cloneItem,
    }, body.name)
  }

  return {
    success: true,
    message: 'Mua thành công',
  }
})
