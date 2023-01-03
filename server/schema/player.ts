import mongoose from 'mongoose'
import type { Player } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Player>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: { type: String, unique: true },
    name: String,
    knb: Number,
    gold: Number,
    coin: Number,
    power: Number,
    vipLevel: Number,
    level: Number,
    exp: Number,
    midId: Number,
    userId: String,
    lastTimeReceivedRss: Number,
    levelTitle: String,
    floor: String,
    expLimited: Number,
    class: Number,
    ofAttribute: Number,
    ofPower: Number,
    ofAgility: Number,
    ofSkillful: Number,
    ofVitality: Number,
  },
  {
    timestamps: true,
    statics: {
      async changeCurrency(params: {
        kind: 'coin' | 'gold'
        sid: string
        value: number
      }) {
        if (params.kind === 'coin')
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { coin: params.value } })

        if (params.kind === 'gold')
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { gold: params.value } })
      },
    },
  },
)

schema.index({ sid: -1 }, { unique: true })

// export const PlayerSchema = mongoose.models.PlayerSchemas || mongoose.model('PlayerSchemas', schema, 'players')
export const PlayerSchema = (mongoose.models && mongoose.models.PlayerSchemas
  ? mongoose.models.PlayerSchemas
  : mongoose.model('PlayerSchemas', schema, 'players'))

