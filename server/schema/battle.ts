import mongoose from 'mongoose'
import type { Battle } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Battle>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    targetId: Number,
    mid: {},
    kind: String,
    emulators: [],
    enemy: {},
    player: {},
    winner: String,
    reward: {},
  },
  { timestamps: true, strict: true, strictQuery: true },
)
schema.index({ createdAt: -1 })
export const BattleSchema = mongoose.model('BattleSchema', schema, 'battles')
