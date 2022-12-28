import { randomNumber } from '~/common'
import { BASE_EXP, BASE_GOLD, TRAINING_RESOURCE } from '~/server/rule/reward'
import { EquipmentSchema, PlayerEquipmentSchema, PlayerSchema } from '~/server/schema'
import type { EnemyObject, PlayerEquipment } from '~/types'
import { MAX_RATE_RECEIVED_RSS, MIN_RATE_RECEIVED_RSS } from '~/constants'

export const setLastTimeReceivedRss = async (sid: string) => {
  await PlayerSchema.updateOne({ sid }, { lastTimeReceivedRss: new Date().getTime() })
}
export const receivedEquipment = async (sid: string, _enemyObj: EnemyObject) => {
  const equipmentIds = []
  const playerEquipments: PlayerEquipment[] = []

  const equipments = _enemyObj.equipments
  for (let i = 0; i < equipments.length; i++) {
    const equipment = equipments[i]
    const ran = randomNumber(MIN_RATE_RECEIVED_RSS, MAX_RATE_RECEIVED_RSS)
    if (equipment.rate >= ran)
      equipmentIds.push(equipment.id)
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
