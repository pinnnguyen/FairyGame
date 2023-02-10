import type { BasicItem } from './item'
import type { PlayerEquipment } from '~/types/equiment'
import type { BaseAttributes } from '~/types/player'

export interface BattleRequest {
  kind: string
  player: {
    userId?: string
  }
  target: {
    id?: string
    type?: string | 'monster' | 'boss-daily'
  }
  skip: boolean
}

export interface EmulatorBattle {
  action: string
  state: {
    damage?: number
    bloodsucking?: number
    critical?: boolean
    counterDamage?: number
    avoid?: boolean
  }
  now: {
    hp: Record<string | 'player' | 'enemy', number>
    mp: Record<string | 'player' | 'enemy', number>
  }
}

export type Emulator = Record<string | 'player' | 'enemy', EmulatorBattle>
export interface BaseProperties extends BaseAttributes {
  _id?: string
  name: string
  level: number
  levelTitle?: string
  floor?: string
  class: number
}

export interface BaseReward {
  exp: number
  gold: number
  kill: number
  bag: number
  top: number
}

export interface RewardList {
  base: BaseReward
  items: BasicItem[]
  equipments?: PlayerEquipment[]
}

export interface BattleResponse extends BattleInRefresh {
  player: BaseProperties
  enemy: BaseProperties
  winner: string
  emulators: any
  kind: string
  reward: RewardList
  rankDMG: any
  totalDamage?: number
}

export interface BattleInRefresh {
  inRefresh: boolean
  refreshTime: number
}
