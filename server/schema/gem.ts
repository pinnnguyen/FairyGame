import mongoose from 'mongoose'
import type { Gem } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Gem>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    id: Number,
    name: String,
    quality: Number,
    target: String,
    rateOnLevel: Number,
    values: [],
    slot: Number,
  },
  { timestamps: true },
)
schema.index({ id: -1 }, { unique: true })
export const GemSchema = mongoose.model('GemSchema', schema, 'gl_gems')
