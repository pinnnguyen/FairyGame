import mongoose from 'mongoose'
import type { PlayerEquipment } from '~/types'
import { EquipmentSchema } from '~/server/schema/equipment'
import { randomNumber } from '~/common'
import { DEFAULT_MAX_RATE_RECEIVED, DEFAULT_MIN_RATE_RECEIVED } from '~/config'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<PlayerEquipment>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    equipmentId: Number,
    name: String,
    info: String,
    quality: Number,
    rank: Number,
    level: Number,
    slot: Number,
    preview: String,
    enhance: Number,
    star: Number,
    stats: [],
    gemSlot: Number,
    gems: [],
    used: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

schema.index({ sid: -1 })
schema.index({ slot: -1 })
schema.index({ rank: -1 })
schema.index({ equipmentId: -1 })
export const PlayerEquipmentSchema = mongoose.model('PlayerEquipmentSchemas', schema, 'gl_player_equipments')

const getRateQuality = () => {
  const qualityRate = randomNumber(DEFAULT_MIN_RATE_RECEIVED, DEFAULT_MAX_RATE_RECEIVED)
  let quality = 0

  if (qualityRate > 1 && qualityRate <= 3)
    quality = 9

  if (qualityRate > 3 && qualityRate <= 7)
    quality = 8

  if (qualityRate > 7 && qualityRate <= 10)
    quality = 7

  if (qualityRate > 10 && qualityRate <= 15)
    quality = 6

  if (qualityRate > 15 && qualityRate <= 20)
    quality = 5

  if (qualityRate > 20 && qualityRate <= 25)
    quality = 4

  if (qualityRate > 25 && qualityRate <= 40)
    quality = 3

  if (qualityRate > 40 && qualityRate <= 60)
    quality = 2

  if (qualityRate > 60 && qualityRate <= 100)
    quality = 1

  console.log('quality', quality)
  console.log('qualityRate', qualityRate)
  return quality
}
export const addPlayerEquipments = async (sid: string, equipmentIds: Array<number>) => {
  const equipments = await EquipmentSchema.find({
    id: {
      $in: equipmentIds,
    },
  })

  const playerEquipments: PlayerEquipment[] = []
  for (let i = 0; i < equipments.length; i++) {
    if (!equipments[i])
      continue

    const quality = getRateQuality()
    console.log('quality', quality)

    const stats = equipments[i].stats
    for (const stat of stats!) {
      for (const key in stat)
        stat[key].main = stat[key].main + (stat[key].main * quality / 100)
    }

    playerEquipments.push({
      sid,
      equipmentId: equipments[i].id,
      name: equipments[i].name ?? '',
      info: equipments[i].info ?? '',
      rank: equipments[i].rank,
      level: equipments[i].level,
      slot: equipments[i].slot,
      preview: equipments[i].preview,
      enhance: equipments[i]?.enhance,
      gemSlot: 0,
      stats,
      quality,
      used: false,
      gems: [],
    })
  }

  await PlayerEquipmentSchema.insertMany(playerEquipments)

  return playerEquipments
}
// export const addPlayerEquipment = async (_sid: string, equipment: Equipment) => {
//   await new PlayerEquipmentSchema({
//     sid: _sid,
//     equipmentId: equipment?.id,
//     name: equipment?.name,
//     info: equipment?.info,
//     rank: equipment?.rank,
//     level: equipment?.level,
//     slot: equipment?.slot,
//     preview: equipment?.preview,
//     enhance: equipment.enhance,
//     stats: equipment.stats,
//   }).save()
// }
