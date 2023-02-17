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
    gender: String,
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
    coreAttribute: {},
    arenas: {
      tienDau: {
        pos: Number,
        score: Number,
      },
    },
    mindDharma: {
      damage: {
        enhance: Number,
        main: Number,
      },
      def: {
        enhance: Number,
        main: Number,
      },
      critical: {
        enhance: Number,
        main: Number,
      },
      hp: {
        enhance: Number,
        main: Number,
      },
      criticalDamage: {
        enhance: Number,
        main: Number,
      },
    },
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
