import { AuctionItemSchema, PlayerSchema } from '~/server/schema'

export const handleAuction = (socket: any) => {
  socket.on('auction', async (params: { _auctionItemId: string; sid?: string }) => {
    console.log('params._auctionItemId', params)
    const auctionItem = await AuctionItemSchema.findById(params._auctionItemId)
    if (!auctionItem)
      return

    const price = auctionItem?.price ?? 0
    const player = await PlayerSchema.findOne({ sid: params.sid })
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

    await PlayerSchema.findOneAndUpdate({ sid: params.sid }, {
      $inc: {
        knb: -(price + 20),
      },
      sid: player.sid,
    })

    await AuctionItemSchema.findOneAndUpdate({ _id: params._auctionItemId }, {
      sid: player.sid,
      $inc: {
        price: 20,
      },
    })

    const auctionItemUpdateResponse = await AuctionItemSchema.aggregate([
      {
        $match: {
          _id: params._auctionItemId,
        },
      },
      {
        $lookup: {
          from: 'players',
          localField: 'sid',
          foreignField: 'sid',
          as: 'player',
        },
      },
      {
        $lookup: {
          from: 'equipments',
          localField: 'itemId',
          foreignField: 'id',
          as: 'detail',
        },
      },
      {
        $unwind: '$detail',
      },
      {
        $limit: 1,
      },
    ])

    socket.emit('auction-response', {
      statusCode: 200,
      statusMessage: 'Đấu giá thành công',
      auctionItem: auctionItemUpdateResponse[0],
    })

    socket.broadcast.emit('auction-response', {
      statusCode: 200,
      statusMessage: 'Đấu giá thành công',
      auctionItem: auctionItemUpdateResponse[0],
    })
  })
}
