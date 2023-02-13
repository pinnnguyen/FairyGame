import type { Mid } from '~/types/mid'
import type { PlayerEquipment } from '~/types/equiment'

export type BaseAttributeKeys = 'speed'
| 'damage'
| 'def'
| 'hp'
| 'mp'
| 'critical'
| 'bloodsucking'
| 'criticalDamage'
| 'avoid'
| 'reductionAvoid'
| 'reductionCriticalDamage'
| 'reductionBloodsucking'
| 'counterAttack'
| 'recoveryPerformance'
| 'reductionRecoveryPerformance'
| 'reductionCounterAttack'

export const PlayerStatusTypeCon = {
  reduce_waiting_time_training: 'reduce_waiting_time_training',
}

export type PlayerStatusType = 'reduce_waiting_time_training'

export type BaseAttributes = {
  [key in BaseAttributeKeys]: number
  // speed: number
  // damage: number
  // def: number
  // hp: number
  // mp: number
  // critical: number
  // bloodsucking: number
  // criticalDamage: number
  // avoid: number // Ne Don
  // reductionAvoid: number // Bo qua ne don
  // reductionCriticalDamage: number // Khang sat thuong bao kich
  // reductionBloodsucking: number // Khang hut mau
  // counterAttack: number // Phan dam
  // recoveryPerformance: number // Hieu xuat hoi phuc
  // reductionRecoveryPerformance: number // Khang hoi phuc
  // reductionCounterAttack: number // Khang phan dam
}

export interface CoreAttribute {
  // [key: string]: number
  ofPower: number
  ofAgility: number
  ofSkillful: number
  ofVitality: number
}
export interface Player {
  _id?: string
  ofAttribute: number
  coreAttribute: CoreAttribute
  sid: string
  gender: string
  name: string
  gold: number
  knb: number
  coin: number
  power: number
  level: number
  midId: string
  userId: string
  vipLevel: number
  exp: number
  lastTimeReceivedRss: number
  levelTitle: string
  floor: string
  expLimited: number
  class: number
}

export interface PlayerAttribute extends BaseAttributes {
  _id?: string
  sid?: string
}

export interface PlayerInfo {
  player: Player
  attribute: PlayerAttribute
  mid: {
    current?: Mid
    next?: Mid
  }
}

export interface PlayerServerResponse {
  player: Player
  attribute: PlayerAttribute
  mid: {
    current?: Mid
    next?: Mid
  }
  upgrade: Upgrade
  equipments: PlayerEquipment[]
}
export interface PlayerDataResponse extends Player {
  attribute: PlayerAttribute
  mid: {
    current?: Mid
    next?: Mid
  }
  upgrade: Upgrade
  equipments: any
}

export interface Upgrade {
  condition: {
    needGold?: number
    beUpgrade?: boolean
  }
}

export interface PlayerStatus {
  _id?: string
  sid: string
  itemId: string
  type?: PlayerStatusType
  value?: number
  timeLeft?: number
}
