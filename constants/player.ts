import type { PlayerAttribute } from '~/types'

export const DEFAULT_ROLE = {
  gold: 0,
  coin: 0,
  power: 0,
  vip_level: 0,
  level: 0,
  midId: 1,
  exp: 0,
  knb: 0,
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

export const ROLE_IMG: Record<number, string> = {
  1: '/role/tientoc.png',
  2: '/role/tuyeu.png',
  3: '/role/tuma.png',
  4: '/role/nhantoc.png',
}

export const ROLE_NAME: Record<number, string> = {
  1: 'Tiên Tộc',
  2: 'Yêu Tộc',
  3: 'Ma Tộc',
  4: 'Nhân Tộc',
}
