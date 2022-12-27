import type { Mid } from '~/types/mid'
export interface BaseAttributes {
  speed?: number
  damage?: number
  def?: number
  hp?: number
  mp?: number
  critical?: number
  hpSuck?: number
}
export interface Player {
  _id?: string
  sid: string
  name: string
  gold: number
  coin: number
  power: number
  level: number
  midId: string
  userId: string
  vipLevel: number
  exp: number
  lastTimeReceivedRss: string
  levelTitle: string
  floor: string
  expLimited: number
}

export interface PlayerAttribute extends BaseAttributes, Slot {
  _id?: string
  sid?: string
}

export interface PlayerResponse {
  player: Player
  attribute: PlayerAttribute
}

export interface Slot {
  slot_1?: number
  slot_2?: number
  slot_3?: number
  slot_4?: number
  slot_5?: number
  slot_6?: number
  slot_7?: number
  slot_8?: number
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
  player?: Player
  attribute?: PlayerAttribute
  mid?: {
    current?: Mid
    next?: Mid
  }
  upgrade: Upgrade
}
export interface PlayerDataResponse extends Player {
  attribute?: PlayerAttribute
  mid?: {
    current?: Mid
    next?: Mid
  }
  upgrade?: Upgrade
}

export interface Upgrade {
  condition: {
    needGold?: number
    beUpgrade?: boolean
  }
}
