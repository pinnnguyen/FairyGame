import type { BaseReward } from '~/types/war'

export interface Mid {
  _id: string /* primary key */
  name: string
  id: number
  description: string
  monsterId: string
  isPvp: boolean
  ms: number
  reward: {
    base: BaseReward
  }
}
