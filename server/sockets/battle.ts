import type { BattleRequest } from '~/types'
import { handleWars } from '~/server/api/war/index.post'

export const battleJoinHandler = async (io: any, socket: any) => {
  socket.on('battle:join', async (_channel: string, request: BattleRequest) => {
    socket.join(_channel)
    const response = await handleWars(request)
    io.to(_channel).emit('battle:start', response)

    socket.on('battle:refresh', async () => {
      const battle = await handleWars(request)
      io.to(_channel).emit('battle:start', battle)
    })

    socket.on('battle:leave', () => {
      socket.leave(_channel)
    })
  })
}
