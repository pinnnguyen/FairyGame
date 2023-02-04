export interface BasicItem {
  _id?: string
  id: number
  kind?: number
  name?: string
  note?: string
  preview?: string
  value?: number
  quantity?: number
}

export interface Item {
  _id?: string
  sid?: string
  sum?: number
  itemId?: number
  info?: BasicItem
}

export interface PlayerItem {
  _id?: string
  sid?: string
  sum?: number
  itemId?: number
  info?: BasicItem
}
