import { createServer } from 'http'
import { Server } from 'socket.io'
import { handleWars } from '~/server/api/war/index.post'
import type { BattleRequest } from '~/types/war'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types/socket'
const httpServer = createServer()

export default function () {
  const config = useRuntimeConfig()

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: config.socketIO.cors,
  })

  console.log(`Socket start port: ${config.socketIO.port}`)
  io.on('connect', (socket) => {
    socket.on('battle', async (_channel: string, request: BattleRequest) => {
      socket.join(_channel)

      const response = await handleWars(request)
      io.to(_channel).emit('battleStart', response)

      socket.on('battleRefresh', async () => {
        const battle = await handleWars(request)
        io.to(_channel).emit('battleEnd', battle)
      })

      socket.on('battleLeave', () => {
        socket.disconnect()
      })
    })

    socket.on('disconnect', () => {
      socket.disconnect()
    })
  })

  io.listen(config.socketIO.port)
}
