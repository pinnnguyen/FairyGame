import { PlayerItemSchema, getPlayerItem } from '~/server/schema'
import { useItems } from '~/server/utils'

const { useReducedTimeItemRefreshMonster, useGold, useIncreaseExp, useUnboxGem } = useItems()
interface Body {
  sid: string
  itemId: number
  kind: number
  quantity: number
}
export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)

  const playerItems = await getPlayerItem(body.sid, body.itemId)
  if (playerItems.length === 0) {
    return {
      statusCode: 400,
      statusMessage: 'Vật phẩm không tồn tại',
    }
  }

  const playerItem = playerItems[0]
  if (playerItem?.info?.kind !== body.kind) {
    return {
      statusCode: 400,
      statusMessage: 'Loại vật phảm không hợp lệ',
    }
  }

  if (playerItem.sum && playerItem.sum < body.quantity) {
    return {
      statusCode: 400,
      statusMessage: 'Vật phẩm không đủ số lượng',
    }
  }

  await PlayerItemSchema.updateOne({ sid: body.sid, itemId: body.itemId }, {
    $inc: {
      sum: -body.quantity,
    },
  })

  switch (body.itemId) {
    case 4:
    case 5:
    case 6:
    case 7:
      await useReducedTimeItemRefreshMonster(body.sid, playerItem.info)
      break
    case 9:
      await useGold(body.sid, playerItem.info)
      break
    case 10:
    case 11:
      await useIncreaseExp(body.sid, playerItem.info)
      break
    case 12:
      await useUnboxGem(body.sid, playerItem.info)
      break
  }

  return {
    statusCode: 200,
    statusMessage: 'Sử dụng vật phẩm thành công',
  }
})
