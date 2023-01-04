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
}

export interface EmulatorBattle {
  action: string
  state: {
    damage?: number
    bloodsucking?: number
    critical?: boolean
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
  exp: number
  gold: number
}

export interface BattleResponse extends BattleInRefresh {
  player: BaseProperties
  enemy: BaseProperties
  winner: string
  emulators: Emulator[]
  reward: {
    base: BaseReward
    equipments?: PlayerEquipment[]
  }
}

export interface BattleInRefresh {
  inRefresh: boolean
  refreshTime: number
}
