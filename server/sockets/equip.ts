import { PlayerEquipUpgradeSchema, PlayerEquipmentSchema, PlayerItemSchema, PlayerSchema } from '~/server/schema'
import { needResourceUpgrade } from '~/server/helpers'

export const handleEquipUpgrade = (io: any, socket: any) => {
  socket.on('equip:upgrade:start', async (_channel: string) => {
    socket.join(_channel)
    socket.on('equip:upgrade:preview', async (_equipId: string) => {
      const equip = await PlayerEquipmentSchema.findById(_equipId)
      if (!equip)
        return

      const equipUpgrade = await PlayerEquipUpgradeSchema.findOneAndUpdate({ sid: equip.sid, slot: equip.slot }, {}, { upsert: true })
      if (!equipUpgrade)
        return

      const { gold, cuongHoaThach } = needResourceUpgrade('upgrade', equipUpgrade.upgradeLevel)
      const totalCuongHoaThach = await PlayerItemSchema.findOne({ itemId: 1, kind: 2, sid: equip.sid })

      const require = {
        gold,
        cuongHoaThach,
        totalCuongHoaThach: totalCuongHoaThach?.sum ? totalCuongHoaThach?.sum : 0,
      }

      io.to(_channel).emit('equip:preview:response', require)
    })

    socket.on('equip:upgrade', async (type: string, _equipId: string) => {
      const equip = await PlayerEquipmentSchema.findById(_equipId)
      if (!equip)
        return

      const equipUpgrade = await PlayerEquipUpgradeSchema.findOne({ sid: equip.sid, slot: equip.slot })
      if (!equipUpgrade)
        return

      const reedRss = needResourceUpgrade('upgrade', equipUpgrade.upgradeLevel)
      await PlayerItemSchema.findOneAndUpdate({ itemId: 1, kind: 2, sid: equip.sid }, {
        $inc: {
          sum: -reedRss.cuongHoaThach,
        },
      })

      await PlayerSchema.findOneAndUpdate({ sid: equip.sid }, {
        $inc: {
          gold: -reedRss.gold,
        },
      })

      const equipUpgradeUpdated = await PlayerEquipUpgradeSchema.findOneAndUpdate({ sid: equip.sid }, {
        $inc: {
          upgradeLevel: 1,
        },
      })

      const playerItem = await PlayerItemSchema.findOne({ itemId: 1, kind: 2, sid: equip.sid })
      const { gold, cuongHoaThach } = needResourceUpgrade('upgrade', equipUpgradeUpdated ? equipUpgradeUpdated.upgradeLevel : equipUpgrade.upgradeLevel)

      io.to(_channel).emit('equip:upgrade:response', {
        gold,
        cuongHoaThach,
        totalCuongHoaThach: playerItem?.sum,
      })
    })

    socket.on('equip:upgrade:leave', () => {
      socket.leave(_channel)
    })
  })
}
