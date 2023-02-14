import { AuctionItemSchema, PlayerSchema } from '~/server/schema'

export const handleAuction = (socket: any) => {
  socket.on('auction', async (_auctionItemId: string, sid?: string) => {
    const auctionItem = await AuctionItemSchema.findById(_auctionItemId)
    console.log('auctionItem', auctionItem)
    if (!auctionItem)
      return

    const price = auctionItem?.price ?? 0
    const player = await PlayerSchema.findOne({
      sid,
      knb: {
        $gte: price,
      },
    })

    if (!player) {
      socket.emit('auction-response', {
        statusCode: 400,
        statusMessage: 'Nhân vật không tồn tại ',
      })

      return
    }

    if (player.knb! < price + 20) {
      socket.emit('auction-response', {
        statusCode: 400,
        statusMessage: 'Knb nhân vật không đủ để đấu giá ',
      })

      return
    }

    if (auctionItem.sid) {
      await PlayerSchema.findOneAndUpdate({ sid: auctionItem.sid }, {
        $inc: {
          knb: auctionItem.price,
        },
      })
    }

    await PlayerSchema.findOneAndUpdate({ sid }, {
      $inc: {
        knb: -(price + 20),
      },
      sid: player.sid,
    })

    await AuctionItemSchema.findOneAndUpdate({ _id: _auctionItemId }, {
      sid: player.sid,
      $inc: {
        price: 20,
      },
    })

    socket.emit('auction-response', {
      statusCode: 200,
      statusMessage: 'Đấu giá thành công',
    })

    socket.broadcast.emit('auction-response', {
      statusCode: 200,
      statusMessage: 'Đấu giá thành công',
    })
  })
}
