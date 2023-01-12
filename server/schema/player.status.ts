import mongoose from 'mongoose'
import type { PlayerStatus } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<PlayerStatus>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    type: String,
    value: Number,
    timeLeft: Number,
  },
  { timestamps: true },
)
schema.index({ sid: -1 })
export const PlayerStatusSchema = mongoose.model('PlayerStatusSchema', schema, 'gl_player_status')
