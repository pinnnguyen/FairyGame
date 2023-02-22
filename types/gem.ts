import type { BaseAttributes, CoreAttribute } from '~/types/player'

export interface GemValue {
  'name': string
  'sign': keyof BaseAttributes & keyof CoreAttribute
  'value': 200
  'type': 'normal' | 'percent'
  target: 'attribute' | 'base'
}

export interface GemCoreProperty {
  _id?: string
  name?: string
  quality?: number
  rateOnLevel?: number
  target?: 'attribute'
  values?: GemValue[]
  slot: number
}

export type Gem = GemCoreProperty & {
  id?: number
}

export type PlayerGem = GemCoreProperty & {
  sum?: number
  sid?: string
  gemId?: number
}
