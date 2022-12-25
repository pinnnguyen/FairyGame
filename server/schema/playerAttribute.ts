import mongoose from 'mongoose'
import type { PlayerAttribute } from '~/types'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<PlayerAttribute>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    damage: Number,
    def: Number,
    hp: Number,
    mp: Number,
    speed: Number,
    critical: Number,
    hpSuck: Number,
    slot_1: Number,
    slot_2: Number,
    slot_3: Number,
    slot_4: Number,
    slot_5: Number,
    slot_6: Number,
    slot_7: Number,
    slot_8: Number,
  },
  { timestamps: true, strict: true, strictQuery: true },
)

schema.index({ sid: -1 })
export default mongoose.model('PlayerAttributeSchema', schema, 'player_attributes')
