import type { BasicItem } from '~/types/item'

export type currency = 'knb' | 'gold' | 'coin' | 'scoreTienDau'
export interface StoreItem {
  _id?: string
  itemId: number
  price: number
  discount: number
  quantity: number
  kind: number
  currency: currency
  props: BasicItem
}
