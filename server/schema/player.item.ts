import mongoose from 'mongoose'
import type { Item } from '~/types'
import { ItemSchema } from '~/server/schema/item'

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
    // name: String,
    // info: String,
    sum: Number,
    // kind: Number,
    itemId: Number,
    // preview: String,
    // rank: Number,
    // value: Number,
  },
  { timestamps: true },
)
schema.index({ sid: -1 })
export const PlayerItemSchema = mongoose.model('PlayerItemSchemas', schema, 'gl_player_items')

export const addPlayerItem = async (sid: string, quantity: number, itemId: number) => {
  const item = await ItemSchema.findOne({ id: itemId })
  if (!item)
    return

  const playerItem = await PlayerItemSchema.findOne({
    kind: {
      $in: [2, 3],
    },
    itemId,
    sid,
  })

  if (!playerItem) {
    return new PlayerItemSchema({
      sid,
      // name: item.name,
      // info: item.info,
      sum: quantity,
      // kind: item.kind,
      itemId,
      // preview: item.preview,
      // value: item.value,
      // rank: item.rank,
    }).save()
  }

  return PlayerItemSchema.updateOne({ sid, itemId }, {
    $inc: {
      sum: quantity,
    },
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
        as: 'info',
      },
    },
    {
      $unwind: '$info',
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
      },
    },
    {
      $unwind: '$info',
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
