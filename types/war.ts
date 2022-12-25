import type { BaseAttributes } from '~/types/player'

export interface WarRequest {
  kind: 'solo'
  player: {
    userId: string
  }
  target: {
    id: string
    type: string
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

export interface WarResponse {
  player: BaseProperties
  enemy: BaseProperties
  winner: string
  emulators: Emulator[]
}
