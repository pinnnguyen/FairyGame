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
    damage: Number,
    def: Number,
    hp: Number,
    mp: Number,
    critical: Number,
    bloodsucking: Number,
    speed: Number,
    reward: {},
    class: Number,
  },
  { timestamps: true, strict: true, strictQuery: true },
)
schema.index({ id: -1 }, { unique: true })
export const MonsterSchema = mongoose.model('MonsterSchema', schema, 'monsters')
