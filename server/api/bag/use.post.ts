import { getServerSession } from '#auth'
import { PlayerItemSchema, PlayerSchema, addSystemChat, getPlayerItem } from '~/server/schema'
import { useItems } from '~/server/utils'

const { useReducedTimeItemRefreshMonster, useGold, useIncreaseExp, useUnboxGem, useTuVi } = useItems()
interface Body {
  sid: string
  itemId: number
  kind: number
  quantity: number
}
export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)

  const uServer = await getServerSession(event)
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: uServer?.user?.email }).select('sid name')
  if (!player?.sid) {
    return createError({
      statusCode: 404,
      statusMessage: 'Người chơi không tồn tại',
    })
  }

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

  await PlayerItemSchema.updateOne({ sid: player.sid, itemId: body.itemId }, {
    $inc: {
      sum: -body.quantity,
    },
  })
  console.log('playerItem', playerItem)

  switch (body.itemId) {
    case 4:
    case 5:
    case 6:
    case 7:
      await useReducedTimeItemRefreshMonster(player.sid, playerItem.info)
      break
    case 9:
      await useGold(player.sid, playerItem.info)
      break
    case 10:
    case 11:
      // TODO: Ve Tang x2 exp
      await useIncreaseExp(player.sid, playerItem.info)
      break
    case 12:
      await addSystemChat('', `${player.name} sử dụng ${playerItem?.info?.name} thành công nhận được đá hồn tương đương thật là may mắn`)
      await useUnboxGem(player.sid, playerItem.info)
      break
    case 15:
      await useTuVi(player.sid, playerItem.info)
      break
  }

  return {
    statusCode: 200,
    statusMessage: 'Sử dụng vật phẩm thành công',
  }
})
