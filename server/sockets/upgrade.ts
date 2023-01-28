import { PlayerEquipmentSchema, PlayerItemSchema, PlayerSchema } from '~/server/schema'
import { needResourceUpgrade } from '~/server/helpers'

export const handleEquipUpgrade = (io: any, socket: any) => {
  // socket.on('equip:upgrade:start', async (_channel: string) => {
  // socket.join(_channel)
  socket.on('equip:upgrade:preview', async (_equipId: string) => {
    const equip = await PlayerEquipmentSchema.findById(_equipId)
    if (!equip)
      return

    const { gold, cuongHoaThach } = needResourceUpgrade(equip?.enhance)
    const totalCuongHoaThach = await PlayerItemSchema.findOne({ itemId: 1, sid: equip.sid })

    const require = {
      gold,
      cuongHoaThach,
      totalCuongHoaThach: totalCuongHoaThach?.sum ? totalCuongHoaThach?.sum : 0,
    }

    socket.emit('upgrade:preview:response', require)
  })

  socket.on('equip:upgrade', async (type: string, _equipId: string) => {
    const equip = await PlayerEquipmentSchema.findById(_equipId)
    if (!equip)
      return

    const reedRss = needResourceUpgrade(equip.enhance)
    const playerItem = await PlayerItemSchema.findOneAndUpdate({ itemId: 1, sid: equip.sid }, {
      $inc: {
        sum: -reedRss.cuongHoaThach,
      },
    }, {
      new: true,
    })

    await PlayerSchema.findOneAndUpdate({ sid: equip.sid }, {
      $inc: {
        gold: -reedRss.gold,
      },
    })

    const equipEnhanceUpdated = await PlayerEquipmentSchema.findOneAndUpdate({ _id: equip._id }, {
      $inc: {
        enhance: 1,
      },
    }, {
      new: true,
    })

    const stats = equip.stats
    const extentAttributeEnhanceLevel = 3
    for (let i = 0; i < stats!.length; i++) {
      const stat = stats![i]

      if (stat.damage)
        stat.damage.enhance = (stat.damage.main * (extentAttributeEnhanceLevel * equipEnhanceUpdated!.enhance!)) / 100

      if (stat.def)
        stat.def.enhance = (stat.def.main * (extentAttributeEnhanceLevel * equipEnhanceUpdated!.enhance!)) / 100

      if (stat.speed)
        stat.speed.enhance = (stat.speed.main * (extentAttributeEnhanceLevel * equipEnhanceUpdated!.enhance!)) / 100

      if (stat.hp)
        stat.hp.enhance = (stat.hp.main * (extentAttributeEnhanceLevel * equipEnhanceUpdated!.enhance!)) / 100

      if (stat.mp)
        stat.mp.enhance = (stat.mp.main * (extentAttributeEnhanceLevel * equipEnhanceUpdated!.enhance!)) / 100

      if (stat.critical)
        stat.critical.enhance = (stat.critical.main * (extentAttributeEnhanceLevel * equipEnhanceUpdated!.enhance!)) / 100

      if (stat.bloodsucking)
        stat.bloodsucking.enhance = (stat.bloodsucking.main * (extentAttributeEnhanceLevel * equipEnhanceUpdated!.enhance!)) / 100
    }

    await PlayerEquipmentSchema.findOneAndUpdate({ _id: equip._id }, {
      stats,
    })

    const { gold, cuongHoaThach } = needResourceUpgrade(equipEnhanceUpdated ? equipEnhanceUpdated?.enhance : equip?.enhance)

    socket.emit('equip:upgrade:response', {
      gold,
      cuongHoaThach,
      totalCuongHoaThach: playerItem?.sum,
    })
  })

  // socket.on('equip:upgrade:leave', () => {
  //   socket.leave(_channel)
  // })
  // })
}
