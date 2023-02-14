import mongoose from 'mongoose'
import type { BaseBossType } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<BaseBossType & { numberOfTurn: number }>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    id: Number,
    quality: Number,
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
