import type { EnemyObject, PlayerInfo } from '~/types'

export const classPlayerCounter = (_p: PlayerInfo, _enemyObject: EnemyObject) => {
  const counter = {
    1: {
      3: {
        extraDamage: {
          value: 10,
          unit: 'percent',
        },
      },
    },
    2: {
      1: {
        extraDamage: {
          value: 10,
          unit: 'percent',
        },
      },
    },
    3: {
      4: {
        extraDamage: {
          value: 10,
          unit: 'percent',
        },
      },
    },
    4: {
      2: {
        extraDamage: {
          value: 10,
          unit: 'percent',
        },
      },
    },
  }

  const classToClass = counter[_p?.player?.class][_enemyObject.class]
  if (classToClass && classToClass.extraDamage) {

  }
}
