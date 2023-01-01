import type { BaseAttributes, BaseReward, PlayerEquipment, RateReward } from '~/types'

export interface Monster extends BaseAttributes {
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
  class: number
}

export interface Boss extends BaseAttributes {
  _id: string /* primary key */
  id: number
  kind: 'daily' | 'only_time'
  name: any // type unknown;
  level: number
  info: any // type unknown;
  sex: any // type unknown;
  reward: {
    base: BaseReward
    equipRates: RateReward[]
    equipments: PlayerEquipment[]
  }
  numberOfTurn: number
  class: number
}

export type EnemyObject = Monster | Boss
