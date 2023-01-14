export interface BasicItem {
  kind: number
  name: string
  info: string
  preview: string
  rank: number
  value: number
}

export interface Item {
  _id?: string
  sid?: string
  sum?: number
  itemId?: number
  info?: BasicItem
}
