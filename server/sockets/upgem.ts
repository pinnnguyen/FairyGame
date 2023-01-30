import { PlayerEquipmentSchema, PlayerGemSchema, PlayerSchema, addPlayerGem, addSystemChat } from '~/server/schema'
import type { PlayerGem } from '~/types'
import { QUALITY_TITLE } from '~/constants'
import { randomNumber } from '~/common'

export const handleEventUpGem = async (io: any, socket: any) => {
  socket.on('equip:gem:preview', async (_equipId: string) => {
    const playerEquipment = await PlayerEquipmentSchema.findById(_equipId).select('gemSlot')
    socket.emit('gem:preview:response', {
      needPunchAHole: 50 * (playerEquipment!.gemSlot ?? 1),
    })
  })

  socket.on('gem:merge', async (gem: PlayerGem) => {
    const playerInfo = await PlayerSchema.findOne({ sid: gem.sid }).select('sid name')
    if (!playerInfo) {
      socket.emit('gem:merge:response', {
        success: false,
        message: 'Nhân vật không tồn tại',
      })

      return
    }

    const gemPlayer = await PlayerGemSchema.findOne({ sid: playerInfo.sid, gemId: gem.gemId, quality: gem.quality })
    if (!gemPlayer) {
      socket.emit('gem:merge:response', {
        success: false,
        message: 'Đá hồn không hợp lệ',
      })

      return
    }

    if (gemPlayer.sum! < 3) {
      socket.emit('gem:merge:response', {
        success: false,
        message: 'Số lượng đá hồn không đủ để hợp nhất',
      })

      return
    }

    await PlayerGemSchema.findOneAndUpdate({ sid: playerInfo.sid, gemId: gem.gemId, quality: gem.quality }, {
      $inc: {
        sum: -3,
      },
    })

    const rateOnLevel = Math.round(randomNumber(1, 2) * 100) / 100
    await PlayerGemSchema.findOneAndUpdate({ sid: playerInfo.sid, gemId: gem.gemId, quality: gem.quality! + 1 }, {
      name: gem.name,
      rateOnLevel,
      values: gem.values,
      slot: gem.slot,
      target: gem.target,
      $inc: {
        sum: 1,
      },
    }, {
      new: true,
      upsert: true,
    })

    await addSystemChat('', `Chúc mừng đạo hữu ${playerInfo.name} hợp nhất thành công đá hồn ${gem.name} lên ${QUALITY_TITLE[gem.quality!]}`)
    socket.emit('gem:merge:response', {
      success: true,
      message: 'Ghép đá hồn thành công',
    })
  })

  socket.on('gem:unmosaic', async (_equipId: string, gem: PlayerGem, index: number) => {
    const playerEquipment = await PlayerEquipmentSchema.findById(_equipId).select('gemSlot quality sid gems name')
    if (!playerEquipment) {
      socket.emit('gem:unmosaic:response', {
        success: false,
        message: 'Trang bị không tồn tại',
      })
    }

    const equipGems = playerEquipment?.gems
    equipGems?.splice(index, 1)
    const playerEquipmentUpdated = await PlayerEquipmentSchema.findByIdAndUpdate(_equipId, {
      gems: equipGems,
    }, {
      new: true,
    })

    await addPlayerGem(playerEquipment?.sid, gem.gemId, gem.quality, 1)
    socket.emit('gem:unmosaic:response', {
      success: true,
      message: 'Gỡ trang bị thành công',
      equipment: playerEquipmentUpdated,
    })
  })

  socket.on('gem:mosaic', async (_equipId: string, _gemId: string) => {
    const playerEquipment = await PlayerEquipmentSchema.findById(_equipId).select('gemSlot quality sid gems name slot')
    if (!playerEquipment) {
      socket.emit('gem:mosaic:response', {
        success: false,
        message: 'Trang bị không tồn tại',
      })

      return
    }

    if (playerEquipment?.gems?.length >= playerEquipment.gemSlot) {
      socket.emit('gem:mosaic:response', {
        success: false,
        message: 'Trang bị không đủ vị trí trống để khảm',
      })

      return
    }

    const playerInfo = await PlayerSchema.findOne({ sid: playerEquipment.sid }).select('sid')
    if (!playerInfo) {
      socket.emit('gem:mosaic:response', {
        success: false,
        message: 'Nhân vật không tồn tại',
      })

      return
    }

    const gemInfo = await PlayerGemSchema.findOne({ _id: _gemId, sid: playerInfo.sid })
    if (!gemInfo) {
      socket.emit('gem:mosaic:response', {
        success: false,
        message: 'Đạo hữu chưa sở hữu đá hồn này',
      })

      return
    }

    const playerGems = playerEquipment.gems ?? []
    const gemExits = playerGems.find(g => g?.gemId === gemInfo.gemId)
    if (gemExits) {
      socket.emit('gem:mosaic:response', {
        success: false,
        message: 'Đá hồn được khảm duy nhất trên mỗi trang bị',
      })

      return
    }

    if (playerEquipment.slot !== gemInfo.slot) {
      socket.emit('gem:mosaic:response', {
        success: false,
        message: 'Đá hồn khảm không đúng trang bị',
      })

      return
    }

    if (gemInfo?.sum === 1) {
      await PlayerGemSchema.findOneAndDelete({ _id: gemInfo._id })
    }
    else {
      await PlayerGemSchema.findOneAndUpdate({ _id: gemInfo?._id }, {
        $inc: {
          sum: -1,
        },
      })
    }

    playerGems.push({
      gemId: gemInfo.gemId,
      name: gemInfo?.name,
      slot: gemInfo?.slot,
      target: gemInfo?.target,
      quality: gemInfo?.quality,
      rateOnLevel: gemInfo?.rateOnLevel,
      values: gemInfo?.values,
    })

    const playerEquipmentUpdated = await PlayerEquipmentSchema.findOneAndUpdate({ sid: playerInfo.sid, _id: _equipId }, {
      gems: playerGems,
    }, {
      new: true,
    })

    socket.emit('gem:mosaic:response', {
      success: true,
      message: `Đã khảm ${gemInfo.name} lên ${playerEquipment.name}`,
      equipment: playerEquipmentUpdated,
    })
  })

  socket.on('equip:gem:punchahole', async (_equipId: string) => {
    const playerEquipment = await PlayerEquipmentSchema.findById(_equipId).select('gemSlot quality sid')
    if (!playerEquipment) {
      socket.emit('gem:punchahole:response', {
        success: false,
        message: 'Trang bị không tồn tại',
      })

      return
    }

    if (playerEquipment.gemSlot >= 3) {
      socket.emit('gem:punchahole:response', {
        success: false,
        message: 'Phẩm chất trang bị đã đạt tối đa không thể đục thêm lỗ',
      })

      return
    }

    const player = await PlayerSchema.findOne({ sid: playerEquipment.sid }).select('knb')
    const needPunchAHole = 50 * (playerEquipment!.gemSlot ?? 1)
    if (player!.knb < needPunchAHole) {
      socket.emit('gem:punchahole:response', {
        success: false,
        message: 'Đạo hữu không đủ KNB',
      })

      return
    }

    await PlayerSchema.findOneAndUpdate({ sid: playerEquipment.sid }, {
      $inc: {
        knb: -needPunchAHole,
      },
    })

    const playerEquipmentUpdated = await PlayerEquipmentSchema.findOneAndUpdate({ _id: _equipId }, {
      $inc: {
        gemSlot: 1,
      },
    }, {
      new: true,
    })

    socket.emit('gem:punchahole:response', {
      success: true,
      message: 'Đạo hữu đục lỗ trang bị thành công',
      equipment: playerEquipmentUpdated,
    })
  })
}
