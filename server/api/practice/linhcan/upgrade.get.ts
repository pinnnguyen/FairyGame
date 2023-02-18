import { getServerSession } from '#auth'
import { LINH_CAN_RESOURCE } from '~/config'
import { PlayerSchema } from '~/server/schema'
import { randomNumber } from '~/common'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('_id linhCan moneyManagement')
  const lcLevel = player?.linhCan?.level ?? 1

  const resource = lcLevel * LINH_CAN_RESOURCE.CHAN_NGUYEN
  const chanNguyen = player?.moneyManagement?.chanNguyen ?? 0
  if (chanNguyen < resource) {
    return {
      success: false,
      message: 'Chân nguyên đạo hữu không đủ',
    }
  }

  await PlayerSchema.findByIdAndUpdate(player?._id, {
    $inc: {
      'moneyManagement.chanNguyen': -resource,
      'linhCan.level': 1,
    },
  })

  return {
    success: true,
  }
})
