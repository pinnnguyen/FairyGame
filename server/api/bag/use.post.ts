import { PlayerItemSchema, PlayerStatusSchema } from '~/server/schema'

interface Body {
  sid: string
  itemId: number
  kind: number
  quantity: number
}
export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)

  const playerItem = await PlayerItemSchema.findOne({ sid: body.sid, itemId: body.itemId })
  if (!playerItem) {
    return {
      statusCode: 400,
      statusMessage: 'Vật phẩm không tồn tại',
    }
  }

  if (playerItem?.kind !== body.kind) {
    return {
      statusCode: 400,
      statusMessage: 'Loại trang bị không thể sử dụng',
    }
  }

  if (playerItem.sum && playerItem.sum < body.quantity) {
    return {
      statusCode: 400,
      statusMessage: 'Loại trang bị không thể sử dụng',
    }
  }

  await PlayerItemSchema.updateOne({ sid: body.sid, itemId: body.itemId }, {
    $inc: {
      sum: -body.quantity,
    },
  })

  const playerStatus = await PlayerStatusSchema.findOne({ sid: body.sid, type: '' })
  return {
    statusCode: 200,
    statusMessage: 'Sử dụng vật phẩm thành công',
  }
})
