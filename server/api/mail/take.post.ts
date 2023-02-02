import { getServerSession } from '#auth'
import { MailSchema, PlayerEquipmentSchema, PlayerSchema, addPlayerGem, addPlayerItem } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    _mailId: string
  }>(event)

  if (!body._mailId) {
    return createError({
      statusCode: 400,
      statusMessage: 'Params Invalid',
    })
  }

  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const playerInfo = await PlayerSchema.findOne({ userId: session?.user?.email }).select('sid')
  if (!playerInfo) {
    return createError({
      statusCode: 404,
      statusMessage: 'Player Invalid',
    })
  }

  const mail = await MailSchema.findOneAndUpdate({
    _id: body._mailId,
    isRead: false,
    deleted: false,
  }, {
    isRead: true,
  })

  if (!mail) {
    return createError({
      statusCode: 404,
      statusMessage: 'Mail Invalid',
    })
  }

  if (mail.recordType === 'gem') {
    for (const record of mail.records)
      await addPlayerGem(playerInfo.sid, record.gemId, record.quality, record.sum)
  }

  if (mail.recordType === 'equipment') {
    for (const record of mail.records) {
      delete record.sid
      await PlayerEquipmentSchema.create({
        sid: playerInfo.sid,
        ...record,
      })
    }
  }

  if (mail.recordType === 'item') {
    for (const record of mail.records) {
      if (record.itemId === 8) {
        await (PlayerSchema as any).changeCurrency({
          kind: 'knb',
          sid: playerInfo.sid,
          value: record.sum,
        })
      }
      else {
        await addPlayerItem(playerInfo.sid, record.sum, record.itemId)
      }
    }
  }

  return {
    success: true,
    message: 'Nhận thư thành công',
  }
})
