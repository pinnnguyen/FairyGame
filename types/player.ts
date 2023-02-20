import type { Mid } from '~/types/mid'
import type { PlayerEquipment } from '~/types/equiment'

export type BaseAttributeKeys = 'speed'
| 'damage'
| 'def'
| 'hp'
| 'mp'
| 'critical'
| 'bloodsucking'
| 'criticalDamage'
| 'avoid'
| 'reductionAvoid'
| 'reductionCriticalDamage'
| 'reductionBloodsucking'
| 'counterAttack'
| 'recoveryPerformance'
| 'reductionRecoveryPerformance'
| 'reductionCounterAttack'
| 'percentDamage'
| 'percentSpeed'

// speed: number
// damage: number
// def: number
// hp: number
// mp: number
// critical: number
// bloodsucking: number
// criticalDamage: number
// avoid: number // Ne Don
// reductionAvoid: number // Bo qua ne don
// reductionCriticalDamage: number // Khang sat thuong bao kich
// reductionBloodsucking: number // Khang hut mau
// counterAttack: number // Phan dam
// recoveryPerformance: number // Hieu xuat hoi phuc
// reductionRecoveryPerformance: number // Khang hoi phuc
// reductionCounterAttack: number // Khang phan dam

export type CoreAttributeKey = 'ofPower' | 'ofAgility' | 'ofSkillful' | 'ofVitality'

export enum PlayerStatusTypeCon {
  reduce_waiting_time_training = 'reduce_waiting_time_training',
  increase_exp = 'increase_exp',
}

export type PlayerStatusType = 'reduce_waiting_time_training'

export type BaseAttributes = {
  [key in BaseAttributeKeys | string]: number
}

export type CoreAttribute = {
  [key in CoreAttributeKey | string]: number
}

export type MindDharma = {
  [key in CoreAttributeKey | string]: {
    main: number
    enhance: number
  }
}

export interface PlayerSpiritualRoot {
  level: number
  kind: '1' | '2' | '3' | '4' | '5'
  quality: number
}

export interface KabbalahRule {
  focus?: 'in_battle' | 'before_s_battle' | 'attribute'
  max?: number
  valueOnLevel?: number
  active?: 'percent'
  name?: string
  sign?: KabbalahSign
  level?: number
  rate?: {
    value: number
    max: number
  }
  value?: number
  target?: {
    num?: number
    role?: 'damage' | 'player'
  }
  title?: string
  values?: {
    [key in BaseAttributeKeys | string]: number
  }
}
export type KabbalahSign = 'needle_spiritual_1' | 'needle_spiritual_2' | 'needle_spiritual_3'
export type PlayerKabbalah = {
  [key in KabbalahSign | string]: {
    unlock: boolean
    level: number
    used: boolean
    type: 'automatic' | 'manual' | 'intrinsic'
  }
}
export interface Player {
  _id?: string
  ofAttribute: number
  coreAttribute: CoreAttribute
  sid: string
  gender: string
  name: string
  gold: number
  knb: number
  coin: number
  power: number
  level: number
  midId: string
  userId: string
  vipLevel: number
  exp: number
  lastTimeReceivedRss: number
  levelTitle: string
  floor: string
  expLimited: number
  class: number
  arenas: {
    tienDau: {
      pos: number
      score: number
    }
  }
  mindDharma: MindDharma
  moneyManagement: {
    chanNguyen: number
    thanNguyen: number
  }
  spiritualRoot: PlayerSpiritualRoot
  kabbalah: PlayerKabbalah
}

export type PlayerAttribute = BaseAttributes & {
  _id?: string
  sid?: string
}

export interface PlayerInfo {
  player: Player
  attribute: PlayerAttribute
  mid: {
    current?: Mid
    next?: Mid
  }
}

export interface PlayerServerResponse {
  player: Player
  attribute: PlayerAttribute
  mid: {
    current?: Mid
    next?: Mid
  }
  upgrade: Upgrade
  equipments: PlayerEquipment[]
}
export interface PlayerDataResponse extends Player {
  attribute: PlayerAttribute
  mid: {
    current?: Mid
    next?: Mid
  }
  upgrade: Upgrade
  equipments: any
}

export interface Upgrade {
  condition: {
    needGold?: number
    beUpgrade?: boolean
  }
}

export interface PlayerStatus {
  _id?: string
  sid: string
  itemId: string
  type?: PlayerStatusType
  value?: number
  timeLeft?: number
}

export interface MindDharmaResource {
  [key: string]: {
    gold: number
    exp: number
  }
}
