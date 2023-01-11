import mongoose from 'mongoose'
import type { Equipment } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Equipment>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    id: Number,
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
  { timestamps: true },
)
schema.index({ id: -1 }, { unique: true })
schema.index({ slot: -1 })
schema.index({ level: -1 })
schema.index({ rank: -1 })

export const EquipmentSchema = mongoose.model('EquipmentSchemas', schema, 'equipments')
// export const EquipmentSchema = (mongoose.models && mongoose.models.EquipmentSchemas ? mongoose.models.EquipmentSchemas : mongoose.model('EquipmentSchemas', schema, 'equipments'))
