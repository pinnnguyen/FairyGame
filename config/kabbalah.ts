import type { KabbalahRule } from '~/types'

export const KABBALAH_RULE: Record<string, KabbalahRule[]> = {
  1: [
    {
      focus: 'in_battle',
      max: 4,
      valueOnLevel: 20,
      active: 'percent',
      name: 'Kim nguyên kiếm',
      sign: 'needle_spiritual_1',
      level: 1,
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
      focus: 'start_battle',
      name: 'Kim nguyên tâm pháp',
      title: 'Bắt đầu vào chiến trường, Bản thân tăng #percentDamage Công, #percentSpeed Tốc',
      sign: 'needle_spiritual_2',
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
      sign: 'needle_spiritual_3',
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
