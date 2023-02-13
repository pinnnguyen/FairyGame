import type { BaseAttributeKeys } from './player'
import type { PlayerGem } from './gem'

export interface BaseEquipment {
  _id?: string
  id?: number
  name: string
  info?: string
  rank?: number
  level?: number
  slot: number
  preview?: string
  enhance?: number
  stats?: PlayerEquipmentStat[]
}
export interface EquipRateReward {
  id: number
  rate: number
  kind: number
  quantity: number
}

export interface ItemRateReward {
  id: number
  rate: number
  quantityRate: string
}

export interface EquipmentBaseEnhance {
  enhance: number
  main: number
  star: number
}

export type Equipment = BaseEquipment & {
  sid?: string
}

export type PlayerEquipmentStat = {
  [key in BaseAttributeKeys | string]: EquipmentBaseEnhance
}
export type PlayerEquipment = BaseEquipment & {
  sid?: string
  equipmentId?: number
  gemSlot: number
  gems: Partial<PlayerGem[]>
}
