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
    type: String,
    name: String,
    content: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

schema.index({ isRead: -1 })
// export const AuctionSchema = (mongoose.models && mongoose.models.AuctionSchema ? mongoose.models.AuctionSchema : mongoose.model('AuctionSchema', schema, 'gl_auction'))
export const ChatSchema = mongoose.model('ChatSchema', schema, 'gl_chats')

export const addSystemChat = async (sid: string, content: string) => {
  await ChatSchema.create({
    sid,
    type: 'system',
    name: 'Hệ thống',
    content,
  })
}
