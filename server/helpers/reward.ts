import { randomNumber } from '~/common'
import { BASE_EXP, BASE_GOLD } from '~/server/rule/reward'
import { EquipmentSchema, PlayerEquipmentSchema, PlayerSchema, addPlayerEquipments } from '~/server/schema'

import type { EnemyObject, PlayerEquipment } from '~/types'
import { MAX_RATE_RECEIVED_RSS, MIN_RATE_RECEIVED_RSS, WINNER } from '~/constants'

export const setLastTimeReceivedRss = async (sid: string) => {
  await PlayerSchema.updateOne({ sid }, { lastTimeReceivedRss: new Date().getTime() })
}

export const receivedEquipment = async (sid: string, _enemyObj: EnemyObject, winner: string) => {
  if (winner === WINNER.youlose) {
    return {
      equipments: [],
    }
  }

  const equipmentIds = []
  let playerEquipments: PlayerEquipment[] = []

  const equipRate = _enemyObj.reward.equipRates
  for (let i = 0; i < equipRate.length; i++) {
    const currentRate = equipRate[i]
    const ran = randomNumber(MIN_RATE_RECEIVED_RSS, MAX_RATE_RECEIVED_RSS)
    if (currentRate.rate >= ran)
      equipmentIds.push(currentRate.id)
  }

  if (equipmentIds.length > 0)
    playerEquipments = await addPlayerEquipments(sid, equipmentIds)

  return {
    equipments: playerEquipments,
  }
}
export const getBaseReward = async (sid: string, _enemyObj: EnemyObject, winner: string) => {
  if (winner === WINNER.youlose) {
    return {
      exp: 0,
      gold: 0,
    }
  }

  if (!_enemyObj) {
    return {
      exp: 0,
      gold: 0,
    }
  }

  if (!_enemyObj?.reward) {
    return {
      exp: 0,
      gold: 0,
    }
  }

  const expInMinute = Math.round(BASE_EXP() * _enemyObj?.reward?.base?.exp)
  const goldInMinute = Math.round(BASE_GOLD() * _enemyObj?.reward?.base?.gold)

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
