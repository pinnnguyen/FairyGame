import { randomNumber } from '~/common'
import { BASE_EXP, BASE_GOLD } from '~/server/rule/reward'
import { ItemSchema, PlayerSchema, addPlayerEquipments, addPlayerItem } from '~/server/schema'
import type { EnemyObject, PlayerEquipment } from '~/types'

import { DEFAULT_MAX_RATE_RECEIVED, DEFAULT_MIN_RATE_RECEIVED, WINNER } from '~/constants'

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
  const equipRates = _enemyObj.reward.equipRates

  if (equipRates.length > 0) {
    for (let i = 0; i < equipRates.length; i++) {
      const currentRate = equipRates[i]
      const randomRate = randomNumber(DEFAULT_MIN_RATE_RECEIVED, DEFAULT_MAX_RATE_RECEIVED)
      if (currentRate.rate >= randomRate)
        equipmentIds.push(currentRate.id)
    }
  }

  if (equipmentIds.length > 0)
    playerEquipments = await addPlayerEquipments(sid, equipmentIds)

  return {
    equipments: playerEquipments,
  }
}

export const receivedItems = async (sid: string, _enemyObj: EnemyObject, winner: string) => {
  if (winner === WINNER.youlose) {
    return {
      items: [],
    }
  }

  const itemReward = _enemyObj.reward.itemRates
  const itemReceived = []

  if (itemReward.length > 0) {
    for (let i = 0; i < itemReward.length; i++) {
      const rate = itemReward[i].rate
      const quantityRate = itemReward[i].quantityRate.split('|')
      const randomRate = randomNumber(DEFAULT_MIN_RATE_RECEIVED, DEFAULT_MAX_RATE_RECEIVED)
      if (rate >= randomRate) {
        const itemId = itemReward[i].id
        itemReceived.push(itemId)

        const quantity = Math.round(randomNumber(parseInt(quantityRate[0]), parseInt(quantityRate[1])))
        await addPlayerItem(sid, quantity, itemId)
      }
    }
  }

  const itemDrafts = await ItemSchema.find({
    id: {
      $in: itemReceived,
    },
  })

  return {
    itemDrafts,
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
