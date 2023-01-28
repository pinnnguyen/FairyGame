import type { BaseAttributes, CoreAttribute } from '~/types/player'

export interface GemValue {
  'name': string
  'sign': keyof BaseAttributes | keyof CoreAttribute
  'value': 200
  'type': 'normal' | 'percent'
  target: 'attribute' | 'base'
}

export interface Gem {
  _id?: string
  id?: number
  name?: string
  quality?: number
  rateOnLevel?: number
  values?: GemValue[]
}

export interface PlayerGem {
  sum?: number
  sid?: string
  _id?: string
  gemId?: number
  name?: string
  quality?: number
  rateOnLevel?: number
  values?: GemValue[]
}
