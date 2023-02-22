import type { BaseAttributeKeys } from '~/types'

export * from './items'
export * from './socket'
export * from './war'
export * from './equipment'

export const attributeToName: Record<BaseAttributeKeys | string, string> = {
  speed: 'Tốc độ',
  damage: 'Công kích',
  hp: 'Sinh lực',
  mp: 'Năng lượng',
  def: 'Phòng thủ',
  critical: 'Bạo kích',
  bloodsucking: 'Hút sinh lực',
  criticalDamage: 'Sát thương bạo kích',
  avoid: 'Phản đòn',
  reductionAvoid: 'Kháng phản đòn',
  reductionCriticalDamage: 'Miễn thương bạo kích',
  reductionBloodsucking: 'Kháng hút máu',
  counterAttack: 'Né tránh',
  recoveryPerformance: 'Hiệu xuất hồi phục',
  reductionRecoveryPerformance: 'Kháng hồi phục',
  reductionCounterAttack: 'Bỏ qua nó tránh',
  speedPractice: 'Tốc độ tu luyện',
  percentDamage: '% Công',
  percentSpeed: '% Tốc',
  percentHp: '% Sinh lực',
  percentDef: '% Phòng thủ',
}
