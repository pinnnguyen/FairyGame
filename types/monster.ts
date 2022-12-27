import type { RateReward } from '~/types/equiment'
import type { BaseAttributes } from '~/types/player'

export type EnemyObject = Monster

export interface Monster extends BaseAttributes {
  _id: string /* primary key */
  id: number
  name: any // type unknown;
  level: number
  info: any // type unknown;
  sex: any // type unknown;
  equipments: RateReward[]
}

export interface Boss extends BaseAttributes {
  _id: string /* primary key */
  id: number
  name: any // type unknown;
  level: number
  info: any // type unknown;
  sex: any // type unknown;
  equipments: RateReward[]
}
