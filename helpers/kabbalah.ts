import { randomNumber } from '~/common'
import type { KabbalahRule } from '~/types'

export const handleKabbalahInBattle = (kabbalahRule?: KabbalahRule[], originDMG?: number) => {
  let kabbalahDamage = originDMG
  let kabbalahProps = {}

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

    switch (rule.sign) {
      // Thần thông hệ kim 1
      case 'needle_spiritual_1':
        if (rule.rate! >= ran) {
          kabbalahDamage! += (originDMG! * rule.value!) / 100
          kabbalahProps = {
            name: rule.name,
            sign: rule.sign,
            value: rule.value,
            focus: rule.focus,
          }
        }
        break
    }
  }

  return {
    kabbalahDamage,
    kabbalahProps,
  }
}
