import type { Equipment } from '~/types/equiment'export interface AuctionItem {  _id: string  quantity: number  price: number  sid: string  itemId: number  auctionId: String  kind: string  detail: Equipment}export interface Auction {  _id: string  kind: number  name: string  info: string  startTime: number  endTime: number  open: boolean}