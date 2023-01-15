import mongoose from 'mongoose'
import type { Monster } from '~/types/monster'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Monster>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    id: Number,
    name: String,
    level: Number,
    info: String,
    sex: String,
    attribute: {},
    reward: {},
    class: Number,
  },
  { timestamps: true },
)
schema.index({ id: -1 }, { unique: true })
export const MonsterSchema = mongoose.model('MonsterSchemas', schema, 'monsters')
// export const MonsterSchema = (mongoose.models && mongoose.models.MonsterSchema ? mongoose.models.MonsterSchema : mongoose.model('MonsterSchema', schema, 'monsters'))
