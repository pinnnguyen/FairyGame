import type { BattleRequest } from '~/types'
import { getDamageList, handleArenaTienDauSolo, handleWars } from '~/server/utils'

export const battleJoinHandler = async (io: any, socket: any) => {
  socket.on('battle:log', async (_bossId: string) => {
    const topDMG = await getDamageList(_bossId)

    socket.emit('send-battle:log', topDMG)
  })

  socket.on('battle-normal:join:pve', async (warRequest: BattleRequest) => {
    console.log('warRequest...', warRequest)
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

  socket.on('battle:join:frame_time', async (warRequest: BattleRequest) => {
    const response = await handleWars(warRequest)
    socket.emit('battle:start:frame_time', response)
  })

  socket.on('arena:pvp:solo', async (warRequest: {
    attackerSid: string
    defenderSid: string
  }) => {
    const response = await handleArenaTienDauSolo(warRequest)
    socket.emit('response:pvp:solo', response)
  })
}
