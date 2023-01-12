import type { Mid } from '~/types/mid'
export interface BaseAttributes {
  speed: number
  damage: number
  def: number
  hp: number
  mp: number
  critical: number
  bloodsucking: number
  criticalDamage: number
}
export interface Player {
  _id?: string
  sid: string
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
  ofAttribute: number
  ofPower: number
  ofAgility: number
  ofSkillful: number
  ofVitality: number
}

export interface PlayerAttribute extends BaseAttributes, Slot {
  _id?: string
  sid: string
}

export interface PlayerResponse {
  player: Player
  attribute: PlayerAttribute
}

export interface Slot {
  slot_1?: string
  slot_2?: string
  slot_3?: string
  slot_4?: string
  slot_5?: string
  slot_6?: string
  slot_7?: string
  slot_8?: string
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
  equipments: any
  playerEquipUpgrade: any
}
export interface PlayerDataResponse extends Player {
  attribute: PlayerAttribute
  mid: {
    current?: Mid
    next?: Mid
  }
  upgrade: Upgrade
  equipments: any
  playerEquipUpgrade: any
}

export interface Upgrade {
  condition: {
    needGold?: number
    beUpgrade?: boolean
  }
}

export const PlayerStatusTypeCon = {
  reduce_waiting_time_training: 'reduce_waiting_time_training',
}

export type PlayerStatusType = 'reduce_waiting_time_training'
export interface PlayerStatus {
  _id?: string
  sid: string
  itemId: string
  type?: PlayerStatusType
  value?: number
  timeLeft?: number
}
