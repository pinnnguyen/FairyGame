import { getServerSession } from '#auth'
import { PlayerSchema } from '~/server/schema'
import { randomNumber } from '~/common'
import { getRateQuality } from '~/server/utils'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const quality = getRateQuality()
  // console.log('quality', parseFloat(`1.${quality}`))
  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('_id spiritualRoot')
  if (!player?.spiritualRoot?.kind) {
    const ran = Math.round(randomNumber(1, 5))

    await PlayerSchema.findByIdAndUpdate(player?._id, {
      'spiritualRoot.kind': ran,
      'spiritualRoot.level': 1,
      'spiritualRoot.quality': quality,
    })
  }

  return {
    statusCode: 200,
    success: true,
  }
})
