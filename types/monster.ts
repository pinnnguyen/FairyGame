import type { BaseAttributes, BaseReward, EquipRateReward, ItemRateReward, PlayerEquipment } from '~/types'

export interface BaseMonster {
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

export interface BaseBossType {
  id: number
  _id: string
  kind: 'daily' | 'frame_time' | 'elite'
  name: string
  quality: number
  level: number
  info: string
  sex: string
  avatar: string
  reward: {
    base: BaseReward
    equipRates: EquipRateReward[]
    itemRates: ItemRateReward[]
    equipments: PlayerEquipment[]
  }
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

export type Monster = BaseMonster

export type BossDaily = BaseBossType & {
  numberOfTurn?: number
}

export type BossElite = BaseBossType & {
  bossId: number
  hp: number
}

export type BossFrameTime = BaseBossType & {
  bossId: number
  hp: number
}

export type EnemyObject = Monster | BossDaily | BossElite
