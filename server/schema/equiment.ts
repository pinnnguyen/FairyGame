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
// schema.index({ createdAt: -1 })
export default mongoose.model('EquipmentSchema', schema, 'equipments')
