import type { BasicItem } from './item'
import type { PlayerEquipment } from '~/types/equiment'
import type { EnemyObject } from '~/types/monster'
import type { BaseReward, Emulator } from '~/types/war'

export interface Battle {
  _id?: string
  sid?: string
  mid?: {
    id: number
  }
  targetId?: string
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
    items: BasicItem[]
    equipments: PlayerEquipment[]
  }
  damageList?: {}
  createdAt?: string
  updatedAt?: string
  match: {}
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

export interface TopDMG {
  _id: string
  totalDamage: number
  sid: string
  name: string
}
