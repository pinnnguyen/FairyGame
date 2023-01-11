import { PlayerSchema, StoreItemSchema, addPlayerItem } from '~/server/schema'
import type { currency } from '~/types'

interface Body {
  sid: string
  itemId: number
  kind: number
  currency: currency
}
export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)

  const player = await PlayerSchema.findOne({ sid: body.sid }).select('sid knb')
  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: 'PLAYER_NOT_FOUND',
    })
  }

  const storeItem = await StoreItemSchema.findOne({ itemId: body.itemId })
  if (!storeItem) {
    return {
      statusCode: 400,
      statusMessage: 'ITEM_NOT_FOUND',
    }
  }

  if (body.currency === 'KNB') {
    const price = storeItem.price
    if (player.knb < price) {
      return {
        statusCode: 400,
        statusMessage: `Còn thiếu ${price - player.knb} knb để mua vật phẩm này`,
      }
    }

    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        knb: -price,
      },
    })
  }

  await addPlayerItem(body.sid, storeItem.quantity, storeItem.itemId)

  return {
    statusCode: 200,
    statusMessage: 'Mua thành công',
  }
})
