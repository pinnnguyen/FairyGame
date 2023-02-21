import { KABBALAH_RULE } from '~/config'
import { cloneDeep } from '~/helpers'
import { handleKabbalahInBattle, handleKabbalahStartBattle } from '~/helpers/kabbalah'
import type {
  BaseAttributes,
  BattleEffectDisadvantageKey,
  Emulator,
  KabbalahRule,
  PlayerKabbalah,
  PlayerSpiritualRoot,
} from '~/types'

import { BATTLE_ACTION } from '~/constants/war'
import { randomNumber } from '~/common'

export interface BattleTarget {
  spiritualRoot?: PlayerSpiritualRoot
  kabbalah?: PlayerKabbalah
  kabbalahRule?: KabbalahRule[]
  extends: { level?: number; name?: string; _id?: string }
  attribute: BaseAttributes
  effect: {
    disadvantage: Record<BattleEffectDisadvantageKey, any>
    helpful: {}
  }
  _id?: string
  enemyId?: string
}

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

export const receiveDamageV2 = (attacker: BattleTarget, defender: BattleTarget) => {
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
  if (kabbalahDamage)
    originDMG = kabbalahDamage

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

const formatKabbalah = (targetA: BattleTarget, targetB: BattleTarget) => {
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

const matchFormat = (targetA: BattleTarget, targetB: BattleTarget) => {
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

const formatBeforeEntering = (targetA: BattleTarget, targetB: BattleTarget) => {
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

export const startWarSolo = (targetA: BattleTarget, targetB: BattleTarget, personBeingAttacked?: string) => {
  let round = 0
  const totalDamage: Record<string, any> = {
    list: {},
    self: 0,
  }

  targetA.enemyId = targetB._id
  targetB.enemyId = targetA._id

  // TODO: Format thần thông nếu có
  formatKabbalah(targetA, targetB)
  const match = matchFormat(targetA, targetB)

  const emulators: Emulator[] = []
  for (let i = 0; i < 60; i++) {
    // TODO Chuẩn bị dữ liệu
    const multipleTarget = formatBeforeEntering(targetA, targetB)
    for (const attacker of multipleTarget) {
      const { kabbalahProps } = handleKabbalahStartBattle(attacker)
      emulators.push(<Emulator>{
        [attacker._id as string]: {
          action: BATTLE_ACTION.BUFF,
          state: {},
          self: {
            kabbalahProps: [{ ...kabbalahProps }],
          },
          now: {},
        },
      })
    }

    for (const attacker of multipleTarget) {
      const attackerAttribute = attacker.attribute
      const currentDefender = multipleTarget.find(m => m._id === attacker.enemyId)

      const attackerID = attacker._id ?? ''
      const defenderID = currentDefender?._id ?? ''

      const defenderAttribute = currentDefender?.attribute
      if (!defenderAttribute)
        return

      const {
        groupAction,
        kabbalahProps,
      } = receiveDamageV2(attacker, currentDefender)

      const {
        receiveDMG,
        attackerBloodsucking,
        attackerCritical,
        defenderCounterAttack,
        defenderAvoid,
      } = groupAction

      if (!totalDamage.list[attackerID])
        totalDamage.list[attackerID] = 0

      totalDamage.list[attackerID] += receiveDMG

      defenderAttribute.hp -= formatHP(defenderAttribute?.hp, receiveDMG)
      attackerAttribute.hp -= formatHP(attackerAttribute.hp, defenderCounterAttack)

      if (attackerAttribute.hp > 0 && attackerBloodsucking > 0)
        attackerAttribute.hp += attackerBloodsucking

      // TODO: Lưu giả lập
      emulators.push(<Emulator>{
        [attackerID]: {
          action: BATTLE_ACTION.ATTACK,
          state: {
            receiveDamage: {
              [defenderID]: receiveDMG,
            },
            bloodsucking: attackerBloodsucking,
            critical: attackerCritical,
            counterDamage: defenderCounterAttack,
            avoid: defenderAvoid,
          },
          self: {
            hp: attackerAttribute.hp,
            mp: attackerAttribute.mp,
            kabbalahProps: [{ ...kabbalahProps }],
          },
          now: {
            hp: {
              [defenderID]: defenderAttribute.hp,
            },
            mp: {
              [attackerID]: attackerAttribute.mp,
            },
          },
        },
      })

      if (attackerAttribute.hp <= 0 || defenderAttribute.hp <= 0) {
        let realId = ''
        if (attackerAttribute.hp <= 0)
          realId = defenderID

        if (defenderAttribute.hp <= 0)
          realId = attackerID

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
