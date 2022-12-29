import type { BaseAttributes } from '~/types/player'

export interface RateReward {
  id: number
  rate: number
}

export interface Equipment extends BaseAttributes {
  _id: string
  id: number
  name: string
  info?: string
  rank?: number
  level?: number
  slot: number
  preview?: string
}

export interface PlayerEquipment extends BaseAttributes {
  _id?: string
  sid: string
  equipmentId?: number
  name?: string
  info?: string
  rank?: number
  level?: number
  slot: number
  preview?: string
}
export interface Bag {
  equipments: PlayerEquipment
}
