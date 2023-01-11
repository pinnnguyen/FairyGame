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
import { handleWars } from '~/server/api/war/index.post'

const state = {} as any
let server: any = null

const battleJoinHandler = async (params: {
  io: any
  socket: any
  _channel: string
  request: BattleRequest
}) => {
  params.socket.join(params._channel)
  const response = await handleWars(params.request)
  params.io.to(params._channel).emit('battle:start', response)

  params.socket.on('battle:refresh', async () => {
    const battle = await handleWars(params.request)
    params.io.to(params._channel).emit('battle:start', battle)
  })

  params.socket.on('battle:leave', () => {
    params.socket.leave(params._channel)
  })
}

export default defineEventHandler((event) => {
  if (!server) {
    // @ts-expect-error: Nuxt3
    server = event.node.res.socket?.server
    const io = new Server(server)
    // cors: {origin: '*'}

    // io.on('connection', (socket) => {
    //   console.log('Connected', socket.id)
    //
    //   socket.on('move', (e: any) => {
    //     // console.log(':move', e);
    //     state[socket.id] = e
    //     socket.emit('state', state)
    //     socket.broadcast.emit('state', state)
    //   })
    //
    //   socket.on('disconnect', () => {
    //     console.log('Disconnected', socket.id)
    //     delete state[socket.id]
    //   })
    // })

    io.on('connection', async (socket) => {
      console.log(`Socket connected: ${socket.id}`)
      socket.on('send-notify', (message) => {
        socket.broadcast.emit('send-message', message)
      })
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

      socket.on('equip:upgrade:start', (_channel) => {
        socket.join(_channel)
        socket.on('equip:upgrade:preview', async (_equipId) => {
          const equip = await PlayerEquipmentSchema.findById(_equipId)
          if (!equip)
            return

          const equipUpgrade = await PlayerEquipUpgradeSchema.findOneAndUpdate({ sid: equip.sid, slot: equip.slot }, {}, { upsert: true })
          if (!equipUpgrade)
            return

          const { gold, cuongHoaThach } = needResourceUpgrade('upgrade', equipUpgrade.upgradeLevel)
          const totalCuongHoaThach = await PlayerItemSchema.findOne({ itemId: 1, kind: 2, sid: equip.sid })

          const require = {
            gold,
            cuongHoaThach,
            totalCuongHoaThach: totalCuongHoaThach?.sum ? totalCuongHoaThach?.sum : 0,
          }

          io.to(_channel).emit('equip:preview:response', require)
        })

        socket.on('equip:upgrade', async (type: string, _equipId: string) => {
          const equip = await PlayerEquipmentSchema.findById(_equipId)
          if (!equip)
            return

          const equipUpgrade = await PlayerEquipUpgradeSchema.findOne({ sid: equip.sid, slot: equip.slot })
          if (!equipUpgrade)
            return

          const reedRss = needResourceUpgrade('upgrade', equipUpgrade.upgradeLevel)
          await PlayerItemSchema.findOneAndUpdate({ itemId: 1, kind: 2, sid: equip.sid }, {
            $inc: {
              sum: -reedRss.cuongHoaThach,
            },
          })

          await PlayerSchema.findOneAndUpdate({ sid: equip.sid }, {
            $inc: {
              gold: -reedRss.gold,
            },
          })

          const equipUpgradeUpdated = await PlayerEquipUpgradeSchema.findOneAndUpdate({ sid: equip.sid }, {
            $inc: {
              upgradeLevel: 1,
            },
          })

          const playerItem = await PlayerItemSchema.findOne({ itemId: 1, kind: 2, sid: equip.sid })
          const { gold, cuongHoaThach } = needResourceUpgrade('upgrade', equipUpgradeUpdated ? equipUpgradeUpdated.upgradeLevel : equipUpgrade.upgradeLevel)

          io.to(_channel).emit('equip:upgrade:response', {
            gold,
            cuongHoaThach,
            totalCuongHoaThach: playerItem?.sum,
          })
        })

        socket.on('equip:upgrade:leave', () => {
          socket.leave(_channel)
        })
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
        socket.disconnect()
        delete state[socket.id]
      })
    })
  }
})
