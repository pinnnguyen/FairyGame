import type { BasicItem } from './item'
import type { BattleTargetKey } from '~/types/battle'
import type { PlayerEquipment } from '~/types/equiment'

export interface BattleRequest {
  kind: string
  player: {
    userId?: string
  }
  target: {
    id?: string
    type?: BattleTargetKey
  }
  skip: boolean
}

export interface EmulatorBattle {
  action: 'attack' | 'buff'
  state: {
    receiveDamage: Record<string, number>
    bloodsucking: number
    critical: boolean
    counterDamage: number
    avoid: boolean
  }
  self: {
    hp: number
    mp: number
    kabbalahProps: any
  }
  now: {
    hp: Record<string, number>
    mp: Record<string, number>
  }
  script?: string
}

export interface Emulator {
  [key: string]: EmulatorBattle
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
