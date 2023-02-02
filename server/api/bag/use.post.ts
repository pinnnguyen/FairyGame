import { PlayerItemSchema, PlayerStatusSchema, getPlayerItem } from '~/server/schema'
import { PlayerStatusTypeCon } from '~/types'

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

  const playerStatus = await PlayerStatusSchema.findOne({
    sid: body.sid,
    type: PlayerStatusTypeCon.reduce_waiting_time_training,
  })

  if (!playerStatus) {
    await PlayerStatusSchema.create({
      sid: body.sid,
      type: PlayerStatusTypeCon.reduce_waiting_time_training,
      value: playerItem.info.value,
      timeLeft: new Date().getTime() + 86400000,
    })
  }

  if (playerStatus) {
    const now = new Date().getTime()
    let timeLeft = 0
    if (playerStatus.timeLeft! < now)
      timeLeft = now + 86400000

    else
      timeLeft = playerStatus.timeLeft! + 86400000

    await PlayerStatusSchema.updateOne({ sid: body.sid, type: PlayerStatusTypeCon.reduce_waiting_time_training }, {
      value: playerItem.info.value,
      $inc: {
        timeLeft, // 1 Day
      },
    })
  }

  return {
    statusCode: 200,
    statusMessage: 'Sử dụng vật phẩm thành công',
  }
})
