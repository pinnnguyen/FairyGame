import { PlayerEquipmentSchema, PlayerSchema } from '~/server/schema'
import { needResourceUpRank } from '~/server/helpers'

export const handleEquipUpRank = async (io: any, socket: any) => {
  // socket.on('equip:rank:start', (_channel: string) => {
  //   console.log('start up rank')
  //   socket.join(_channel)

  socket.on('equip:rank:preview', async (_equipId: string) => {
    console.log('start preview')
    const equip = await PlayerEquipmentSchema.findById(_equipId)
    if (!equip)
      return

    const { gold, knb, needFoodNumber, playerEquipments } = await needResourceUpRank(equip)

    socket.emit('rank:preview:response', {
      gold,
      knb,
      needFoodNumber,
      playerEquipments,
    })
  })

  socket.on('equip:rank:levelup', async (params: {
    _equipId: string
    listFood: string[]
  }) => {
    const equip = await PlayerEquipmentSchema.findById(params._equipId)
    if (!equip)
      return

    const needRss = await needResourceUpRank(equip)
    const playerInfo = await PlayerSchema.findOne({ sid: equip.sid }).select('knb gold')
    if (playerInfo!.knb < needRss.knb) {
      return {
        message: 'Đạo hữu không đủ KNB để nâng cấp',
      }
    }

    if (playerInfo!.gold < needRss.gold) {
      return {
        message: 'Đạo hữu không đủ Vàng để nâng cấp',
      }
    }

    const equipments = await PlayerEquipmentSchema.find({
      _id: {
        $in: params.listFood,
      },
    })

    if (equipments.length < needRss.needFoodNumber) {
      return {
        message: 'Nguyên liệu nâng cấp trang bị của đạo hữu không đủ',
      }
    }

    await PlayerEquipmentSchema.deleteMany({
      _id: {
        $in: params.listFood,
      },
    })

    await PlayerSchema.findOneAndUpdate({ sid: equip.sid }, {
      $inc: {
        gold: -needRss.gold,
        knb: -needRss.knb,
      },
    })

    const equipStarUpdated = await PlayerEquipmentSchema.findOneAndUpdate({ _id: equip._id }, {
      $inc: {
        rank: 1,
      },
    }, {
      new: true,
    })

    if (!equipStarUpdated) {
      socket.emit('equip:rank:response', {
        message: 'Nâng cấp thất bại',
      })

      return
    }

    const stats = equip.stats
    const extentAttributeRankLevel = 10
    for (let i = 0; i < stats!.length; i++) {
      const stat = stats![i]

      if (stat.damage)
        stat.damage.main += (stat.damage.main * extentAttributeRankLevel) / 100

      if (stat.def)
        stat.def.main += (stat.def.main * extentAttributeRankLevel) / 100

      if (stat.speed)
        stat.speed.main += (stat.speed.main * extentAttributeRankLevel) / 100

      if (stat.hp)
        stat.hp.main += (stat.hp.main * extentAttributeRankLevel) / 100

      if (stat.mp)
        stat.mp.main += (stat.mp.main * extentAttributeRankLevel) / 100

      if (stat.critical)
        stat.critical.main += (stat.critical.main * extentAttributeRankLevel) / 100

      if (stat.bloodsucking)
        stat.bloodsucking.main += (stat.bloodsucking.main * extentAttributeRankLevel) / 100
    }

    await PlayerEquipmentSchema.findOneAndUpdate({ _id: equip._id }, {
      stats,
    })

    const { gold, knb, needFoodNumber, playerEquipments } = await needResourceUpRank(equipStarUpdated)

    socket.emit('equip:rank:response', {
      gold,
      knb,
      needFoodNumber,
      playerEquipments,
      message: `Trang bị tăng thành công lên bậc${equipStarUpdated?.rank}`,
    })
  })
  // })
}
