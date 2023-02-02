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
    title: String,
    note: String,
    kind: String,
    recordType: String,
    records: [],
    isRead: Boolean,
    deleted: Boolean,
  },
  { timestamps: true },
)

schema.index({ kind: -1 })
schema.index({ sid: -1 })
schema.index({ isRead: -1 })
schema.index({ deleted: -1 })
export const MailSchema = mongoose.model('MailSchema', schema, 'gl_mails')

export const sendKNBSystemMail = async (sid?: string, sum?: number, name?: string) => {
  await MailSchema.create({
    sid,
    kind: 'system',
    title: 'Bày bán nhận',
    note: `Đạo hữu bày bán thành công vật phẩm ${name}`,
    isRead: false,
    deleted: false,
    recordType: 'item',
    records: [
      {
        itemId: 8,
        sum,
      },
    ],
  })
}

export const sendSystemMail = async (sid: string, recordType?: string, records?: any, name?: string) => {
  await MailSchema.create({
    sid,
    kind: 'system',
    title: 'Bày bán nhận',
    note: `Đạo hữu mua thành công vật phẩm ${name}`,
    isRead: false,
    deleted: false,
    recordType,
    records,
  })
}
