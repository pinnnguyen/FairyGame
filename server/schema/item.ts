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
    id: Number,
    kind: Number,
    name: String,
    info: String,
    preview: String,
    rank: Number,
    value: Number,
  },
  { timestamps: true },
)

schema.index({ id: -1 }, { unique: true })
export const ItemSchema = mongoose.model('ItemSchemas', schema, 'gl_items')
// export const ItemSchema = (mongoose.models && mongoose.models.ItemSchema ? mongoose.models.ItemSchema : mongoose.model('ItemSchema', schema, 'items'))
