import type { PlayerEquipment } from '~/types/equiment'
import type { EnemyObject } from '~/types/monster'
import type { BaseReward, Emulator } from '~/types/war'

export interface Battle {
  _id?: string
  sid?: string
  mid?: {
    id: number
  }
  targetId?: number
  kind?: 'pve' | 'pvp' | 'boss' | 'boss-daily' | 'dungeon' | 'boss_elite'
  emulators?: Emulator[]
  enemy?: EnemyObject
  player?: {
    level: number
    damage: number
    def: number
    hp: number
    speed: number
    name: string
  }
  winner?: 'youwin' | 'youlost'
  reward?: {
    base: BaseReward
    equipments: PlayerEquipment[]
  }
  damage?: number
  createdAt?: string
  updatedAt?: string
}

export interface BattleEventBeforeWar {
  inRefresh: boolean
  refreshTime: number
  enemy?: EnemyObject
  player?: {
    level: number
    damage: number
    def: number
    hp: number
    speed: number
    name: string
  }
  reward?: {
    base: BaseReward
    equipments: PlayerEquipment[]
  }
  winner?: 'youwin' | 'youlost'
}
