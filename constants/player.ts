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
  damage: 50,
  def: 30,
  hp: 200,
  mp: 50,
  bloodsucking: 0,
  critical: 0,
  criticalDamage: 1.5,
  speed: 1,
}

export const ATTRIBUTE_TITLE_STATS = {
  damage: 'Công kích',
  def: 'Phòng ngự',
  hp: 'Sinh lực',
  mp: 'Ma lực',
  bloodsucking: 'Hút máu',
  critical: 'Bạo kích',
  speed: 'Tốc độ',
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
