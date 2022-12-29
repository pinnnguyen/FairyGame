import { createServer } from 'http'
import { Server } from 'socket.io'
import moment from 'moment'
import { BATTLE_KIND } from '~/constants'
import { handleWars } from '~/server/api/war/index.post'
import type { BattleRequest } from '~/types/war'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types/socket'
import { BattleSchema, BossSchema, EquipmentSchema } from '~/server/schema'
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
    params.socket.disconnect()
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
    console.log('channel leave')
    //    params.socket.disconnect()
  })
}

export default function () {
  const config = useRuntimeConfig()

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: config.socketIO.cors,
    // transports: ['websocket'],
  })

  io.listen(config.socketIO.port)
  // console.log(`Socket start port: ${config.socketIO.port}`)
  io.on('connect', (socket) => {
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

    socket.on('disconnect', () => {
      socket.disconnect()
    })
  })

  return io
}
