import mongoose from 'mongoose'
import PlayerAttribute from '~/server/schema/playerAttribute'
import MidSchema from '~/server/schema/mid'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: { type: String, unique: true },
    name: String,
    gold: Number,
    coin: Number,
    power: Number,
    vipLevel: Number,
    level: Number,
    midId: Number,
    userId: String,
  },
  {
    timestamps: true,
    strict: true,
    strictQuery: true,
    statics: {
      async getPlayer(userId: string) {
        const player = await this.findOne({ userId })
        if (!player)
          return null

        const attribute = await PlayerAttribute.findOne({ sid: player.sid })
        const mid = await MidSchema.find({
          id: {
            $in: [player.midId, (player.midId as number) + 1],
          },
        })

        return {
          player,
          mid: {
            current: mid.length > 0 ? mid[0] : null,
            next: mid.length > 1 ? mid[1] : null,
          },
          attribute,
        }
      },
    },
  },
)

schema.index({ sid: -1 })
export default mongoose.model('PlayerSchema', schema, 'players')
