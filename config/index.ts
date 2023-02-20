import type { PlayerAttribute } from '~/types'

export * from './kabbalah'
export * from './spiritual'
export * from './mind'
export * from './classRule'

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
