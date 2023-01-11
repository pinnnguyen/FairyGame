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
  { timestamps: true },
)
schema.index({ createdAt: -1 })
export const ItemSchema = mongoose.model('ItemSchemas', schema, 'gl_items')
// export const ItemSchema = (mongoose.models && mongoose.models.ItemSchema ? mongoose.models.ItemSchema : mongoose.model('ItemSchema', schema, 'items'))
