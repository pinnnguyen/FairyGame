export type currency = 'KNB' | 'GOLD' | 'COIN'
export interface StoreItem {
  _id?: string
  itemId: number
  price: number
  discount: number
  quantity: number
  kind: number
  currency: currency
}
