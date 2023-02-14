import type { BasicItem } from './item'
import type { PlayerEquipment } from '~/types/equiment'
import type { EnemyObject } from '~/types/monster'
import type { BaseReward, Emulator } from '~/types/war'

export type BattleTargetKey = 'pve' | 'pvp' | 'boss_daily' | 'dungeon' | 'boss_elite' | 'boss_frame_time'
export interface Battle {
  _id?: string
  sid?: string
  mid?: {
    id: number
  }
  targetId?: string
  kind?: keyof BattleTargetKey
  emulators?: any
  winner?: string
  reward?: {
    base: BaseReward
    items: BasicItem[]
    equipments: PlayerEquipment[]
  }
  damageList?: Record<string, any>
  createdAt?: string
  updatedAt?: string
  match: Record<string, any>
}

export interface TopDMG {
  _id: string
  totalDamage: number
  sid: string
  name: string
}
