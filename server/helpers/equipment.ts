import { PlayerEquipmentSchema } from '~/server/schema'
import type { Player, PlayerAttribute, PlayerEquipment } from '~/types'

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
    needFoodNumber: 3 + equipment.rank!,
    playerEquipments,
  }
}

export const useEquipment = (playerEquips: PlayerEquipment[], attribute: PlayerAttribute, player: Player) => {
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
                // console.log('attribute[g.sign]', attribute[g.sign])
                // console.log('attribute[g.sign]', g.sign)
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

        if (stat?.damage) {
          attribute.damage += stat?.damage?.main ?? 0
          attribute.damage += stat?.damage?.enhance ?? 0
          attribute.damage += stat?.damage?.star ?? 0
        }

        if (stat?.hp) {
          attribute.hp += stat?.hp?.main ?? 0
          attribute.hp += stat?.hp?.enhance ?? 0
          attribute.hp += stat?.hp?.star ?? 0
        }

        if (stat?.speed) {
          attribute.speed += stat?.speed?.main ?? 0
          attribute.speed += stat?.speed?.enhance ?? 0
          attribute.speed += stat?.speed?.star ?? 0
        }

        if (stat?.def) {
          attribute.def += stat?.def?.main ?? 0
          attribute.def += stat?.def?.enhance ?? 0
          attribute.def += stat?.def?.star ?? 0
        }

        if (stat?.critical) {
          attribute.critical += stat?.critical?.main ?? 0
          attribute.critical += stat?.critical?.enhance ?? 0
          attribute.critical += stat?.critical?.star ?? 0
        }

        if (stat?.bloodsucking) {
          attribute.bloodsucking += stat?.bloodsucking?.main ?? 0
          attribute.bloodsucking += stat?.bloodsucking?.enhance ?? 0
          attribute.bloodsucking += stat?.bloodsucking?.star ?? 0
        }

        if (stat?.mp) {
          attribute.mp += stat?.mp?.main ?? 0
          attribute.mp += stat?.mp?.enhance ?? 0
          attribute.mp += stat?.mp?.star ?? 0
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
  attribute.critical = Math.round(attribute.critical)
  attribute.bloodsucking = Math.round(attribute.bloodsucking)
}
