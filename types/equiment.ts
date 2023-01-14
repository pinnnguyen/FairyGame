export interface RateReward {
  id: number
  rate: number
  kind: number
  quantity: number
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
}
export interface PlayerEquipmentStat {
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
  stats?: PlayerEquipmentStat[]
  used?: boolean
}
export interface Bag {
  equipments: PlayerEquipment
}
