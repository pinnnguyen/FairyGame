import { randomNumber } from '~/common'
import type { KabbalahRule } from '~/types'

export const KABBALAH_DEFAULT_SCRIPTS = ''
export const KABBALAH_SCRIPTS = [
  `<span class="underline">#attacker</span> 
  Tụ lực xuất ra một chiêu 
  <span class="text-green-500">#kabbalahName</span> 
  khí thế mạnh mẽ, Dễ như trở bản tay 
  <span class="underline">#defender</span>
  lấy thân ngăn cản thừa nhận 
  <span class="text-red-500">#damage sát thương</span>`,
  `<span class="underline">#attacker</span>
  Tung ra một chiêu
  <span class="text-green-500">#kabbalahName</span> 
  trong nháy mắt đến 
  <span class="underline">#defender</span> phải nhận lấy 
  <span class="text-red-500">#damage sát thương </span>`,
]

export const KABBALAH_TAG_NAME = {
  JINYUAN_SWORD: 'jinyuan_sword',
  CARPENTRY_TECHNIQUES: 'carpentry_techniques',
}

export const randomKabbalahScript = () => {
  const ran = Math.round(randomNumber(0, KABBALAH_SCRIPTS.length - 1))

  return KABBALAH_SCRIPTS[ran]
}
export const KABBALAH_RULE: Record<string, KabbalahRule[]> = {
  1: [
    {
      tag: 'jinyuan_sword',
      hasEffect: false,
      focus: 'in_battle',
      max: 6,
      valueOnLevel: 20,
      active: 'percent',
      name: 'Kim nguyên kiếm',
      sign: 'spiritual_1',
      rate: {
        value: 0,
        max: 30,
      },
      value: 115,
      target: {
        num: 1,
        role: 'damage',
      },
      title: 'Có #rate gây #value% sát thương lên #targetNum mục tiêu',
    },
    {
      max: 8,
      valueOnLevel: 2,
      focus: 'before_s_battle',
      name: 'Kim nguyên công pháp',
      title: 'Bắt đầu vào chiến trường, Bản thân tăng #percentDamage Công, #percentSpeed Tốc',
      sign: 'spiritual_2',
      target: {
        role: 'player',
      },
      values: {
        percentDamage: 3,
        percentSpeed: 2.25,
      },
    },
    {
      max: 50,
      focus: 'attribute',
      name: 'Kim nguyên tâm pháp',
      sign: 'spiritual_3',
      title: 'Công pháp bậc 3 của thiên kiếm môn, kim linh căn mới có thể tu luyện, chủ yếu tăng công tốc',
      values: {
        hp: 50,
        damage: 10,
        def: 5,
        speed: 1,
      },
    },
  ],
  2: [
    {
      tag: 'carpentry_techniques',
      focus: 'in_battle',
      max: 6,
      valueOnLevel: 15,
      active: 'percent',
      name: 'Mộc nguyên công',
      sign: 'spiritual_1',
      rate: {
        value: 0,
        max: 30,
      },
      value: 98,
      target: {
        num: 1,
        role: 'damage',
      },
      title: 'Có #rate đầu độc kẻ địch trong 3 lượt, gây #value% sát thương mỗi lượt',
      hasEffect: true,
      effect: {
        disadvantage: {
          poisoned: {
            round: 3,
            target: 'reductionRecoveryPerformance',
            value: 90,
          },
        },
        helpful: {},
      },
    },
    {
      max: 8,
      valueOnLevel: 2,
      focus: 'before_s_battle',
      name: 'Mộc nguyên công pháp',
      title: 'Bắt đầu vào chiến trường, Bản thân tăng #percentHp Sinh lực, #percentDef Phòng thủ',
      sign: 'spiritual_2',
      target: {
        role: 'player',
      },
      values: {
        percentHp: 4.5,
        percentDef: 3.25,
      },
    },
    {
      max: 50,
      focus: 'attribute',
      name: 'Mộc nguyên tâm pháp',
      sign: 'spiritual_3',
      title: 'Công pháp bậc 3 của thiên kiếm môn, kim linh căn mới có thể tu luyện, chủ yếu tăng công tốc',
      values: {
        hp: 50,
        damage: 10,
        def: 5,
        speed: 1,
      },
    },
  ],
  3: [
    {
      focus: 'in_battle',
      max: 4,
      valueOnLevel: 20,
      active: 'percent',
      name: 'Kim nguyên kiếm',
      sign: 'spiritual_1',
      rate: {
        value: 0,
        max: 80,
      },
      value: 185,
      target: {
        num: 1,
        role: 'damage',
      },
      title: 'Có #rate gây #value sát thương lên #targetNum mục tiêu',
    },
    {
      max: 8,
      valueOnLevel: 2,
      focus: 'before_s_battle',
      name: 'Kim nguyên tâm pháp',
      title: 'Bắt đầu vào chiến trường, Bản thân tăng #percentDamage Công, #percentSpeed Tốc',
      sign: 'spiritual_2',
      target: {
        role: 'player',
      },
      values: {
        percentDamage: 3,
        percentSpeed: 2.25,
      },
    },
    {
      max: 50,
      focus: 'attribute',
      name: 'Kim nguyên công pháp',
      sign: 'spiritual_3',
      title: 'Công pháp bậc 3 của thiên kiếm môn, kim linh căn mới có thể tu luyện, chủ yếu tăng công tốc',
      values: {
        hp: 50,
        damage: 10,
        def: 5,
        speed: 1,
      },
    },
  ],
  4: [
    {
      focus: 'in_battle',
      max: 4,
      valueOnLevel: 20,
      active: 'percent',
      name: 'Kim nguyên kiếm',
      sign: 'spiritual_1',
      rate: {
        value: 0,
        max: 80,
      },
      value: 185,
      target: {
        num: 1,
        role: 'damage',
      },
      title: 'Có #rate gây #value sát thương lên #targetNum mục tiêu',
    },
    {
      max: 8,
      valueOnLevel: 2,
      focus: 'before_s_battle',
      name: 'Kim nguyên tâm pháp',
      title: 'Bắt đầu vào chiến trường, Bản thân tăng #percentDamage Công, #percentSpeed Tốc',
      sign: 'spiritual_2',
      target: {
        role: 'player',
      },
      values: {
        percentDamage: 3,
        percentSpeed: 2.25,
      },
    },
    {
      max: 50,
      focus: 'attribute',
      name: 'Kim nguyên công pháp',
      sign: 'spiritual_3',
      title: 'Công pháp bậc 3 của thiên kiếm môn, kim linh căn mới có thể tu luyện, chủ yếu tăng công tốc',
      values: {
        hp: 50,
        damage: 10,
        def: 5,
        speed: 1,
      },
    },
  ],
  5: [
    {
      focus: 'in_battle',
      max: 4,
      valueOnLevel: 20,
      active: 'percent',
      name: 'Kim nguyên kiếm',
      sign: 'spiritual_1',
      rate: {
        value: 0,
        max: 80,
      },
      value: 185,
      target: {
        num: 1,
        role: 'damage',
      },
      title: 'Có #rate gây #value sát thương lên #targetNum mục tiêu',
    },
    {
      max: 8,
      valueOnLevel: 2,
      focus: 'before_s_battle',
      name: 'Kim nguyên tâm pháp',
      title: 'Bắt đầu vào chiến trường, Bản thân tăng #percentDamage Công, #percentSpeed Tốc',
      sign: 'spiritual_2',
      target: {
        role: 'player',
      },
      values: {
        percentDamage: 3,
        percentSpeed: 2.25,
      },
    },
    {
      max: 50,
      focus: 'attribute',
      name: 'Kim nguyên công pháp',
      sign: 'spiritual_3',
      title: 'Công pháp bậc 3 của thiên kiếm môn, kim linh căn mới có thể tu luyện, chủ yếu tăng công tốc',
      values: {
        hp: 50,
        damage: 10,
        def: 5,
        speed: 1,
      },
    },
  ],
}
