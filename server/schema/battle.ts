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
    targetId: String,
    mid: {},
    kind: String,
    emulators: [],
    enemy: {},
    player: {},
    winner: String,
    totalDamage: [],
    reward: {},
    match: {},
  },
  { timestamps: true },
)

schema.index({ createdAt: -1 })
schema.index({ targetId: -1 })
schema.index({ sid: -1 })
schema.index({ kind: -1 })

export const BattleSchema = mongoose.model('BattleSchemas', schema, 'gl_battles')
