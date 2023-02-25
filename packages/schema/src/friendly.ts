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
    friendSid: String,
    relationship: String,
  },
  { timestamps: true },
)

schema.index({ sid: -1 })
schema.index({ friendSid: -1 })

export const FriendlySchema = mongoose.model('FriendlySchema', schema, 'gl_friendly')
