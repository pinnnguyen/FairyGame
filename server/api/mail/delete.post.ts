import { MailSchema } from '~/server/schema'

const handle = defineEventHandler(async (event) => {
  const body = await readBody<{
    _mailId: string
    forksDelete: boolean
  }>(event)

  if (!body._mailId) {
    return createError({
      statusCode: 400,
      statusMessage: 'Params Invalid',
    })
  }

  const mail = await MailSchema.findById(body._mailId)
  if (!mail) {
    return createError({
      statusCode: 400,
      statusMessage: 'Mail Invalid',
    })
  }

  if (body.forksDelete) {
    await MailSchema.findByIdAndUpdate(body._mailId, {
      deleted: true,
    })

    return {
      success: true,
      message: 'Xoá thư thành công',
    }
  }

  if (mail.records && mail.records.length > 0 && !mail.isRead) {
    return {
      success: false,
      message: 'Thư còn vật phẩm chưa nhận đạo hữu có muốn xoá?',
    }
  }

  await MailSchema.findByIdAndUpdate(body._mailId, {
    deleted: true,
  })

  return {
    success: true,
    message: 'Xoá thư thành công',
  }
})

export default handle
