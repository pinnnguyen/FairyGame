import { createServer } from 'http'
import { Server } from 'socket.io'
import { handleWars } from '~/server/api/war/index.post'
import type { BattleRequest } from '~/types/war'
const httpServer = createServer()

export default function () {
  const config = useRuntimeConfig()

  const io = new Server(httpServer, {
    cors: config.socketIO.cors,
  })

  console.log(`Socket start port: ${config.socketIO.port}`)
  io.on('connect', (socket) => {
    const _socket = socket
    console.info(`Socket.io connected: ${_socket.id}`)

    _socket.on('joinBattle', async (_channel: string, request: BattleRequest) => {
      console.info(`Socket.io joined channel: ${_channel}`)
      _socket.join(_channel)

      const response = await handleWars(request)
      io.to(_channel).emit('battleResult', response)

      _socket.on('refreshBattle', async () => {
        const battle = await handleWars(request)
        io.to(_channel).emit('battleResult', battle)
      })

      _socket.on('leaveBattle', () => {
        _socket.disconnect()
      })
    })

    socket.on('disconnect', () => {
      socket.disconnect()
    })
  })

  io.listen(config.socketIO.port)
}
