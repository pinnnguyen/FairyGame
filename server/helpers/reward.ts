import { randomNumber } from '~/common'
import { BASE_EXP, BASE_GOLD } from '~/server/rule/reward'
import { EquipmentSchema, PlayerEquipmentSchema, PlayerSchema } from '~/server/schema'
import type { EnemyObject, PlayerEquipment } from '~/types'
import { MAX_RATE_RECEIVED_RSS, MIN_RATE_RECEIVED_RSS, WINNER } from '~/constants'

export const setLastTimeReceivedRss = async (sid: string) => {
  await PlayerSchema.updateOne({ sid }, { lastTimeReceivedRss: new Date().getTime() })
}

export const receivedEquipment = async (sid: string, _enemyObj: EnemyObject, winner: string) => {
  if (winner === WINNER.youwin) {
    return {
      equipments: [],
    }
  }

  const equipmentIds = []
  const playerEquipments: PlayerEquipment[] = []

  const equipRate = _enemyObj.reward.equipRates
  for (let i = 0; i < equipRate.length; i++) {
    const currentRate = equipRate[i]
    const ran = randomNumber(MIN_RATE_RECEIVED_RSS, MAX_RATE_RECEIVED_RSS)
    if (currentRate.rate >= ran)
      equipmentIds.push(currentRate.id)
  }

  if (equipmentIds.length > 0) {
    const equipments = await EquipmentSchema.find({
      id: {
        $in: equipmentIds,
      },
    })

    for (let i = 0; i < equipments.length; i++) {
      if (!equipments[i])
        continue

      playerEquipments.push({
        sid,
        equipmentId: equipments[i].id,
        name: equipments[i].name ?? '',
        info: equipments[i].info ?? '',
        damage: equipments[i].damage ?? 0,
        speed: equipments[i].speed ?? 0,
        def: equipments[i].def ?? 0,
        hp: equipments[i].hp ?? 0,
        mp: equipments[i].mp ?? 0,
        critical: equipments[i].critical ?? 0,
        bloodsucking: equipments[i].bloodsucking ?? 0,
        criticalDamage: 0,
        rank: equipments[i].rank,
        level: equipments[i].level,
        slot: equipments[i].slot,
        preview: equipments[i].preview,
      })
    }

    await PlayerEquipmentSchema.insertMany(playerEquipments)
  }

  return {
    equipments: playerEquipments,
  }
}
export const getBaseReward = async (sid: string, _enemyObj: EnemyObject, winner: string) => {
  if (winner !== WINNER.youwin) {
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
