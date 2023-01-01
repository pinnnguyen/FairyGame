import mongoose from 'mongoose'
import type { Mid } from '~/types/mid'

const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Mid>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    id: Number,
    name: String,
    description: String,
    monsterId: Number,
    ms: Number,
    isPvp: String,
    reward: {},
    // rateExp: Number,
    // rateResource: Number,
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
  },
)

schema.index({ id: -1 }, { unique: true })
export const MidSchema = mongoose.model('MidSchema', schema, 'mids')
