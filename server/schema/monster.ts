import mongoose from 'mongoose'
import type { Monsters } from '~/types/monster'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema<Monsters>(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    id: Number,
    name: String,
    level: Number,
    info: String,
    sex: String,
    damage: Number,
    def: Number,
    hp: Number,
    mp: Number,
    critical: Number,
    hpSuck: Number,
    itemIds: [],
    rateItem: Number,
    speed: Number,
  },
  { timestamps: true, strict: true, strictQuery: true },
)

export default mongoose.model('MonsterSchema', schema, 'monsters')
