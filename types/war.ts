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

interface EmulatorPlayer {
  action: string
  critical: boolean
  state: {
    damage: number
  }
  now: {
    hp: {
      enemy: number
    }
    mp: {
      player: number
    }
  }
}

interface EmulatorEnemy {
  action: string
  critical: boolean
  state: {
    damage: number
  }
  now: {
    hp: {
      player: number
    }
    mp: {
      enemy: number
    }
  }
}
export interface Emulator {
  player: EmulatorPlayer
  enemy: EmulatorEnemy
}

export interface BaseProperties extends BaseAttributes {
  name: string
  level: number
}

export interface WarResponse {
  player: BaseProperties
  enemy: BaseProperties
  winner: string
  emulators: Emulator[]
  firstTurn: string
}
