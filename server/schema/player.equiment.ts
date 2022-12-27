import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema(
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
    hpSuck: Number,
    rank: Number,
    level: Number,
    slot: Number,
  },
  { timestamps: true, strict: true, strictQuery: true },
)
schema.index({ sid: -1 })
schema.index({ slot: -1 })
schema.index({ rank: -1 })
export const PlayerEquipmentSchema = mongoose.model('PlayerEquipmentSchema', schema, 'player_equipments')
