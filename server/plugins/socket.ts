import { createServer } from 'http'
import { Server } from 'socket.io'
import { getServerSession } from '#auth'
import { handleWars } from '~/server/api/war/index.post'
import { needResourceUpgrade } from '~/server/helpers'
import type { BattleRequest } from '~/types/war'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types/socket'
import {
  AuctionItemSchema,
  PlayerEquipUpgradeSchema,
  PlayerEquipmentSchema,
  PlayerItemSchema,
  PlayerSchema,
} from '~/server/schema'

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

export default function () {
  const section = await getServerSession()
  const httpServer = createServer()
  const config = useRuntimeConfig()

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: config.socketIO.cors,
    // transports: ['websocket'],
  })

  io.listen(config.socketIO.port)

  // globalThis.__io = io
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

    socket.on('auction', async (params: any) => {
      console.log('params._auctionItemId', params._auctionItemId)
      const auctionItem = await AuctionItemSchema.findById(params._auctionItemId)
      console.log('auctionItem', auctionItem)
      // console.log('section', section)
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
        const totalCuongHoaThach = await PlayerItemSchema.findOne({ kind: 1, sid: equip.sid })

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
        await PlayerItemSchema.findOneAndUpdate({ kind: 1, sid: equip.sid }, {
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

        const playerItem = await PlayerItemSchema.findOne({ kind: 1, sid: equip.sid })
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
    })
  })
}

