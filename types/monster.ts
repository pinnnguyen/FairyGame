import type { BaseAttributes, BaseReward, EquipRateReward, ItemRateReward, PlayerEquipment } from '~/types'

export interface Monster {
  _id: string /* primary key */
  id: number
  name: any // type unknown;
  level: number
  info: any // type unknown;
  sex: any // type unknown;
  reward: {
    base: BaseReward
    equipRates: EquipRateReward[]
    itemRates: ItemRateReward[]
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
  quality: number
  info: any // type unknown;
  sex: any // type unknown;
  avatar: string
  mhp?: number
  reward: {
    base: BaseReward
    equipRates: EquipRateReward[]
    itemRates: ItemRateReward[]
    equipments: PlayerEquipment[]
  }
  attribute: BaseAttributes
  numberOfTurn?: number
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
  quality: number
  level: number
  info: string
  sex: string
  avatar: string
  mhp?: number
  reward: {
    base: BaseReward
    equipRates: EquipRateReward[]
    itemRates: ItemRateReward[]
    equipments: PlayerEquipment[]
  }
  hp: number
  attribute: BaseAttributes
  class: number
  revive: number
  death: boolean
  topDamage: []
  topPoint: []
  killer: {
    avatar: string
    name: string
    sid: string
  }
  startHours?: number
  endHours?: number
  isStart?: boolean
}

export type EnemyObject = Monster | Boss | BossElite
