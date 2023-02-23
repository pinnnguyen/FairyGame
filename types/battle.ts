import type { BasicItem } from './item'
import type { BaseAttributeKeys, BaseAttributes, KabbalahRule, PlayerKabbalah, PlayerSpiritualRoot } from '~/types/player'
import type { PlayerEquipment } from '~/types/equiment'
import type { BaseReward } from '~/types/war'

export type BattleEffectDisadvantageKey = 'poisoned' | 'freeze' | 'burn' | 'ignore_defense'

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

export interface BattleTarget {
  spiritualRoot?: PlayerSpiritualRoot
  kabbalah?: PlayerKabbalah
  kabbalahRule?: KabbalahRule[]
  extends: { level?: number; name?: string; _id?: string }
  attribute: BaseAttributes
  effect: {
    disadvantage: {
      [key in BattleEffectDisadvantageKey]: {
        expire: number
        value: number
        target: BaseAttributeKeys
        round: number
        name?: string
      }
    }
    helpful: {}
  }
  _id?: string
  enemyId?: string
}
