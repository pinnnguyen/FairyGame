import type { Gem, PlayerGem } from '~/types/gem'

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

export interface Equipment {
  sid?: string
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

export interface EquipmentBaseEnhance {
  enhance: number
  main: number
  star: number
}
export interface PlayerEquipmentStat {
  [key: string]: EquipmentBaseEnhance
  speed: EquipmentBaseEnhance
  damage: EquipmentBaseEnhance
  def: EquipmentBaseEnhance
  hp: EquipmentBaseEnhance
  mp: EquipmentBaseEnhance
  critical: EquipmentBaseEnhance
  bloodsucking: EquipmentBaseEnhance
  criticalDamage: EquipmentBaseEnhance
}
export interface PlayerEquipment {
  _id?: string
  sid: string
  equipmentId?: number
  name?: string
  info?: string
  rank?: number
  level?: number
  slot: number
  preview?: string
  enhance?: number
  star?: number
  stats?: PlayerEquipmentStat[]
  used?: boolean
  quality: number
  gemSlot: number
  gems: Partial<PlayerGem[]>
}
export interface Bag {
  equipments: PlayerEquipment
}
