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
  return StoreItemSchema.aggregate([
    {
      $lookup: {
        from: 'gl_items',
        foreignField: 'id',
        localField: 'itemId',
        as: 'props',
        pipeline: [
          {
            $limit: 1,
          },
          {
            $project: {
              _id: false,
              __v: false,
            },
          },
        ],
      },
    },
    {
      $unwind: '$props',
    },
  ])
}
