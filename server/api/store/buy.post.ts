import { CurrencyTitle } from '~/constants'
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

  const player = await PlayerSchema.findOne({ sid: body.sid }).select('sid knb arenas')
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

  if (storeItem.currency === 'knb') {
    const price = storeItem.price
    if (player.knb < price) {
      return {
        statusCode: 400,
        statusMessage: `Còn thiếu ${price - player.knb} ${CurrencyTitle[storeItem.currency]} để mua vật phẩm này`,
      }
    }

    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        knb: -price,
      },
    })
  }

  if (storeItem.currency === 'scoreTienDau') {
    const price = storeItem.price
    const playerPrice = player.arenas?.tienDau?.score ?? 0
    if (playerPrice < price) {
      return {
        statusCode: 400,
        statusMessage: `Còn thiếu ${price - playerPrice} ${CurrencyTitle[storeItem.currency]} để mua vật phẩm này`,
      }
    }

    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        'arenas.tienDau.score': -price,
      },
    })
  }

  await addPlayerItem(body.sid, storeItem.quantity, storeItem.itemId)
  return {
    statusCode: 200,
    statusMessage: 'Mua thành công',
  }
})
