import { cloneDeep } from '~/helpers'
import {
  AuctionItemSchema,
  AuctionSchema,
  BossDataSchema,
  SendSystemMail,
} from '~/server/schema'

export const handleStartBoss12h = async () => {
  const boss = await BossDataSchema.findOne({ kind: 'frame_time', startHours: 12 })
  console.log('--START BOSS--', boss)

  if (!boss)
    return

  const auction = await new AuctionSchema({
    name: `Đấu giá boss ${boss?.name}`,
    kind: 1,
    startTime: new Date().getTime(),
    endTime: new Date().getTime() + 1800000,
    open: true,
  }).save()

  const auctionItems = []
  const items = boss?.reward?.items
  const gems = boss?.reward?.gems

  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      auctionItems.push({
        itemId: items[i].itemId,
        auctionId: auction._id,
        kind: 'item',
        price: 50,
        own: '',
        quantity: items[i].quantity,
      })
    }
  }

  if (gems.length > 0) {
    for (let i = 0; i < gems.length; i++) {
      auctionItems.push({
        gemId: gems[i].gemId,
        auctionId: auction._id,
        kind: 'gem',
        price: 100,
        own: '',
        quantity: gems[i].quantity,
      })
    }
  }

  await AuctionItemSchema.insertMany(auctionItems)
}
export const handleRewardBoss12h = async () => {
  const auction: any = await AuctionSchema.aggregate(
    [
      {
        $match: { open: true },
      },
      {
        $lookup: {
          from: 'gl_auction_items',
          localField: '_id',
          foreignField: 'auctionId',
          pipeline: [
            {
              $lookup: {
                from: 'gl_equipments',
                localField: 'equipmentId',
                foreignField: 'id',
                as: 'equipment',
              },
            },
            {
              $lookup: {
                from: 'gl_gems',
                localField: 'gemId',
                foreignField: 'id',
                as: 'gem',
              },
            },
          ],
          as: 'auctionItems',
        },
      },
      {
        $limit: 1,
      },
    ],
  )

  if (auction.length <= 0)
    return

  if (auction[0].auctionItems.length <= 0)
    return

  for (const auctionElement of auction[0].auctionItems) {
    const kind = auctionElement.kind
    const sid = auctionElement.sid
    if (!sid)
      continue

    if (kind === 'gem') {
      const gem = auctionElement.gem[0]
      await SendSystemMail(sid, 'gem', {
        gemId: auctionElement.gemId,
        sum: auctionElement.quantity,
        ...cloneDeep(gem),
      }, {
        title: 'Đấu giá thành công',
        note: `Chúc mừng đạo hữu thành công dấu giá vật phẩm ${gem.name}`,
      })
    }
  }

  await AuctionSchema.findOneAndUpdate({ open: true }, {
    open: false,
  })
}
