import { Server } from 'socket.io'
import {
  AuctionItemSchema,
  PlayerEquipUpgradeSchema,
  PlayerEquipmentSchema,
  PlayerItemSchema,
  PlayerSchema,
} from '~/server/schema'
import type { BattleRequest } from '~/types'
import { needResourceUpgrade } from '~/server/helpers'
import { battleJoinHandler, handleEquipUpgrade } from '~/server/sockets'

let server: any = null

export default defineEventHandler((event) => {
  if (server)
    return
  // @ts-expect-error: Nuxt3
  server = event.node.res.socket?.server
  const io = new Server(server)
  // cors: {origin: '*'}

  io.on('connection', async (socket) => {
    console.log(`Socket connected: ${socket.id}`)
    // socket.on('send-notify', (message) => {
    //   socket.broadcast.emit('send-message', message)
    // })
    // const changeStream = await PlayerSchema.watch()
    //
    // changeStream.on('change', (next) => {
    //   if (next?.operationType === 'insert') {
    //     console.log('A change occurred:', next.operationType)
    //     socket.broadcast.emit('notify', next.fullDocument)
    //   }
    // })string

    socket.on('auction', async (params: { _auctionItemId: string; sid?: string }) => {
      console.log('params._auctionItemId', params)
      const auctionItem = await AuctionItemSchema.findById(params._auctionItemId)
      if (!auctionItem)
        return

      const price = auctionItem?.price ?? 0
      const player = await PlayerSchema.findOne({ sid: params.sid })
      if (player.knb < price + 20) {
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

    socket.on('battle:join', async (_channel: string, request: BattleRequest) => {
      console.log('_channel', _channel)
      await battleJoinHandler({
        io,
        socket,
        _channel,
        request,
      })
    })

    socket.on('equip:upgrade:start', async (_channel) => {
      handleEquipUpgrade(io, socket, {
        _channel,
      })
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
      socket.disconnect()
    })
  })
})
