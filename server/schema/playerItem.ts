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
    name: String,
    info: String,
    sum: Number,
    kind: Number,
  },
  { timestamps: true },
)
schema.index({ sid: -1 })
// export const PlayerItemSchema = mongoose.model('PlayerItemSchemas', schema, 'player_items')
export const PlayerItemSchemas = (mongoose.models && mongoose.models.PlayerItemSchemas ? mongoose.models.PlayerItemSchemas : mongoose.model('PlayerItemSchemas', schema, 'player_items'))

