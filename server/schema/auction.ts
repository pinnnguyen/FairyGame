import mongoose from 'mongoose'
import type { Auction } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Auction>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    name: String,
    info: String,
    kind: Number,
    startTime: Number,
    endTime: Number,
    open: Boolean,
  },
  { timestamps: true },
)

export const AuctionSchema = (mongoose.models && mongoose.models.AuctionSchema ? mongoose.models.AuctionSchema : mongoose.model('AuctionSchema', schema, 'gl_auction'))
