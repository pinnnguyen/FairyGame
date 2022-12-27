import type { BaseAttributes } from '~/types/player'

export interface BattleRequest {
  kind: string
  player: {
    userId?: string
  }
  target: {
    id?: string
    type?: string
  }
}

export interface EmulatorBattle {
  action: string
  critical: boolean
  state: {
    damage: number
  }
  now: {
    hp: Record<string | 'player' | 'enemy', number>
    mp: Record<string | 'player' | 'enemy', number>
  }
}

export type Emulator = Record<string | 'player' | 'enemy', EmulatorBattle>
export interface BaseProperties extends BaseAttributes {
  name: string
  level: number
}

export interface BaseReward {
  exp?: number
  gold?: number
}

export interface BattleResponse extends BattleInRefresh {
  player: BaseProperties
  enemy: BaseProperties
  winner: string
  emulators: Emulator[]
  reward: BaseReward
}

export interface BattleInRefresh {
  inRefresh: boolean
  refreshTime: number
}
