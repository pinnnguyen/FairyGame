import { PlayerEquipmentSchema, PlayerItemSchema, PlayerSchema } from '~/server/schema'
import { needResourceUpStar } from '~/server/helpers'

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
