import { KABBALAH_RULE } from '~/config'
import { cloneDeep } from '~/helpers'
import { handleKabbalahInBattle } from '~/helpers/kabbalah'
import type { BaseAttributes, KabbalahRule, PlayerAttribute, PlayerKabbalah, PlayerSpiritualRoot } from '~/types'
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

type BattleTarget = BaseAttributes & {
  kabbalahRule?: KabbalahRule[]
}
/**
 * > It receives two objects, calculates the damage, and returns an object with the damage,
 * bloodsucking, critical, counter attack, and avoid
 * @param {any} battleTarget - any
 * @returns An object with the following properties:
 *   receiveDMG: number
 *   attackerBloodsucking: number
 *   attackerCritical: boolean
 *   defenderCounterAttack: number
 *   defenderAvoid: boolean
 */
export const receiveDamageV2 = (battleTarget: BattleTarget[]) => {
  let originDMG: number
  const attacker = battleTarget[0]
  const defender = battleTarget[1]

  const attackerDamage = attacker.damage ?? 0
  const defenderDef = defender.def ?? 0

  originDMG = Math.round(attackerDamage - defenderDef * 0.75)
  if (originDMG < 0)
    originDMG = 0

  const { kabbalahDamage, kabbalahProps } = handleKabbalahInBattle(attacker.kabbalahRule, originDMG)
  if (kabbalahDamage)
    originDMG = kabbalahDamage

  const { blood } = handleBloodsucking(originDMG, attacker?.bloodsucking, defender.reductionBloodsucking)
  const { recovery } = handleRecoveryPerformance(blood, attacker.recoveryPerformance, defender.reductionRecoveryPerformance)
  const { hasCritical, inflictDMG: inflictDMGAfter } = handleCritical(attacker?.critical, originDMG, attacker?.criticalDamage, defender?.reductionCriticalDamage)
  if (hasCritical && inflictDMGAfter > 0)
    originDMG = inflictDMGAfter

  const { counterDamage } = handleCounterAttack(originDMG, attacker?.reductionCounterAttack, defender?.counterAttack)
  const { hasAvoid } = handleAvoid(defender?.avoid, attacker?.reductionAvoid)
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
      if (targetA?.kabbalah[kaUsed].used)
        kabbalahKeyUsed.push(kaUsed)
    }

    aKabbalahRule = KABBALAH_RULE[targetA.spiritualRoot?.kind]
    targetA.kabbalahRule = aKabbalahRule.filter(k => kabbalahKeyUsed.includes(k.sign))
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

/**
 * It takes two objects, and returns a new object with the same keys, but with the values of the
 * original objects swapped
 * @param {Target} targetA - Target
 * @param {Target} targetB - Target
 * @returns An object with two keys, each key is a string of the target's _id.
 */
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

/**
 * It takes two objects, and returns an object with two keys, each key is a string that is a
 * concatenation of the speed of the object and the id of the object, and the value of each key is an
 * array of two objects, the first object is the object itself, and the second object is the other
 * object
 * @param {Target} targetA - Target
 * @param {Target} targetB - Target
 * @returns An object with two keys, each key has an array with two objects.
 */
const formatBeforeStartBattle = (targetA: Target, targetB: Target) => {
  const battle: Record<string, any> = {
    [`${targetA.attribute.speed}_${targetA.extends._id}`]: [
      {
        kabbalahRule: targetA.kabbalahRule,
        ...targetA.attribute,
      },
      {
        kabbalahRule: targetB.kabbalahRule,
        ...targetB.attribute,
      },
    ],
    [`${targetB.attribute.speed}_${targetB.extends._id}`]: [
      {
        kabbalahRule: targetB.kabbalahRule,
        ...targetB.attribute,
      },
      {
        kabbalahRule: targetA.kabbalahRule,
        ...targetA.attribute,
      },
    ],
  }

  return battle
}

/**
 * It takes an object, sorts it by key, and returns a new object with the same keys and values
 * @param {any} battle - any
 * @returns An object with the same keys and values as the input object, but sorted by key.
 */
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

/**
 * It takes two objects, and returns an object with the winner, the total damage, and the emulators
 * @param {Target} targetA - Target, targetB: Target, personBeingAttacked?: string | undefined
 * @param {Target} targetB - Target
 * @param {string | undefined} [personBeingAttacked] - The person who is being attacked.
 * @returns An object with the following properties:
 */
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

  const emulators = []
  for (let i = 0; i < 60; i++) {
    // TODO Chuẩn bị dữ liệu
    const battle = formatBeforeStartBattle(targetA, targetB)
    // TODO: Xem mục tiêu nào được đánh trước
    const battleReverse = orderTurn(battle)

    for (const b in battleReverse) {
      const battleTarget = battle[b]

      const {
        receiveDMG,
        attackerBloodsucking,
        attackerCritical,
        defenderCounterAttack,
        defenderAvoid,
        kabbalahProps,
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

      // TODO: Lưu giả lập
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
            kabbalahProps: [{ ...kabbalahProps }],
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
