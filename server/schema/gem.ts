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
    rateOnLevel: Number,
    values: [],
  },
  { timestamps: true },
)
schema.index({ id: -1 })
export const GemSchema = mongoose.model('GemSchema', schema, 'gl_gems')
