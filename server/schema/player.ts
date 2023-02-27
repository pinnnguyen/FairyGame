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
    isDie: {
      type: Boolean,
      default: false
    },
    name: String,
    knb: {
      type: Number,
      default: 0
    },
    gold: {
      type: Number,
      default: 0
    },
    gender: String,
    coin: {
      type: Number,
      default: 0
    },
    power: {
      type: Number,
      default: 0
    },
    vipLevel: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 0
    },
    exp: {
      type: Number,
      default: 0
    },
    midId: {
      type: Number,
      default: 1
    },
    userId: String,
    lastTimeReceivedRss: Number,
    levelTitle: String,
    floor: String,
    expLimited: Number,
    class: Number,
    ofAttribute: Number,
    coreAttribute: {},
    arenas: {
      tienDau: {
        pos: Number,
        score: Number,
      },
    },
    mindDharma: {},
    kabbalah: {},
    spiritualRoot: {
      level: {
        type: Number,
        default: 1,
      },
      kind: String,
      quality: Number,
    },
    moneyManagement: {},
  },
  {
    timestamps: true,
    statics: {
      async changeCurrency(params: {
        kind: 'coin' | 'gold' | 'knb'
        sid: string
        value: number
      }) {
        if (params.kind === 'coin')
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { coin: params.value } })

        if (params.kind === 'gold')
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { gold: params.value } })

        if (params.kind === 'knb')
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { knb: params.value } })

        if (params.kind === 'diemTienDau')
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { 'arenas.tienDau.score': params.value } })
      },
    },
  },
)

schema.index({ sid: -1 }, { unique: true })
export const PlayerSchema = mongoose.model('PlayerSchema', schema, 'players')
