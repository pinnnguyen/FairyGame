import { createServer } from 'http'
import { Server } from 'socket.io'
import moment from 'moment'
import { BATTLE_KIND } from '~/constants'
import { handleWars } from '~/server/api/war/index.post'
import { needResourceUpgrade } from '~/server/helpers'
import type { BattleRequest } from '~/types/war'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types/socket'
import {
  BattleSchema,
  BossSchema,
  EquipmentSchema,
  PlayerEquipUpgradeSchema,
  PlayerEquipmentSchema,
  PlayerItemSchema, PlayerSchema,
} from '~/server/schema'
const httpServer = createServer()

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
    console.log('battle:leave')
    // params.io.socket.socketsLeave([params._channel])
  })
}

const bossDailyJoinHandler = async (params: {
  io: any
  socket: any
  request: { _channel: string; sid: string }
}) => {
  params.socket.join(params.request._channel)
  const today = moment().startOf('day')
  const bossDaily = await BossSchema.find({ kind: 'daily' }).select('id name level reward avatar numberOfTurn')

  for (let i = 0; i < bossDaily.length; i++) {
    const equipIds = bossDaily[i].reward.equipRates.map((i: { id: number }) => i.id)
    const numberOfbattle = await BattleSchema.find({
      sid: params.request.sid,
      kind: BATTLE_KIND.BOSS_DAILY,
      targetId: bossDaily[i].id,
      createdAt: {
        $gte: moment().startOf('day'),
        $lte: moment(today).endOf('day').toDate(),
      },
    }).count()

    bossDaily[i].numberOfTurn -= numberOfbattle
    bossDaily[i].reward.equipments = await EquipmentSchema.find({
      id: {
        $in: equipIds,
      },
    })
  }

  params.io.to(params.request._channel).emit('boss-daily:start', {
    inRefresh: false,
    refreshTime: '',
    bossDaily,
  })

  params.socket.on('channel:leave', () => {
    console.log('channel leave boss')
    // params.io.socket.socketsLeave([params.request._channel])
    //    params.socket.disconnect()
  })
}

export default function () {
  const config = useRuntimeConfig()

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: config.socketIO.cors,
    // transports: ['websocket'],
  })

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

    socket.on('battle:join', async (_channel: string, request: BattleRequest) => {
      await battleJoinHandler({
        io,
        socket,
        _channel,
        request,
      })
    })

    socket.on('boss-daily:join', async (_channel, sid) => {
      await bossDailyJoinHandler({
        io,
        socket,
        request: {
          _channel,
          sid,
        },
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
      socket.disconnect()
    })
  })
  io.listen(3002)
}
