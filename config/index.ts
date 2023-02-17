import type { PlayerAttribute } from '~/types'
export enum REACH_LIMIT {
  TIEN_DAU = 10,
}
export const DEFAULT_MIN_RATE_RECEIVED = 1
export const DEFAULT_MAX_RATE_RECEIVED = 100

export const DEFAULT_MIND_DHARMA = {
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
    main: 20,
  },
  criticalDamage: {
    enhance: 1,
    main: 1.5,
  },
}
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
}
