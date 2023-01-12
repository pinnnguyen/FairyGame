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
  // name?: string
  // info?: string
  sum?: number
  // kind?: number
  itemId?: number
  info?: BasicItem
  // rank: number
  // preview: string
  // value: number
}
