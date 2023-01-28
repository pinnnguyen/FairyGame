import { Server } from 'socket.io'
import { BATTLE_KIND } from '~/constants/war'
import { BattleSchema, ChatSchema } from '~/server/schema'
// import type { ClientToServerEvents, ServerToClientEvents } from '~/types'
import {
  battleJoinHandler,
  handleAuction,
  handleEquipStar,
  handleEquipUpRank,
  handleEquipUpgrade,
  handleEventUpGem,
} from '~/server/sockets'

let server: any = null

export default defineEventHandler((event) => {
  if (server)
    return
  // @ts-expect-error: Nuxt3
  server = event.node.res.socket?.server
  // const io = new Server(server)
  const io = new Server(server)
  // cors: {origin: '*'}

  console.log('Start websocket...')
  io.on('connection', async (socket) => {
    console.log(`Socket connected: ${socket.id}`)
    // socket.on('send-notify', (message) => {
    //   socket.broadcast.emit('send-message', message)
    // })
    const changeStreamBattle = await BattleSchema.watch()
    const changeStreamChat = await ChatSchema.watch()

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

    changeStreamChat.on('change', (next) => {
      if (next?.operationType === 'insert')
        socket.broadcast.emit('chat:system', next.fullDocument)
    })

    await handleAuction(socket)
    await handleEquipUpgrade(io, socket)
    await battleJoinHandler(io, socket)
    await handleEquipStar(io, socket)
    await handleEquipUpRank(io, socket)
    await handleEventUpGem(io, socket)

    socket.on('get:chat:request', async () => {
      const chats = await ChatSchema.find({}).limit(20).sort({ createdAt: -1 })
      socket.emit('get:chat:response', chats)
    })

    socket.on('send:chat', async (sid: string, name: string, content: string) => {
      const newChat = await ChatSchema.create({
        sid,
        name,
        type: 'general',
        content,
      })

      socket.emit('send:chat:response', newChat)
      socket.broadcast.emit('send:chat:response', newChat)
    })

    socket.on('disconnect', () => {
      console.log('disconnect', socket.id)
      socket.disconnect()
    })
  })
})
