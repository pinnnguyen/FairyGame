import { getServerSession } from '#auth'
import { PlayerSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const body = await readBody<{
    sign: string
  }>(event)

  if (!body.sign) {
    return {
      message: 'PARAMS INVALID',
      success: false,
    }
  }

  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('_id kabbalah')
  if (player?.kabbalah && player?.kabbalah[body.sign]) {
    return {
      message: 'Thần thông này đã được mở khoá trước đó',
      success: true,
    }
  }

  const kabbalahCreated = {}
  const currentKabbalah = Object.assign(kabbalahCreated, {
    [body.sign]: {
      unlock: true,
      level: 1,
      used: false,
    },
  })

  await PlayerSchema.findByIdAndUpdate(player?._id, {
    kabbalah: currentKabbalah,
  })

  return {
    message: 'Mở khoá thần thông thành công',
    success: true,
  }
})
