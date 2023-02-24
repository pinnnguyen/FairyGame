import { KABBALAH_RULE } from '@game/config'
import { getServerSession } from '#auth'
import { PlayerSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    sign: string
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

  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('_id kabbalah spiritualRoot')
  if (!player?.kabbalah || !player?.kabbalah[body.sign]) {
    return {
      message: 'Cần mở khoá thần thông trước mới có thể thăng cấp',
      success: false,
    }
  }

  const currentKabbalahRule = KABBALAH_RULE[player.spiritualRoot?.kind]
  const currentKabbalah = currentKabbalahRule.find(k => k.sign === body.sign)
  const maxLevel = currentKabbalah?.max ?? 0

  const kabbalahUpdated = player?.kabbalah
  const level = kabbalahUpdated[body.sign].level ?? 0
  if (level >= maxLevel) {
    return {
      message: 'Thần thông đạt cấp đột tối đa',
      success: true,
    }
  }

  kabbalahUpdated[body.sign].level += 1
  await PlayerSchema.findByIdAndUpdate(player?._id, {
    kabbalah: kabbalahUpdated,
  })

  return {
    message: 'Thăng cấp thành công',
    success: true,
  }
})
