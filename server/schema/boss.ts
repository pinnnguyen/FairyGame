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
    attribute: {},
    avatar: String,
    reward: {},
    numberOfTurn: Number,
    class: Number,
    startHours: Number,
    endHours: Number,
    isStart: Boolean,
  },
  { timestamps: true },
)

schema.index({ id: -1 }, { unique: true })
export const BossDataSchema = mongoose.model('BossDataSchema', schema, 'boss')
