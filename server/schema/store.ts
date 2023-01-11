import mongoose from 'mongoose'
import type { StoreItem } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<StoreItem>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    itemId: Number,
    price: Number,
    discount: Number,
    quantity: Number,
    kind: Number,
    currency: String,
  },
  { timestamps: true },
)

export const StoreItemSchema = mongoose.model('StoreItemSchema', schema, 'gl_store_items')

export const getStoreItems = async () => {
  const stores = await StoreItemSchema.aggregate([
    {
      $lookup: {
        from: 'gl_items',
        foreignField: 'id',
        localField: 'itemId',
        as: 'info',
      },
    },
    {
      $unwind: '$info',
    },
  ])

  return stores
}
