import mongoose from 'mongoose'
import { cloneDeep } from '~/helpers'
import { ItemSchema } from '~/server/schema/item'
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

export const SendKnbRewardSystemMail = async (sid?: string, sum?: number, options?: {
  note: string
  title: string
}) => {
  const item = await ItemSchema.findOne({ id: 8 }, { _id: false, __v: false })
  const cloneItem = cloneDeep(item)
  await MailSchema.create({
    sid,
    kind: 'system',
    title: options?.title,
    note: options?.note,
    isRead: false,
    deleted: false,
    recordType: 'item',
    records: [
      {
        sum,
        itemId: cloneItem?.id,
        ...cloneItem,
      },
    ],
  })
}

export const SendKnbMarketSystemMail = async (sid?: string, sum?: number, name?: string) => {
  const item = await ItemSchema.findOne({ id: 8 }, { _id: false, __v: false })
  const cloneItem = cloneDeep(item)
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
        sum,
        itemId: cloneItem?.id,
        ...cloneItem,
      },
    ],
  })
}

export const SendMarketSystemMail = async (sid: string, recordType?: string, records?: any, name?: string) => {
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
