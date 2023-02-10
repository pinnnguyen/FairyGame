import mongoose from 'mongoose'
import type { Item } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Item>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    sum: Number,
    itemId: Number,
  },
  { timestamps: true },
)
schema.index({ sid: -1 })
export const PlayerItemSchema = mongoose.model('PlayerItemSchemas', schema, 'gl_player_items')

export const addPlayerItem = async (sid: string, quantity: number, itemId: number) => {
  await PlayerItemSchema.findOneAndUpdate({
    itemId,
    sid,
  }, {
    $inc: {
      sum: quantity,
    },
  }, {
    new: true,
    upsert: true,
  })
}

export const addPlayerItems = async (items: Item[]) => {
  await PlayerItemSchema.insertMany(items)
}

export const getPlayerItems = (sid: string) => {
  return PlayerItemSchema.aggregate<Item[]>([
    {
      $match: {
        sid,
        sum: {
          $gte: 1,
        },
      },
    },
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
    {
      $sort: {
        'info.kind': 1,
        'info.rank': 1,
      },
    },
  ])
}

export const getPlayerItem = (sid: string, itemId: number) => {
  return PlayerItemSchema.aggregate<Item>([
    {
      $match: {
        sid,
        itemId,
        sum: {
          $gte: 1,
        },
      },
    },
    {
      $lookup: {
        from: 'gl_items',
        foreignField: 'id',
        localField: 'itemId',
        as: 'info',
        pipeline: [
          {
            $limit: 1,
          },
        ],
      },
    },
    {
      $unwind: '$info',
    },
    {
      $limit: 1,
    },
  ])
}

export const getPlayerItemCondition = (condition: any) => {
  return PlayerItemSchema.aggregate<Item>([
    {
      $match: condition,
    },
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
}
