import { PlayerEquipmentSchema, PlayerSchema } from '~/server/schema'
import { needResourceUpRank } from '~/server/utils'

export const handleEquipUpRank = async (io: any, socket: any) => {
  // socket.on('equip:rank:start', (_channel: string) => {
  //   console.log('start up rank')
  //   socket.join(_channel)

  socket.on('equip:rank:preview', async (_equipId: string) => {
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
      socket.emit('equip:rank:response', {
        success: false,
        message: 'Đạo hữu không đủ Tiên duyên để nâng cấp',
      })

      return
    }

    if (playerInfo!.gold < needRss.gold) {
      socket.emit('equip:rank:response', {
        success: false,
        message: 'Đạo hữu không đủ Tiền tiên để nâng cấp',
      })

      return
    }

    const countEquipments = await PlayerEquipmentSchema.find({
      _id: {
        $in: params.listFood,
      },
    }).count()

    if (countEquipments < needRss.needFoodNumber) {
      socket.emit('equip:rank:response', {
        success: false,
        message: 'Nguyên liệu nâng cấp trang bị của đạo hữu không đủ',
      })

      return
    }

    // await PlayerEquipmentSchema.deleteMany({
    //   _id: {
    //     $in: params.listFood,
    //   },
    // })

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
      upsert: true,
    })

    if (!equipStarUpdated) {
      socket.emit('equip:rank:response', {
        success: false,
        message: 'Nâng cấp thất bại',
      })

      return
    }

    const stats = equip.stats
    const extentAttributeRankLevel = 10
    for (let i = 0; i < stats!.length; i++) {
      const stat = stats![i]

      for (const s in stat) {
        if (stat[s].main > 0) {
          const extend = ((stat[s].main * extentAttributeRankLevel) / 100) ?? 0
          stat[s].main += extend
        }
      }
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
      success: true,
    })
  })
  // })
}
