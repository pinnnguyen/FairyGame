import { getServerSession } from '#auth'
import { PlayerSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    sign: string
    action: 'used' | 'unused'
  }>(event)

  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (!body.sign) {
    return {
      message: 'PARAMS INVALID',
      success: false,
    }
  }

  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('_id kabbalah')
  if (!player?.kabbalah || !player?.kabbalah[body.sign]) {
    return {
      message: 'Cần mở khoá thần thông trước mới có thể trang bị',
      success: false,
    }
  }

  const kabbalahUpdated = player?.kabbalah
  kabbalahUpdated[body.sign].used = body.action === 'used'

  await PlayerSchema.findByIdAndUpdate(player?._id, {
    kabbalah: kabbalahUpdated,
  })

  return {
    message: 'Đã trang bị',
    success: true,
  }
})
