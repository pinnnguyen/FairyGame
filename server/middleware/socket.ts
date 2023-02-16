import { Server } from 'socket.io'
import { BATTLE_KIND } from '~/constants/war'
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
  // handleEquipStar,
  handleEquipUpRank,
  handleEquipUpgrade,
  handleEventUpGem,
} from '~/server/sockets'
import { getPlayer, needResourceUpStar } from '~/server/helpers'

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
