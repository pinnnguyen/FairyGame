import { cloneDeep } from '~/helpers'
import type { BaseAttributes, PlayerAttribute } from '~/types'
import { BATTLE_ACTION } from '~/constants/war'
import { randomNumber } from '~/common'

const handleAvoid = (avoid: number, reductionAvoid: number) => {
  if (avoid <= 0) {
    return {
      hasAvoid: false,
    }
  }

  if (avoid > 0) {
    let a = avoid
    if (reductionAvoid > 0)
      a = (avoid - reductionAvoid) <= 0 ? 1 : (avoid - reductionAvoid)

    const ran = randomNumber(1, 100)
    if (a >= ran) {
      return {
        hasAvoid: true,
      }
    }
  }

  return {
    hasAvoid: false,
  }
}
const handleCounterAttack = (inflictDMG: number, reductionCounterAttack: number, counterAttack: number) => {
  if (inflictDMG <= 0) {
    return {
      counterDamage: 0,
    }
  }

  let ca = counterAttack
  let counterDamage = 0
  if (reductionCounterAttack > 0)
    ca = (counterAttack - reductionCounterAttack) <= 0 ? 1 : (counterAttack - reductionCounterAttack)

  if (counterAttack > 0)
    counterDamage = Math.round((inflictDMG * ca) / 100)

  return {
    counterDamage,
  }
}
const handleRecoveryPerformance = (recovery: number, recoveryPerformance: number, reductionRecoveryPerformance: number) => {
  if (recovery <= 0) {
    return {
      recovery,
    }
  }

  if (recoveryPerformance <= 0) {
    return {
      recovery,
    }
  }

  let rp = recoveryPerformance
  if (reductionRecoveryPerformance > 0)
    rp = (recoveryPerformance - reductionRecoveryPerformance) <= 0 ? 1 : (recoveryPerformance - reductionRecoveryPerformance)

  const r = recovery + Math.round((recovery * rp) / 100)
  return {
    recovery: r,
  }
}
const handleBloodsucking = (inflictDMG: number, bloodsucking: number, reductionBloodsucking: number) => {
  if (inflictDMG <= 0) {
    return {
      blood: 0,
    }
  }

  if (bloodsucking <= 0) {
    return {
      blood: 0,
    }
  }

  let b = bloodsucking
  if (reductionBloodsucking > 0)
    b = (bloodsucking - reductionBloodsucking) <= 0 ? 1 : (bloodsucking - reductionBloodsucking)

  const blood = Math.round((b * inflictDMG) / 100)
  return {
    blood,
  }
}

const handleCritical = (critical: number, inflictDMG: number, criticalDamage: number, reductionCriticalDamage: number) => {
  if (inflictDMG <= 0) {
    return {
      hasCritical: false,
      inflictDMG,
    }
  }

  if (critical <= 0) {
    return {
      hasCritical: false,
      inflictDMG,
    }
  }

  const ran = randomNumber(1, 100)
  let reduction = criticalDamage
  if (critical >= ran) {
    if (reductionCriticalDamage > 0)
      reduction = (criticalDamage - reductionCriticalDamage) <= 0 ? 1 : (criticalDamage - reductionCriticalDamage)

    return {
      hasCritical: true,
      inflictDMG: Math.round(inflictDMG * (reduction / 100)),
    }
  }

  return {
    hasCritical: false,
    inflictDMG,
  }
}

