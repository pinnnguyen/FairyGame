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

      for (const s in stat) {
        if (stat[s]) {
          const extend = ((stat[s].main * (extentAttributeEnhanceLevel * equipEnhanceUpdated!.enhance!)) / 100) ?? 0
          stat[s].enhance += extend
        }
      }
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
