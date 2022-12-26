import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString()
      },
    },
    sid: String,
    mid: {},
    kind: String,
    emulators: [],
    enemy: {},
    player: {},
    winner: String,
  },
  { timestamps: true, strict: true, strictQuery: true },
)
schema.index({ createdAt: -1 })
export default mongoose.model('BattleSchema', schema, 'battles')
