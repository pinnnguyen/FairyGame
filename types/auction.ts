import type { Equipment } from '~/types/equiment'

export interface AuctionItem extends Equipment {
  quantity: number
  price: number
}
export interface Auction {
  _id: string
  kind: string
  name: string
  info: string
  auctionItems: AuctionItem[]
  startTime: number
  endTime: number
}
