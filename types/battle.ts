import type { PlayerEquipment } from '~/types/equiment'
import type { EnemyObject } from '~/types/monster'
import type { BaseReward, Emulator } from '~/types/war'

export interface Battle {
  _id?: string
  sid: string
  mid: {
    id: number
  }
  kind: 'pve' | 'pvp' | 'boss' | 'boss-daily' | 'dungeon'
  emulators: Emulator[]
  enemy: EnemyObject
  player: {
    level: number
    damage: number
    def: number
    hp: number
    speed: number
    name: string
  }
  winner: 'youwin' | 'youlost'
  reward: {
    base: BaseReward
    equipments: PlayerEquipment[]
  },
  createdAt: string
  updatedAt: string
}
