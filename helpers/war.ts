import { KABBALAH_RULE } from '~/config'
import { cloneDeep } from '~/helpers'
import { handleKabbalahInBattle, handleKabbalahStartBattle } from '~/helpers/kabbalah'
import type { BaseAttributes, Emulator, KabbalahRule, PlayerAttribute, PlayerKabbalah, PlayerSpiritualRoot } from '~/types'
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

export type BattleTarget = BaseAttributes & {
  kabbalah: PlayerKabbalah
  kabbalahRule?: KabbalahRule[]
  attribute: BaseAttributes
}

export const receiveDamageV2 = (battleTarget: BattleTarget[]) => {
  let originDMG: number
  const attacker = battleTarget[0]
  const defender = battleTarget[1]

  const attackerAttribute = battleTarget[0].attribute
  const defenderAttribute = battleTarget[1].attribute

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
  const { hasCritical, inflictDMG: inflictDMGAfter } = handleCritical(attackerAttribute?.critical, originDMG, attackerAttribute?.criticalDamage, defender?.reductionCriticalDamage)
  if (hasCritical && inflictDMGAfter > 0)
    originDMG = inflictDMGAfter

  const { counterDamage } = handleCounterAttack(originDMG, attackerAttribute?.reductionCounterAttack, defenderAttribute?.counterAttack)
  const { hasAvoid } = handleAvoid(defenderAttribute?.avoid, attackerAttribute?.reductionAvoid)
  if (hasAvoid)
    originDMG = 0

  return {
    receiveDMG: originDMG,
    attackerBloodsucking: recovery,
    attackerCritical: hasCritical,
    defenderCounterAttack: counterDamage,
    defenderAvoid: hasAvoid,
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

/**
 * It takes two objects, each of which has a property called `kabbalah` which is an object with
 * properties that are strings. The function then checks if the `kabbalah` property of each object has
 * a property called `used` that is set to `true`. If it does, it adds the property name to an array.
 * Then it filters an array of objects called `KABBALAH_RULE` to only include objects whose `sign`
 * property matches one of the property names in the array
 * @param {Target} targetA - Target, targetB: Target
 * @param {Target} targetB - Target
 */
const formatKabbalah = (targetA: Target, targetB: Target) => {
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

const matchFormat = (targetA: Target, targetB: Target) => {
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

const formatBeforeStartBattle = (targetA: Target, targetB: Target) => {
  const battle: Record<string, any> = {
    [`${targetA.attribute.speed}_${targetA.extends._id}`]: [
      {
        kabbalah: targetA.kabbalah,
        kabbalahRule: targetA.kabbalahRule,
        attribute: targetA.attribute,
      },
      {
        kabbalah: targetB.kabbalah,
        kabbalahRule: targetB.kabbalahRule,
        attribute: targetB.attribute,
      },
    ],
    [`${targetB.attribute.speed}_${targetB.extends._id}`]: [
      {
        kabbalah: targetB.kabbalah,
        kabbalahRule: targetB.kabbalahRule,
        attribute: targetB.attribute,
      },
      {
        kabbalah: targetA.kabbalah,
        kabbalahRule: targetA.kabbalahRule,
        attribute: targetA.attribute,
      },
    ],
  }

  return battle
}

const orderTurn = (battle: any) => {
  return Object.entries(battle)
    .sort()
  // eslint-disable-next-line no-sequences
    .reduce((o: any, [k, v]) => (((o[k]) = v), o), {})
}

interface Target {
  spiritualRoot?: PlayerSpiritualRoot
  kabbalah?: PlayerKabbalah
  kabbalahRule?: KabbalahRule[]
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

  // TODO: Format thần thông nếu có
  formatKabbalah(targetA, targetB)
  const match = matchFormat(targetA, targetB)

  const emulators: Emulator[] = []
  for (let i = 0; i < 60; i++) {
    // TODO Chuẩn bị dữ liệu
    const battle = formatBeforeStartBattle(targetA, targetB)
    // TODO: Xem mục tiêu nào được đánh trước
    const battleReverse = orderTurn(battle)

    for (const b in battleReverse) {
      const battleTarget = battle[b]
      const attacker = battleTarget[0]
      const { kabbalahProps } = handleKabbalahStartBattle(attacker)
      emulators.push(<Emulator>{
        [b]: {
          action: BATTLE_ACTION.BUFF,
          state: {},
          self: {
            kabbalahProps: [{ ...kabbalahProps }],
          },
          now: {},
        },
      })
    }

    for (const b in battleReverse) {
      const battleTarget = battle[b]
      const attackerAttribute = battleTarget[0].attribute
      const defenderAttribute = battleTarget[1].attribute

      const {
        receiveDMG,
        attackerBloodsucking,
        attackerCritical,
        defenderCounterAttack,
        defenderAvoid,
        kabbalahProps,
      } = receiveDamageV2(battleTarget)

      const realDamageId = b.split('_')[1]
      if (!totalDamage.list[realDamageId])
        totalDamage.list[realDamageId] = 0

      totalDamage.list[realDamageId] += receiveDMG
      defenderAttribute.hp -= formatHP(defenderAttribute?.hp, receiveDMG)
      attackerAttribute.hp -= formatHP(attackerAttribute.hp, defenderCounterAttack)

      if (attackerAttribute.hp > 0 && attackerBloodsucking > 0)
        attackerAttribute.hp += attackerBloodsucking

      // TODO: Lưu giả lập
      emulators.push(<Emulator>{
        [b]: {
          action: BATTLE_ACTION.ATTACK,
          state: {
            receiveDamage: {
              [defenderAttribute._id]: receiveDMG,
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
              [defenderAttribute._id]: defenderAttribute.hp,
            },
            mp: {
              [attackerAttribute._id]: attackerAttribute.mp,
            },
          },
        },
      })

      if (attackerAttribute.hp <= 0 || defenderAttribute.hp <= 0) {
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
