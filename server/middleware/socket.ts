import { Server } from 'socket.io'
import { BATTLE_KIND } from './../../constants/war'
import { BattleSchema } from '~/server/schema'
import type { ClientToServerEvents, ServerToClientEvents } from '~/types'
import { battleJoinHandler, handleAuction, handleEquipStar, handleEquipUpgrade } from '~/server/sockets'

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
    const changeStreamBattle = await BattleSchema.watch()
    changeStreamBattle.on('change', async (next) => {
      if (next?.operationType === 'insert') {
        const targetId = next.fullDocument.targetId
        const kind = next.fullDocument.kind === BATTLE_KIND.BOSS_ELITE
        if (!kind)
          return

        const topDMG = await BattleSchema.aggregate(
          [
            {
              $match: {
                targetId,
              },
            },
            {
              $group:
                    {
                      _id: '$sid',
                      totalDamage: { $sum: { $multiply: ['$damage'] } },
                      sid: {
                        $first: '$sid',
                      },
                      name: {
                        $first: '$player.name',
                      },
                    },
            },
            {
              $sort: {
                totalDamage: -1,
              },
            },
          ],
        )

        // socket.emit('send-battle:log', topDMG)
        socket.broadcast.emit('send-battle:log', topDMG)
      }
    })

    await handleAuction(socket)
    await handleEquipUpgrade(io, socket)
    await battleJoinHandler(io, socket)
    await handleEquipStar(io, socket)

    socket.on('disconnect', () => {
      console.log('disconnect', socket.id)
      socket.disconnect()
    })
  })
})