export const receiveDamageV2 = (battleTarget: any) => {
  let inflictDMG: number
  const attacker = battleTarget[0]
  const defender = battleTarget[1]

  const attackerDamage = attacker.damage ?? 0
  const defenderDef = defender.def ?? 0

  inflictDMG = Math.round(attackerDamage - defenderDef * 0.75)
  if (inflictDMG < 0)
    inflictDMG = 0

  const { blood } = handleBloodsucking(inflictDMG, attacker?.bloodsucking, defender.reductionBloodsucking)
  const { recovery } = handleRecoveryPerformance(blood, attacker.recoveryPerformance, defender.reductionRecoveryPerformance)
  const { hasCritical, inflictDMG: inflictDMGAfter } = handleCritical(attacker?.critical, inflictDMG, attacker?.criticalDamage, defender?.reductionCriticalDamage)
  if (hasCritical && inflictDMGAfter > 0)
    inflictDMG = inflictDMGAfter

  const { counterDamage } = handleCounterAttack(inflictDMG, attacker?.reductionCounterAttack, defender?.counterAttack)
  const { hasAvoid } = handleAvoid(defender?.avoid, attacker?.reductionAvoid)
  if (hasAvoid)
    inflictDMG = 0

  return {
    receiveDMG: inflictDMG,
    attackerBloodsucking: recovery,
    attackerCritical: hasCritical,
    defenderCounterAttack: counterDamage,
    defenderAvoid: hasAvoid,
  }
}

export const formatHP = (hp: number, limit: number) => {
  if (hp < limit)
    return hp

  return limit
}

export const attributeDeep = (attribute: BaseAttributes) => {
  const aDeep = cloneDeep(attribute)

  return {
    hp: aDeep.hp,
  }
}

interface Target {
  extends: { level?: number; name?: string; _id?: string }
  attribute: PlayerAttribute
}
export const startWarSolo = (targetA: Target, targetB: Target, personBeingAttacked?: string | undefined) => {
  let round = 0
  const totalDamage: Record<string, any> = {
    list: {},
    self: 0,
  }

  targetA.attribute._id = targetA.extends._id
  targetB.attribute._id = targetB.extends._id

  const match = {
    [targetA.extends._id]: {
      extends: {
        pos: 1,
        ...targetA.extends,
      },
      attribute: {
        ...attributeDeep(targetA.attribute),
      },
    },
    [targetB.extends._id]: {
      extends: {
        pos: 2,
        ...targetB.extends,
      },
      attribute: {
        ...attributeDeep(targetB.attribute),
      },
    },
  }

  const emulators = []
  for (let i = 0; i < 60; i++) {
    const battle: Record<string, any> = {
      [`${targetA.attribute.speed}_${targetA.extends._id}`]: [
        targetA.attribute,
        targetB.attribute,
      ],
      [`${targetB.attribute.speed}_${targetB.extends._id}`]: [
        targetB.attribute,
        targetA.attribute,
      ],
    }

    const battleReverse = Object.entries(battle)
      .sort()
      .reduce((o, [k, v]) => (((o[k]) = v), o), {})

    for (const b in battleReverse) {
      const battleTarget = battle[b]
      const {
        receiveDMG,
        attackerBloodsucking,
        attackerCritical,
        defenderCounterAttack,
        defenderAvoid,
      } = receiveDamageV2(battleTarget)

      const attacker = battleTarget[0]
      const defender = battleTarget[1]

      const realDamageId = b.split('_')[1]
      if (!totalDamage.list[realDamageId])
        totalDamage.list[realDamageId] = 0

      totalDamage.list[realDamageId] += receiveDMG

      defender.hp -= formatHP(defender?.hp, receiveDMG)
      attacker.hp -= formatHP(attacker.hp, defenderCounterAttack)

      if (attacker.hp > 0 && attackerBloodsucking > 0)
        attacker.hp += attackerBloodsucking

      emulators.push({
        [b]: {
          action: BATTLE_ACTION.ATTACK,
          state: {
            damage: {
              [defender._id]: receiveDMG,
            },
            bloodsucking: attackerBloodsucking,
            critical: attackerCritical,
            counterDamage: defenderCounterAttack,
            avoid: defenderAvoid,
          },
          self: {
            hp: attacker.hp,
            mp: attacker.mp,
          },
          now: {
            hp: {
              [defender._id]: defender.hp,
            },
            mp: {
              [attacker._id]: attacker.mp,
            },
          },
        },
      })

      if (attacker.hp <= 0 || defender.hp <= 0) {
        const realId = b.split('_')[1]
        return {
          emulators,
          match,
          winner: realId,
          totalDamage,
        } as any
      }

      if (round === 50) {
        return {
          emulators,
          match,
          winner: personBeingAttacked,
          totalDamage,
        } as any
      }

      round++
    }
  }
}
