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
    isPvp: String,
    rateExp: Number,
    rateResource: Number,
  },
  { timestamps: true, strict: true, strictQuery: true },
)

schema.index({ id: -1 })
export default mongoose.model('MidSchema', schema, 'mids')
