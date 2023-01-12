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
    name: String,
    info: String,
    sum: Number,
    kind: Number,
    itemId: Number,
    preview: String,
    rank: Number,
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
    kind: 2,
    itemId,
    sid,
  })

  if (!playerItem) {
    return new PlayerItemSchema({
      sid,
      name: item.name,
      info: item.info,
      sum: quantity,
      kind: item.kind,
      itemId,
      preview: item.preview,
      rank: item.rank,
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
// export const PlayerItemSchema = (mongoose.models && mongoose.models.PlayerItemSchemas ? mongoose.models.PlayerItemSchemas : mongoose.model('PlayerItemSchemas', schema, 'player_items'))
