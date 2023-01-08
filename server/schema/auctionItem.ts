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
    auctionId: String,
    kind: Number,
    price: Number,
    sid: String,
    quantity: Number,
  },
  { timestamps: true },
)

export const AuctionItemSchema = (mongoose.models && mongoose.models.AuctionItemSchema
  ? mongoose.models.AuctionItemSchema
  : mongoose.model('AuctionItemSchema', schema, 'gl_auction_items'))
