import type { BaseAttributeKeys, BattleTarget, KabbalahRule, PlayerKabbalah } from '~/types'
import { randomNumber } from '~/common'
import { useApplyPercentAttribute } from '~/server/helpers'

export const handleKabbalahStartBattle = (attacker: BattleTarget) => {
  let kabbalahProps = {}

  if (!attacker.kabbalah) {
    return {
      kabbalahProps: null,
    }
  }

  if (!attacker.kabbalahRule || attacker.kabbalahRule.length <= 0) {
    return {
      kabbalahProps: null,
    }
  }

  for (const rule of attacker.kabbalahRule) {
    if (rule.focus !== 'before_s_battle')
      continue

    // Thần thông hệ kim 2
    if (rule.sign === 'spiritual_2') {
      // TODO: Lấy cấp độ thần thông tính độ trưởng thành
      let kabbalahLevel = attacker.kabbalah[rule.sign].level
      if (kabbalahLevel > rule.max!)
        kabbalahLevel = rule.max!

      const rateLevelValue = kabbalahLevel * rule.valueOnLevel!
      if (rule.target?.role === 'player') {
        const values = rule.values
        const endValues: any = {}
        for (const v in values) {
          endValues[v] = values[v] + rateLevelValue
          useApplyPercentAttribute({
            key: v as BaseAttributeKeys,
            value: values[v] + rateLevelValue,
          }, attacker.attribute)
        }

        kabbalahProps = {
          name: rule.name,
          sign: rule.sign,
          value: rule.value,
          values: endValues,
          focus: rule.focus,
        }
      }
    }
  }

  return {
    kabbalahProps,
  }
}

export const handleKabbalahInBattle = (kabbalahRule?: KabbalahRule[], kabbalah?: PlayerKabbalah, originDMG?: number) => {
  let kabbalahDamage = originDMG
  let kabbalahProps: Partial<KabbalahRule> = {}

  if (!kabbalah) {
    return {
      kabbalahDamage,
      kabbalahProps: null,
    }
  }

  if (!kabbalahRule || kabbalahRule.length <= 0) {
    return {
      kabbalahDamage,
      kabbalahProps: null,
    }
  }

  const ran = randomNumber(1, 100)
  for (const rule of kabbalahRule) {
    if (rule.focus !== 'in_battle')
      continue

    if (rule.sign === 'spiritual_1') {
      // TODO: Lấy cấp độ thần thông tính độ trưởng thành
      const kabbalahLevel = kabbalah[rule.sign].level
      let rateValue = rule.rate!.value! + (kabbalahLevel * rule.valueOnLevel!)
      // TODO: Check giới hạn tỷ lệ xuất ra thần thông theo config
      if (rateValue > rule.rate!.max!)
        rateValue = rule.rate!.max!

      if (rateValue >= ran) {
        kabbalahDamage! += (originDMG! * rule.value!) / 100
        kabbalahProps = {
          tag: rule.tag,
          name: rule.name,
          sign: rule.sign,
          value: rule.value,
          focus: rule.focus,
          effect: rule.effect,
        }
      }
    }
  }

  return {
    kabbalahDamage,
    kabbalahProps,
  }
}
