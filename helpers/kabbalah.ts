import { randomNumber } from '~/common'
import type { KabbalahRule, PlayerKabbalah } from '~/types'

export const handleKabbalahStartBattle = (kabbalahRule?: KabbalahRule[], kabbalah?: PlayerKabbalah) => {
  const kabbalahProps = {}

  console.log('kabbalahRule', kabbalahRule)
  if (!kabbalah) {
    return {
      kabbalahProps: null,
    }
  }

  if (!kabbalahRule || kabbalahRule.length <= 0) {
    return {
      kabbalahProps: null,
    }
  }

  for (const rule of kabbalahRule) {
    if (rule.focus !== 'start_battle')
      continue

    // Thần thông hệ kim 2
    if (rule.sign === 'needle_spiritual_2') {
      // TODO: Lấy cấp độ thần thông tính độ trưởng thành
      // const kabbalahLevel = kabbalah[rule.sign].level
      // let rateValue = rule.rate!.value! + (kabbalahLevel * rule.valueOnLevel!)
      // TODO: Check giới hạn tỷ lệ xuất ra thần thông theo config
      // if (rateValue > rule.rate!.max!)
      //   rateValue = rule.rate!.max!

      // if (rateValue >= ran) {
      // kabbalahDamage! += (originDMG! * rule.value!) / 100
      if (rule.target?.role === 'player') {
        const values = rule.values
        for (const v in values)
          console.log('values', values[v])
      }

      // kabbalahProps = {
      //   name: rule.name,
      //   sign: rule.sign,
      //   value: rule.value,
      //   focus: rule.focus,
      // }
      // }
    }
  }
}

export const handleKabbalahInBattle = (kabbalahRule?: KabbalahRule[], kabbalah?: PlayerKabbalah, originDMG?: number) => {
  let kabbalahDamage = originDMG
  let kabbalahProps = {}

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

    // Thần thông hệ kim 1
    if (rule.sign === 'needle_spiritual_1') {
      // TODO: Lấy cấp độ thần thông tính độ trưởng thành
      const kabbalahLevel = kabbalah[rule.sign].level
      let rateValue = rule.rate!.value! + (kabbalahLevel * rule.valueOnLevel!)
      // TODO: Check giới hạn tỷ lệ xuất ra thần thông theo config
      if (rateValue > rule.rate!.max!)
        rateValue = rule.rate!.max!

      if (rateValue >= ran) {
        kabbalahDamage! += (originDMG! * rule.value!) / 100
        kabbalahProps = {
          name: rule.name,
          sign: rule.sign,
          value: rule.value,
          focus: rule.focus,
        }
      }
    }
  }

  return {
    kabbalahDamage,
    kabbalahProps,
  }
}
