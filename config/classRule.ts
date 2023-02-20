export const ROLE_NAME: Record<number, string> = {
  1: 'Tiên Tộc',
  2: 'Yêu Tộc',
  3: 'Ma Tộc',
  4: 'Nhân Tộc',
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
