import type { BaseAttributes } from '~/types/player'

export interface Monsters extends BaseAttributes {
  _id: string /* primary key */
  id: number
  name: any // type unknown;
  level: number
  info: any // type unknown;
  sex: any // type unknown;
  itemIds: []
  rateItem: number
}
