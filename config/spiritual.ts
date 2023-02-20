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
      hp: 80,
      criticalDamage: 0.15,
      def: 15,
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
      hp: 60,
      criticalDamage: 0.15,
      def: 10,
      reductionCriticalDamage: 0.15,
      speed: 2,
      recoveryPerformance: 0.8,
      speedPractice: 0.1,
    },
  },
  4: {
    name: 'Hoả',
    color: '#f44336',
    values: {
      damage: 25,
      hp: 40,
      criticalDamage: 0.20,
      def: 5,
      reductionCriticalDamage: 0.20,
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
      criticalDamage: 0.25,
      def: 5,
      reductionCriticalDamage: 0.15,
      speed: 2,
      recoveryPerformance: 0,
      speedPractice: 0.1,
    },
  },
}
