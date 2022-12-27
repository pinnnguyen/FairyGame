import { randomNumber } from '~/common'
import { BASE_EXP, BASE_GOLD, TRAINING_RESOURCE } from '~/server/rule/reward'
import { PlayerSchema } from '~/server/schema'
import type { EnemyObject } from '~/types'
import { DEFAULT_RATE_RECEIVED_RSS } from '~/constants'

export const setLastTimeReceivedRss = async (sid: string) => {
  await PlayerSchema.updateOne({ sid }, { lastTimeReceivedRss: new Date().getTime() })
}
export const receivedEquipment = async (sid: string, _enemyObj: EnemyObject) => {
  const equipments = _enemyObj.equipments
  for (let i = 0; i < equipments.length; i++) {
    const equipment = equipments[i]
    const ran = randomNumber(equipment.rate, DEFAULT_RATE_RECEIVED_RSS)
  }
  return true
}
export const pveBaseReward = async (sid: string, midId: string) => {
  const expInMinute = Math.round(BASE_EXP() * TRAINING_RESOURCE[midId][0])
  const goldInMinute = Math.round(BASE_GOLD() * TRAINING_RESOURCE[midId][1])

  await PlayerSchema.updateOne({ sid }, {
    lastTimeReceivedRss: new Date().getTime(),
    $inc: {
      exp: expInMinute,
      gold: goldInMinute,
    },
  })

  return {
    exp: expInMinute,
    gold: goldInMinute,
  }
}
