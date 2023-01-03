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

export const needResourceUpgrade = (type: string, level: number) => {
  const BASE_GOLD = 1500
  const BASE_CHT = 2 // CUONG HOA THACH
  const reLevel = level === 0 ? 1 : level
  console.log('BASE_GOLD * reLevel', BASE_GOLD * reLevel)
  if (type === 'upgrade') {
    return {
      gold: BASE_GOLD * reLevel,
      cuongHoaThach: BASE_CHT * reLevel,
    }
  }

  return {
    gold: BASE_GOLD,
    cuongHoaThach: BASE_CHT,
  }
}

export const equipUpgradeWithLevel = (playerEquips: PlayerEquipment[], playerEquipUpgrade: any) => {
  for (let i = 0; i < playerEquips.length; i++) {
    for (let j = 0; j < playerEquipUpgrade.length; j++) {
      if (playerEquips[i].slot === playerEquipUpgrade[j].slot) {
        const upgradeLevel = playerEquipUpgrade[j].upgradeLevel
        if (upgradeLevel <= 0)
          continue

        let extraDamage = 0
        let extraHp = 0
        let extraMp = 0
        let extraCritical = 0
        let extraBloodsucking = 0
        let extraSpeed = 0
        let extraDef = 0

        const extraAttribute = ATTRIBUTE_SLOT[playerEquips[i].slot]
        if (extraAttribute.damage > 1)
          extraDamage = extraAttribute.damage * upgradeLevel

        if (extraAttribute.hp > 1)
          extraHp = extraAttribute.hp * upgradeLevel

        if (extraAttribute.mp > 1)
          extraMp = extraAttribute.mp * upgradeLevel

        if (extraAttribute.critical > 1)
          extraCritical = extraAttribute.critical * upgradeLevel

        if (extraAttribute.bloodsucking > 1)
          extraBloodsucking = extraAttribute.bloodsucking * upgradeLevel

        if (extraAttribute.speed > 1)
          extraSpeed = extraAttribute.speed * upgradeLevel

        if (extraAttribute.def > 1)
          extraDef = extraAttribute.def * upgradeLevel

        playerEquips[i].damage += (extraDamage * playerEquips[i].damage) / 100
        playerEquips[i].hp += (extraHp * playerEquips[i].hp) / 100
        playerEquips[i].mp += (extraMp * playerEquips[i].mp) / 100
        playerEquips[i].bloodsucking += (extraBloodsucking * playerEquips[i].bloodsucking) / 100
        playerEquips[i].critical += (extraCritical * playerEquips[i].critical) / 100
        playerEquips[i].speed += (extraSpeed * playerEquips[i].speed) / 100
        playerEquips[i].def += (extraDef * playerEquips[i].def) / 100
      }
    }
  }
}

export const useEquipment = (playerEquips: PlayerEquipment[], attribute: PlayerAttribute) => {
  if (playerEquips.length > 0 && attribute) {
    for (let i = 0; i < playerEquips.length; i++) {
      attribute.damage += playerEquips[i].damage
      attribute.hp += playerEquips[i].hp
      attribute.speed += playerEquips[i].speed
      attribute.def += playerEquips[i].def
      attribute.mp += playerEquips[i].mp
      attribute.critical += playerEquips[i].critical
      attribute.bloodsucking += playerEquips[i].bloodsucking
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
