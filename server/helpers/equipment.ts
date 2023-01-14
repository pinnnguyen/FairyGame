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

export const needResourceUpgrade = (type: string, enhance?: number) => {
  const BASE_GOLD = 1500
  const BASE_CHT = 2 // CUONG HOA THACH
  const reLevel = enhance === 0 ? 1 : enhance
  console.log('BASE_GOLD * reLevel', BASE_GOLD * reLevel!)
  if (type === 'upgrade') {
    return {
      gold: BASE_GOLD * reLevel!,
      cuongHoaThach: BASE_CHT * reLevel!,
    }
  }

  return {
    gold: BASE_GOLD,
    cuongHoaThach: BASE_CHT,
  }
}

export const useEquipment = (playerEquips: PlayerEquipment[], attribute: PlayerAttribute) => {
  for (let i = 0; i < playerEquips.length; i++) {
    const playerEquip = playerEquips[i]
    if (playerEquip && playerEquip.stats) {
      for (let j = 0; j < playerEquip.stats.length; j++) {
        const stat = playerEquip.stats[j]

        if (stat?.damage)
          attribute.damage += stat?.damage.enhance

        if (stat?.hp)
          attribute.hp += stat?.hp.enhance

        if (stat?.speed)
          attribute.speed += stat?.speed.enhance

        if (stat?.def)
          attribute.def += stat?.def.enhance

        if (stat?.critical)
          attribute.critical += stat?.critical.enhance

        if (stat?.bloodsucking)
          attribute.bloodsucking += stat?.bloodsucking.enhance

        if (stat?.mp)
          attribute.mp += stat?.mp.enhance
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
