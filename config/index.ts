import type { KabbalahRule, PlayerAttribute } from '~/types'
export enum REACH_LIMIT {
  TIEN_DAU = 10,
}
export const DEFAULT_MIN_RATE_RECEIVED = 1
export const DEFAULT_MAX_RATE_RECEIVED = 100
export const DEFAULT_ROLE = {
  gold: 0,
  coin: 0,
  power: 0,
  vip_level: 0,
  level: 0,
  midId: 1,
  exp: 0,
  knb: 0,
  arenas: {
    tienDau: {
      score: 0,
      pos: 0,
    },
  },
}

export const DEFAULT_ATTRIBUTE: PlayerAttribute = {
  counterAttack: 0, // phản đòn
  recoveryPerformance: 0, // hiệu xuất hồi phục
  avoid: 0, // né đòn
  reductionCriticalDamage: 0, // miễn thương bạo kích
  reductionRecoveryPerformance: 0, // khang hoi phuc
  reductionBloodsucking: 0,
  damage: 50,
  def: 30,
  hp: 200,
  mp: 50,
  bloodsucking: 0,
  critical: 0, // 0%
  criticalDamage: 150, // 150%
  speed: 1,
  reductionCounterAttack: 0,
  reductionAvoid: 0,
}

export const ROLE_NAME: Record<number, string> = {
  1: 'Tiên Tộc',
  2: 'Yêu Tộc',
  3: 'Ma Tộc',
  4: 'Nhân Tộc',
}

export const MIND_DHARMA_CONFIG: Record<string, any> = {
  damage: {
    enhance: 1,
    main: 10,
  },
  def: {
    enhance: 1,
    main: 5,
  },
  critical: {
    enhance: 1,
    main: 0.5,
  },
  hp: {
    enhance: 1,
    main: 40,
  },
  criticalDamage: {
    enhance: 1,
    main: 1.5,
  },
  reductionCriticalDamage: {
    enhance: 1,
    main: 1.5,
  },
  recoveryPerformance: {
    enhance: 1,
    main: 0.5,
  },
  reductionRecoveryPerformance: {
    enhance: 1,
    main: 0.5,
  },
}

export const MIND_DHARMA_DES: Record<string, { title: string; description: string }> = {
  damage: {
    title: 'Công kích',
    description: 'Tâm pháp giúp nâng cao khả năng gây sát thương',
  },
  def: {
    title: 'Phòng thủ',
    description: 'Tâm pháp giúp nâng cao sức phòng thủ',
  },
  critical: {
    title: 'Bạo kích',
    description: 'Tâm pháp giúp nâng cao tỉ lệ bạo kích',
  },
  hp: {
    title: 'Sinh lực',
    description: 'Tâm pháp giúp nâng cao sinh lực khéo dài khả năng sinh tồn',
  },
  criticalDamage: {
    title: 'Sát thương bạo kích',
    description: 'Tâm pháp giúp tăng sát thương khi gây đòn đánh bạo kích',
  },
  reductionCriticalDamage: {
    title: 'Miễn sát thương bạo kích',
    description: 'Tâm pháp giúp kháng lại sát thương nhận phải',
  },
  recoveryPerformance: {
    title: 'Tăng khả năng hồi phục',
    description: 'Tâm pháp giúp tăng khả năng hồi phục sinh lực dựa theo các nguồn sát thương gây ra',
  },
  reductionRecoveryPerformance: {
    title: 'Kháng khả năng hồi phục',
    description: 'Tâm pháp làm giảm khả năng hồi phục của mục tiêu',
  },
}

export const MIND_DHARMA_RESOURCE: Record<string, { needGold: number; needExp: number }> = {
  damage: {
    needGold: 10000,
    needExp: 7000,
  },
  def: {
    needGold: 10000,
    needExp: 7000,
  },
  critical: {
    needGold: 20000,
    needExp: 18000,
  },
  hp: {
    needGold: 10000,
    needExp: 7000,
  },
  criticalDamage: {
    needGold: 15000,
    needExp: 14000,
  },
  reductionCriticalDamage: {
    needGold: 15000,
    needExp: 14000,
  },
  recoveryPerformance: {
    needGold: 15000,
    needExp: 14000,
  },
  reductionRecoveryPerformance: {
    needGold: 15000,
    needExp: 14000,
  },
}

export const CLASS_RULE: Record<string, {
  name: string
  values: Record<string, number>
}> = {
  1: {
    name: 'Tu tiên',
    values: {
      hp: 0,
      def: 0,
      damage: 0,
      hpPercent: 10,
      defPercent: 5,
      damagePercent: 10,
      criticalDamage: 5,
    },
  },
  2: {
    name: 'Yêu tộc',
    values: {
      hp: 0,
      def: 0,
      damage: 0,
      hpPercent: 10,
      defPercent: 5,
      damagePercent: 0,
      criticalDamage: 0,
    },
  },
  3: {
    name: 'Tu ma',
    values: {
      hp: 0,
      def: 0,
      damage: 0,
      hpPercent: 0,
      defPercent: 0,
      damagePercent: 5,
      criticalDamage: 10,
    },
  },
  4: {
    name: 'Nhân tộc',
    values: {
      hp: 0,
      def: 0,
      damage: 0,
      hpPercent: 5,
      defPercent: 5,
      damagePercent: 5,
      criticalDamage: 0,
    },
  },
}

export const SPIRITUAL_ROOT_RESOURCE = {
  CHAN_NGUYEN: 10000,
}

export const SPIRITUAL_ROOT_RULE: Record<string, {
  name: string
  color: string
  values: Record<string, number>
}> = {
  1: {
    name: 'Kim',
    color: '#ffeb3b',
    values: {
      damage: 20,
      hp: 40,
      criticalDamage: 0.15,
      def: 5,
      reductionCriticalDamage: 0.10,
      speed: 2,
      recoveryPerformance: 0,
      speedPractice: 0.1,
    },
  },
  2: {
    name: 'Mộc',
    color: '#4caf50',
    values: {
      damage: 10,
      hp: 60,
      criticalDamage: 0.15,
      def: 10,
      reductionCriticalDamage: 0.10,
      speed: 1,
      recoveryPerformance: 0,
      speedPractice: 0.1,
    },
  },
  3: {
    name: 'Thuỷ',
    color: '#00bcd4',
    values: {
      damage: 15,
      hp: 50,
      criticalDamage: 0.15,
      def: 5,
      reductionCriticalDamage: 0.10,
      speed: 2,
      recoveryPerformance: 0.5,
      speedPractice: 0.1,
    },
  },
  4: {
    name: 'Hoả',
    color: '#f44336',
    values: {
      damage: 20,
      hp: 40,
      criticalDamage: 0.20,
      def: 5,
      reductionCriticalDamage: 0.10,
      speed: 2,
      recoveryPerformance: 0,
      speedPractice: 0.1,
    },
  },
  5: {
    name: 'Thổ',
    color: '#b37417',
    values: {
      damage: 20,
      hp: 40,
      criticalDamage: 0.15,
      def: 5,
      reductionCriticalDamage: 0.15,
      speed: 2,
      recoveryPerformance: 0,
      speedPractice: 0.1,
    },
  },
}

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
      rate: 20,
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
        hp: 30,
        damage: 10,
        def: 5,
        speed: 1,
      },
    },
  ],
}
