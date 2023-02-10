import type { BasicItem, EnemyObject, Player, PlayerEquipment } from '~/types'
import { randomNumber } from '~/common'
import { BASE_EXP, BASE_GOLD } from '~/server/rule/reward'
import { ItemSchema, PlayerSchema, addPlayerEquipments, addPlayerItem } from '~/server/schema'

import { DEFAULT_MAX_RATE_RECEIVED, DEFAULT_MIN_RATE_RECEIVED } from '~/constants'

export const setLastTimeReceivedRss = async (sid: string) => {
  await PlayerSchema.findOneAndUpdate({ sid }, { lastTimeReceivedRss: new Date().getTime() })
}

export const receivedEquipment = async (player: Player, _enemyObj: EnemyObject, winner: string) => {
  if (winner !== player._id) {
    return {
      equipments: [],
    }
  }

  const equipRates = _enemyObj.reward.equipRates
  if (!equipRates) {
    return {
      equipments: [],
    }
  }

  const equipmentIds = []
  let playerEquipments: PlayerEquipment[] = []

  for (let i = 0; i < equipRates.length; i++) {
    const currentRate = equipRates[i]
    const randomRate = randomNumber(DEFAULT_MIN_RATE_RECEIVED, DEFAULT_MAX_RATE_RECEIVED)
    if (currentRate.rate >= randomRate)
      equipmentIds.push(currentRate.id)
  }

  playerEquipments = await addPlayerEquipments(player.sid, equipmentIds)

  return {
    equipments: playerEquipments,
  }
}

export const receivedItems = async (player: Player, _enemyObj: EnemyObject, winner: string) => {
  if (winner !== player._id) {
    return {
      itemDrafts: [],
    }
  }

  const itemReward = _enemyObj.reward.itemRates
  if (!itemReward) {
    return {
      itemDrafts: [],
    }
  }

  const itemReceived = []
  for (let i = 0; i < itemReward.length; i++) {
    const rate = itemReward[i].rate
    const quantityRate = itemReward[i].quantityRate.split('|')
    const randomRate = randomNumber(DEFAULT_MIN_RATE_RECEIVED, DEFAULT_MAX_RATE_RECEIVED)
    if (rate >= randomRate) {
      const quantity = Math.round(randomNumber(parseInt(quantityRate[0]), parseInt(quantityRate[1])))
      const itemId = itemReward[i].id
      itemReceived.push({
        id: itemId,
        quantity,
      })

      await addPlayerItem(player.sid, quantity, itemId)
    }
  }

  const ids = itemReceived.map(i => i.id)
  const itemDrafts = await ItemSchema.find({
    id: {
      $in: ids,
    },
  })

  const itemResponse: Partial<BasicItem>[] = []
  for (let i = 0; i < itemDrafts.length; i++) {
    for (let j = 0; j < itemReceived.length; j++) {
      if (itemDrafts[i].id === itemReceived[j].id) {
        itemResponse.push({
          kind: itemDrafts[i].kind,
          name: itemDrafts[i].name,
          note: itemDrafts[i].note,
          preview: itemDrafts[i].preview,
          quality: itemDrafts[i].quality,
          value: itemDrafts[i].value,
          quantity: itemReceived[j].quantity,
        })
      }
    }
  }

  return {
    itemDrafts: itemResponse,
  }
}

export const getBaseReward = async (player: Player, _enemyObj: EnemyObject, winner: string) => {
  if (winner !== player._id) {
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

  await PlayerSchema.updateOne({ sid: player.sid }, {
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
