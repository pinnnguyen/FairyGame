import mongoose from 'mongoose'
import type { PlayerEquipment } from '~/types'
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
    damage: Number,
    speed: Number,
    def: Number,
    hp: Number,
    mp: Number,
    critical: Number,
    bloodsucking: Number,
    rank: Number,
    level: Number,
    slot: Number,
    preview: String,
  },
  { timestamps: true},
)
schema.index({ sid: -1 })
schema.index({ slot: -1 })
schema.index({ rank: -1 })
// export const PlayerEquipmentSchema = mongoose.model('PlayerEquipmentSchemas', schema, 'player_equipments')
export const PlayerEquipmentSchema = (mongoose.models && mongoose.models.PlayerEquipmentSchemas ? mongoose.models.PlayerEquipmentSchemas : mongoose.model('PlayerEquipmentSchemas', schema, 'player_equipments'))

