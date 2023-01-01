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
    kind: Number,
    name: String,
    info: String,
  },
  { timestamps: true, strict: true, strictQuery: true },
)
schema.index({ createdAt: -1 })
export const ItemSchema = mongoose.model('ItemSchema', schema, 'items')
