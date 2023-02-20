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
    main: 50,
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
