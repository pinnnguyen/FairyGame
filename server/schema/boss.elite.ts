import mongoose from 'mongoose'
import type { BossElite } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<BossElite>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    bossId: Number,
    kind: String,
    name: String,
    level: Number,
    info: String,
    sex: String,
    attribute: {},
    reward: {},
    avatar: String,
    refreshTime: Number,
    refresh: Boolean,
    // topDamage: [],
    // topPoint: [],
    killer: String,
  },
  { timestamps: true },
)

schema.index({ id: -1 }, { unique: true })
export const BossEliteSchema = mongoose.model('BossEliteSchema', schema, 'gl_boss_elites')
