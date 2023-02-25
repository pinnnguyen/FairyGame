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
    itemId: Number,
    gemId: Number,
    equipmentId: Number,
    auctionId: String,
    kind: String,
    price: Number,
    sid: String,
    quantity: Number,
  },
  { timestamps: true },
)

export const AuctionItemSchema = mongoose.model('AuctionItemSchema', schema, 'gl_auction_items')
