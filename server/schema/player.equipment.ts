import mongoose from 'mongoose'
import type { Equipment, PlayerEquipment } from '~/types'
import { EquipmentSchema } from '~/server/schema/equipment'
import { randomNumber } from '~/common'
import { DEFAULT_MAX_RATE_RECEIVED, DEFAULT_MIN_RATE_RECEIVED } from '~/constants'
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
    rank: Number,
    level: Number,
    slot: Number,
    preview: String,
    enhance: Number,
    star: Number,
    quality: Number,
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

  if (qualityRate <= 10)
    quality = 1

  else if (qualityRate <= 20 && qualityRate > 10)
    quality = 2

  else if (qualityRate <= 30 && qualityRate > 20)
    quality = 3

  else if (qualityRate <= 40 && qualityRate > 30)
    quality = 4

  else if (qualityRate <= 50 && qualityRate > 40)
    quality = 5

  else if (qualityRate <= 60 && qualityRate > 50)
    quality = 6

  else if (qualityRate <= 70 && qualityRate > 60)
    quality = 7

  else if (qualityRate <= 80 && qualityRate > 70)
    quality = 8

  else if (qualityRate >= 90)
    quality = 9

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
    const stats = equipments[i].stats
    for (const stat of stats!) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      for (const key in stat) { // @ts-expect-error
        stat[key].main = stat[key].main + (stat[key].main * quality / 100)
      }
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
