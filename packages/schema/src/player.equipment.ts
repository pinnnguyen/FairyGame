import mongoose from 'mongoose'
import { getRateQuality } from '~/server/utils'
import type { PlayerEquipment } from '~/types'
import { EquipmentSchema } from '~/server/schema'
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
