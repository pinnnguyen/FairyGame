import { Server } from 'socket.io'
import { MIND_DHARMA_RESOURCE } from '@game/config'
import { BATTLE_KIND } from '~/constants/war'
import { cloneDeep } from '~/helpers'
import {
  BattleSchema,
  ChatSchema,
  MailSchema,
  PlayerEquipmentSchema,
  PlayerItemSchema,
  PlayerSchema,
} from '~/server/schema'
import {
  battleJoinHandler,
  handleAuction,
  handleEquipUpRank,
  handleEquipUpgrade,
  handleEventUpGem,
} from '~/server/sockets'
import { getDamageList, getPlayer, needResourceUpStar } from '~/server/utils'
import type { MindDharmaResource } from '~/types'

let server: any = null

export const handleEquipStar = async (io: any, socket: any) => {
  socket.on('equip:star:preview', async (_equipId: string) => {
    const equip = await PlayerEquipmentSchema.findById(_equipId)
    if (!equip)
      return

    const { gold, knb, daNangSao } = needResourceUpStar(equip.star)
    const totalDaNangSao = await PlayerItemSchema.findOne({ itemId: 2, sid: equip.sid })

    const require = {
      gold,
      knb,
      daNangSao,
      totalDaNangSao: totalDaNangSao?.sum ? totalDaNangSao?.sum : 0,
    }

    socket.emit('star:preview:response', require)
  })

  socket.on('equip:star', async (_equipId: string) => {
    const equip = await PlayerEquipmentSchema.findById(_equipId)
    if (!equip)
      return

    const needRss = needResourceUpStar(equip.star)
    const playerInfo = await PlayerSchema.findOne({ sid: equip.sid }).select('knb gold')
    if (playerInfo!.knb < needRss.knb)
      return

    if (playerInfo!.gold < needRss.gold)
      return

    const playerItem = await PlayerItemSchema.findOneAndUpdate({ itemId: 2, sid: equip.sid }, {
      $inc: {
        sum: -needRss.daNangSao,
      },
    }, {
      new: true,
    })

    await PlayerSchema.findOneAndUpdate({ sid: equip.sid }, {
      $inc: {
        gold: -needRss.gold,
        knb: -needRss.knb,
      },
    })

    const equipStarUpdated = await PlayerEquipmentSchema.findOneAndUpdate({ _id: equip._id }, {
      $inc: {
        star: 1,
      },
    }, {
      new: true,
    })

    const stats = equip.stats
    const extentAttributeStarLevel = 5
    for (let i = 0; i < stats!.length; i++) {
      const stat = stats![i]

      if (stat.damage)
        stat.damage.star = (stat.damage.main * (extentAttributeStarLevel * equipStarUpdated!.star!)) / 100

      if (stat.def)
        stat.def.star = (stat.def.main * (extentAttributeStarLevel * equipStarUpdated!.star!)) / 100

      if (stat.speed)
        stat.speed.star = (stat.speed.main * (extentAttributeStarLevel * equipStarUpdated!.star!)) / 100

      if (stat.hp)
        stat.hp.star = (stat.hp.main * (extentAttributeStarLevel * equipStarUpdated!.star!)) / 100

      if (stat.mp)
        stat.mp.star = (stat.mp.main * (extentAttributeStarLevel * equipStarUpdated!.star!)) / 100

      if (stat.critical)
        stat.critical.star = (stat.critical.main * (extentAttributeStarLevel * equipStarUpdated!.star!)) / 100

      if (stat.bloodsucking)
        stat.bloodsucking.star = (stat.bloodsucking.main * (extentAttributeStarLevel * equipStarUpdated!.star!)) / 100
    }

    await PlayerEquipmentSchema.findOneAndUpdate({ _id: equip._id }, {
      stats,
    })

    const { gold, knb, daNangSao } = needResourceUpStar(equipStarUpdated ? equipStarUpdated?.star : equip?.star)

    socket.emit('equip:star:response', {
      gold,
      knb,
      daNangSao,
      totalDaNangSao: playerItem?.sum,
    })
  })
}

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

    socket.on('mind:dharma:upgrade', async (sid: string, key: string) => {
      if (!sid)
        return

      const player = await PlayerSchema.findOne({ sid }).select('mindDharma exp gold')
      if (!player?.mindDharma)
        return

      const keyMindDharma = player.mindDharma[key]
      const needGoldResource = MIND_DHARMA_RESOURCE[key].needExp * keyMindDharma.enhance
      const needExpResource = MIND_DHARMA_RESOURCE[key].needGold * keyMindDharma.enhance

      if (player.gold < needGoldResource) {
        socket.emit('response:dharma:upgrade', {
          success: false,
          message: 'Tiền tiên không đủ để thăng cấp',
        })
        return
      }

      if (player.exp < needExpResource) {
        socket.emit('response:dharma:upgrade', {
          success: false,
          message: 'Tu vi không đủ để thăng cấp',
        })
        return
      }

      keyMindDharma.enhance += 1
      player.mindDharma[key] = keyMindDharma

      const playerUpdated = await PlayerSchema.findOneAndUpdate({ sid }, {
        mindDharma: player.mindDharma,
        $inc: {
          exp: -needExpResource,
          gold: -needGoldResource,
        },
      },
      {
        new: true,
      })

      const mindDharma = cloneDeep(playerUpdated?.mindDharma)
      const resource: MindDharmaResource = {}
      for (const key in mindDharma) {
        Object.assign(resource, {
          [key]: {
            exp: MIND_DHARMA_RESOURCE[key].needExp * mindDharma[key].enhance,
            gold: MIND_DHARMA_RESOURCE[key].needGold * mindDharma[key].enhance,
          },
        })
      }

      socket.emit('response:dharma:upgrade', resource)
    })

    socket.on('mind:dharma:resource', async (sid: string) => {
      if (!sid)
        return

      const player = await PlayerSchema.findOne({ sid }).select('mindDharma')
      if (!player?.mindDharma)
        return

      const mindDharma = cloneDeep(player.mindDharma)
      const resource: MindDharmaResource = {}
      for (const key in mindDharma) {
        Object.assign(resource, {
          [key]: {
            exp: MIND_DHARMA_RESOURCE[key].needExp * mindDharma[key].enhance,
            gold: MIND_DHARMA_RESOURCE[key].needGold * mindDharma[key].enhance,
          },
        })
      }

      socket.emit('response:dharma:resource', resource)
    })

    socket.on('fetch:player', async (sid) => {
      const playerResource = await getPlayer('', sid)
      if (!playerResource)
        return null

      socket.emit('fetch:player:response', {
        ...playerResource,
      })
    })

    socket.on('get:mail', async (sid: string) => {
      const mails = await MailSchema.find({ sid, deleted: false }).sort({
        createdAt: -1,
      })

      socket.emit('mail:response', mails)
    })

    const changeStreamBattle = await BattleSchema.watch()
    const changeStreamChat = await ChatSchema.watch()

    changeStreamBattle.on('change', async (next) => {
      if (next?.operationType === 'insert') {
        const targetId = next.fullDocument.targetId
        const kind = next.fullDocument.kind === BATTLE_KIND.BOSS_ELITE
        if (!kind)
          return

        const topDMG = getDamageList(targetId)
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

    socket.on('get:marquee-text', async (_id) => {
      if (_id) {
        await ChatSchema.findByIdAndUpdate(_id, {
          isRead: true,
        })
      }

      const chats = await ChatSchema.findOne({ isRead: false }).limit(1)
      socket.emit('response:marquee-text', chats)
    })

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
