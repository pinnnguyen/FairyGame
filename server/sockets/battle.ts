import type { BattleRequest } from '~/types'
import { handleWars } from '~/server/api/war/index.post'
import { BattleSchema } from '~/server/schema'

export const battleJoinHandler = async (io: any, socket: any) => {
  socket.on('battle:log', async (_bossId: string) => {
    const topDMG: any = await BattleSchema.aggregate(
      [
        {
          $match: {
            targetId: _bossId,
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

    socket.emit('send-battle:log', topDMG)
    // socket.broadcast.emit('send-battle:log', topDMG)
  })

  socket.on('battle:join', async (warRequest: BattleRequest) => {
    // socket.join(_channel)
    const response = await handleWars(warRequest)
    socket.emit('battle:start', response)

    socket.on('battle:refresh', async (request: {
      skip: boolean
    }) => {
      warRequest.skip = request.skip ?? false
      const battle = await handleWars(warRequest)
      socket.emit('battle:start', battle)
    })
  })
}
