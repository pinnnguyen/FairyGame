import type { BaseAttributes, BaseReward, PlayerEquipment, RateReward } from '~/types'

export interface Monster {
  _id: string /* primary key */
  id: number
  name: any // type unknown;
  level: number
  info: any // type unknown;
  sex: any // type unknown;
  reward: {
    base: BaseReward
    equipRates: RateReward[]
    equipments?: PlayerEquipment[]
  }
  attribute: BaseAttributes
  class: number
  numberOfTurn: number
}

export interface Boss {
  _id: string /* primary key */
  id: number
  kind: 'daily' | 'only_time' | 'elite'
  name: any // type unknown;
  level: number
  info: any // type unknown;
  sex: any // type unknown;
  avatar: string
  mhp?: number
  reward: {
    base: BaseReward
    equipRates: RateReward[]
    equipments: PlayerEquipment[]
  }
  attribute: BaseAttributes
  numberOfTurn: number
  class: number
  startHours: number
  endHours: number
  isStart: boolean
}

export interface BossElite {
  _id: string /* primary key */
  bossId: number
  kind: 'daily' | 'only_time' | 'elite'
  name: string
  level: number
  info: string
  sex: string
  avatar: string
  mhp?: number
  reward: {
    base: BaseReward
    equipRates: RateReward[]
    equipments: PlayerEquipment[]
  }
  attribute: BaseAttributes
  class: number
  refreshTime: number
  refresh: boolean
  topDamage: []
  topPoint: []
  killer: string
}

export type EnemyObject = Monster | Boss | BossElite
