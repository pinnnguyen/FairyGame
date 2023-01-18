import type { PlayerAttribute, PlayerEquipment } from '~/types'
export const ATTRIBUTE_SLOT: any = {
  1: {
    damage: 2,
    hp: 3,
    critical: 1.2,
    bloodsucking: 1.2,
    speed: 1.1,
    def: 1,
    mp: 1,
  },
  2: {
    damage: 1,
    hp: 3,
    critical: 1,
    bloodsucking: 1,
    speed: 1,
    def: 2,
    mp: 1,
  },
  3: {
    damage: 1,
    hp: 3,
    critical: 1,
    bloodsucking: 1,
    speed: 1,
    def: 2,
    mp: 1,
  },
  4: {
    damage: 2,
    hp: 1.5,
    critical: 1.1,
    bloodsucking: 1.1,
    speed: 1,
    def: 1,
    mp: 1,
  },
  5: {
    damage: 2,
    hp: 1.5,
    critical: 1.1,
    bloodsucking: 1.1,
    speed: 1,
    def: 1,
    mp: 1,
  },
  6: {
    damage: 1,
    hp: 1.5,
    critical: 1,
    bloodsucking: 1,
    speed: 1,
    def: 2,
    mp: 1,
  },
  7: {
    damage: 1,
    hp: 1.5,
    critical: 1,
    bloodsucking: 1,
    speed: 1,
    def: 2,
    mp: 1,
  },
  8: {
    damage: 1,
    hp: 1.5,
    critical: 1,
    bloodsucking: 1,
    speed: 1,
    def: 2,
    mp: 1,
  },
}

export const prepareSlots = (pos: number | undefined, _equipId: string) => {
  const slots: Record<number, any> = {
    1: {
      slot_1: _equipId,
    },
    2: {
      slot_2: _equipId,
    },
    3: {
      slot_3: _equipId,
    },
    4: {
      slot_4: _equipId,
    },
    5: {
      slot_5: _equipId,
    },
    6: {
      slot_6: _equipId,
    },
    7: {
      slot_7: _equipId,
    },
    8: {
      slot_8: _equipId,
    },
  }

  return slots[pos || 1]
}

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

export const useEquipment = (playerEquips: PlayerEquipment[], attribute: PlayerAttribute) => {
  for (let i = 0; i < playerEquips.length; i++) {
    const playerEquip = playerEquips[i]
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
