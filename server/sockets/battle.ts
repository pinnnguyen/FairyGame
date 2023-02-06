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
  })

  socket.on('battle:join:pve', async (warRequest: BattleRequest) => {
    const response = await handleWars(warRequest)
    socket.emit('battle:start:pve', response)
  })

  socket.on('battle:join:daily', async (warRequest: BattleRequest) => {
    const response = await handleWars(warRequest)
    socket.emit('battle:start:daily', response)
  })

  socket.on('battle:join:elite', async (warRequest: BattleRequest) => {
    const response = await handleWars(warRequest)
    socket.emit('battle:start:elite', response)
  })
}
