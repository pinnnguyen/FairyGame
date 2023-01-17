export interface BasicItem {
  _id?: string
  id: number
  kind?: number
  name?: string
  info?: string
  preview?: string
  rank?: number
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
