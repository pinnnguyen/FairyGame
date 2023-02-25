import { KABBALAH_RULE, KABBALAH_TAG_NAME } from '@game/config'
import { cloneDeep } from '~/helpers'
import { handleKabbalahInBattle } from '~/server/utils'
import type {
  BaseAttributes,
  BattleTarget,
} from '~/types'

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

    const ran = randomNumber(1, 200)
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

export const receiveDamageV2 = (attacker: BattleTarget, defender: BattleTarget, round: number) => {
  let originDMG: number

  const attackerAttribute = attacker.attribute
  const defenderAttribute = defender.attribute

  const attackerKabbalahRule = attacker.kabbalahRule
  const attackerKabbalah = attacker.kabbalah

  const attackerDamage = attackerAttribute.damage ?? 0
  const defenderDef = defenderAttribute.def ?? 0

  originDMG = Math.round(attackerDamage - defenderDef * 0.75)
  if (originDMG < 0)
    originDMG = 0

  const { kabbalahDamage, kabbalahProps } = handleKabbalahInBattle(attackerKabbalahRule, attackerKabbalah, originDMG)
  if (kabbalahProps && kabbalahDamage) {
    if (kabbalahProps.tag === KABBALAH_TAG_NAME.CARPENTRY_TECHNIQUES) {
      const disadvantage = kabbalahProps.effect?.disadvantage

      if (disadvantage?.poisoned) {
        defender.effect.disadvantage.poisoned = {
          ...disadvantage.poisoned,
          expire: round + disadvantage?.poisoned.round,
          name: kabbalahProps.name,
        }
      }
    }

    // TODO: 1 Số skill không có hiệu ứng
    if (kabbalahProps.tag === KABBALAH_TAG_NAME.JINYUAN_SWORD)
      originDMG = kabbalahDamage
  }

  const { blood } = handleBloodsucking(originDMG, attackerAttribute?.bloodsucking, defenderAttribute.reductionBloodsucking)
  const { recovery } = handleRecoveryPerformance(blood, attackerAttribute.recoveryPerformance, defenderAttribute.reductionRecoveryPerformance)
  const { hasCritical, inflictDMG: inflictDMGAfter } = handleCritical(attackerAttribute?.critical, originDMG, attackerAttribute?.criticalDamage, defenderAttribute?.reductionCriticalDamage)
  if (hasCritical && inflictDMGAfter > 0)
    originDMG = inflictDMGAfter

  const { counterDamage } = handleCounterAttack(originDMG, attackerAttribute?.reductionCounterAttack, defenderAttribute?.counterAttack)
  const { hasAvoid } = handleAvoid(defenderAttribute?.avoid, attackerAttribute?.reductionAvoid)
  if (hasAvoid)
    originDMG = 0

  return {
    groupAction: {
      receiveDMG: originDMG,
      attackerBloodsucking: recovery,
      attackerCritical: hasCritical,
      defenderCounterAttack: counterDamage,
      defenderAvoid: hasAvoid,
    },
    kabbalahProps,
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

export const kabbalahFormat = (targetA: BattleTarget, targetB: BattleTarget) => {
  // Check & get xem có thần thông không để bước vào trận chiến
  if (targetA.spiritualRoot?.kind && targetA?.kabbalah) {
    let aKabbalahRule = null
    const kabbalahKeyUsed: (string | undefined)[] = []

    for (const kaUsed in targetA?.kabbalah) {
      if (targetA?.kabbalah[kaUsed].unlock
                && ['automatic', 'manual'].includes(targetA.kabbalah[kaUsed].type))
        kabbalahKeyUsed.push(kaUsed)
    }

    aKabbalahRule = KABBALAH_RULE[targetA.spiritualRoot?.kind]
    targetA.kabbalahRule = aKabbalahRule
      .filter(k => kabbalahKeyUsed.includes(k.sign))
  }

  if (targetB.spiritualRoot?.kind && targetB?.kabbalah) {
    let aKabbalahRule = null
    const kabbalahKeyUsed: (string | undefined)[] = []

    for (const kaUsed in targetA?.kabbalah) {
      if (targetB?.kabbalah[kaUsed].used)
        kabbalahKeyUsed.push(kaUsed)
    }

    aKabbalahRule = KABBALAH_RULE[targetB.spiritualRoot?.kind]
    targetB.kabbalahRule = aKabbalahRule.filter(k => kabbalahKeyUsed.includes(k.sign))
  }
}

export const matchFormat = (targetA: BattleTarget, targetB: BattleTarget) => {
  return {
    [(targetA.extends._id as string)]: {
      extends: {
        pos: 1,
        ...targetA.extends,
      },
      attribute: {
        ...attributeDeep(targetA.attribute),
      },
    },
    [(targetB.extends._id as string)]: {
      extends: {
        pos: 2,
        ...targetB.extends,
      },
      attribute: {
        ...attributeDeep(targetB.attribute),
      },
    },
  }
}

export const beforeEnteringFormat = (targetA: BattleTarget, targetB: BattleTarget) => {
  function compare(a: any, b: any) {
    if (a.attribute.speed < b.attribute.speed)
      return 1

    if (a.attribute.speed > b.attribute.speed)
      return -1

    return 0
  }

  const multipleTarget = [targetA, targetB]
  return multipleTarget.sort(compare)
}
