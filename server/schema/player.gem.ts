import mongoose from 'mongoose'
import type { PlayerGem } from '~/types'
import { GemSchema } from '~/server/schema/gem'
import { randomNumber } from '~/common'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<PlayerGem>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    gemId: Number,
    name: String,
    quality: Number,
    target: String,
    slot: Number,
    rateOnLevel: Number,
    values: [],
    sum: Number,
  },
  { timestamps: true },
)
schema.index({ sid: -1 })
schema.index({ gemId: -1 })
export const PlayerGemSchema = mongoose.model('PlayerGemSchema', schema, 'gl_player_gems')

export const addPlayerGem = async (sid?: string, gemId?: number, quality?: number, num?: number) => {
  const gem = await GemSchema.findOne({ id: gemId })
  if (!gem)
    return

  const rateOnLevel = Math.round(randomNumber(1, 2) * 100) / 100
  await PlayerGemSchema.findOneAndUpdate({ sid, gemId, quality }, {
    name: gem.name,
    slot: gem.slot,
    rateOnLevel,
    values: gem.values,
    target: gem.target,
    $inc: {
      sum: num,
    },
  }, {
    new: true,
    upsert: true,
  })
}
