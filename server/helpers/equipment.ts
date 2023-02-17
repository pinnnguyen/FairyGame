import { PlayerEquipmentSchema } from '~/server/schema'
import type { BaseAttributes, Player, PlayerAttribute, PlayerEquipment } from '~/types'

export const needResourceUpgrade = (enhance?: number) => {
  const BASE_GOLD = 10000
  const BASE_CUONG_HOA_THACH = 10
  const enhanceLevel = !enhance || enhance === 0 ? 1 : enhance

  return {
    gold: BASE_GOLD * enhanceLevel,
    cuongHoaThach: BASE_CUONG_HOA_THACH * enhanceLevel,
  }
}

export const needResourceUpStar = (star?: number) => {
  const starLevel = !star || star === 0 ? 1 : star
  const BASE_GOLD = 10000
  const BASE_KNB = 20
  const BASE_DA_NANG_SAO = 5

  return {
    gold: BASE_GOLD * starLevel,
    knb: BASE_KNB * starLevel,
    daNangSao: BASE_DA_NANG_SAO * starLevel,
  }
}

export const needResourceUpRank = async (equipment: PlayerEquipment) => {
  const BASE_GOLD = 100000
  const BASE_KNB = 30

  const playerEquipments = await PlayerEquipmentSchema.find({
    sid: equipment?.sid,
    equipmentId: equipment?.equipmentId,
    rank: equipment?.rank,
    _id: {
      $nin: [equipment?._id],
    },
  })

  return {
    gold: BASE_GOLD * equipment.rank!,
    knb: BASE_KNB * equipment.rank!,
    needFoodNumber: 3,
    playerEquipments,
  }
}

export const useEquipment = (playerEquips: PlayerEquipment[], attribute: BaseAttributes, player: Player) => {
  for (let i = 0; i < playerEquips.length; i++) {
    const playerEquip = playerEquips[i]
    if (playerEquip.gems && playerEquip.gems.length > 0) {
      for (const gem of playerEquip.gems) {
        if (!gem?.values)
          continue

        for (const g of gem.values) {
          let gValue = 0
          if (gem.quality === 1)
            gValue = g.value
          else
            gValue = Math.round(g.value * (gem.quality! * gem.rateOnLevel!))

          switch (g.type) {
            case 'normal':
              if (g.target === 'base') {
                if (player.coreAttribute)
                  player.coreAttribute[g.sign] += gValue
              }

              if (g.target === 'attribute')
                attribute[g.sign] += gValue

              break
            case 'percent':
              if (g.target === 'base')
                continue

              if (g.target === 'attribute') {
                if (!attribute[g.sign])
                  attribute[g.sign] = gValue
                else
                  attribute[g.sign] += gValue
              }

              break
          }
        }
      }
    }

    if (playerEquip && playerEquip.stats) {
      for (let j = 0; j < playerEquip.stats.length; j++) {
        const stat = playerEquip.stats[j]

        for (const s in stat) {
          if (stat[s]) {
            attribute[s] += stat[s].main ?? 0
            attribute[s] += stat[s].enhance ?? 0
            attribute[s] += stat[s].star ?? 0
          }
        }
      }
    }
  }
}

export const formatAttributes = (attribute: PlayerAttribute) => {
  attribute.damage = Math.round(attribute.damage)
  attribute.hp = Math.round(attribute.hp)
  attribute.speed = Math.round(attribute.speed)
  attribute.def = Math.round(attribute.def)
  attribute.mp = Math.round(attribute.mp)
  attribute.critical = Math.round(attribute.critical * 100) / 100
  attribute.bloodsucking = Math.round(attribute.bloodsucking)
}
