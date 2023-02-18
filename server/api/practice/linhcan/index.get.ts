import { getServerSession } from '#auth'
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

  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('_id linhCan')
  if (!player?.linhCan?.kind) {
    const ran = Math.round(randomNumber(1, 4))
    await PlayerSchema.findByIdAndUpdate(player?._id, {
      'linhCan.kind': ran,
      'linhCan.level': 1,
    })
  }

  return {
    statusCode: 200,
    success: true,
  }
})
