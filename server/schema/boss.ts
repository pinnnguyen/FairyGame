import mongoose from 'mongoose'
import type { Boss } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Boss>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    id: Number,
    kind: String,
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
    numberOfTurn: Number,
    class: Number,
  },
  { timestamps: true, strict: true, strictQuery: true },
)

schema.index({ id: -1 }, { unique: true })

export const BossSchema = mongoose.model('BossSchema', schema, 'boss')
