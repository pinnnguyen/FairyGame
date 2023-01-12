import { Server } from 'socket.io'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types'
import { battleJoinHandler, handleAuction, handleEquipUpgrade } from '~/server/sockets'

let server: any = null

export default defineEventHandler((event) => {
  if (server)
    return
  // @ts-expect-error: Nuxt3
  server = event.node.res.socket?.server
  // const io = new Server(server)
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server)
  // cors: {origin: '*'}

  console.log('Start websocket...')
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

    await handleAuction(socket)
    await handleEquipUpgrade(io, socket)
    await battleJoinHandler(io, socket)

    socket.on('disconnect', () => {
      console.log('disconnect', socket.id)
      socket.disconnect()
    })
  })
})
