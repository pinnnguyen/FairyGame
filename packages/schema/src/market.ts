import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    type: String,
    price: Number,
    record: {},
  },
  { timestamps: true },
)

schema.index({ sid: -1 })
export const MarketSchema = mongoose.model('MarketSchema', schema, 'gl_markets')
