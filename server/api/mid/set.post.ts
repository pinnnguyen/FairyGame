import { getServerSession } from '#auth'
import { BATTLE_KIND } from '~/constants'
import { BattleSchema, PlayerSchema } from '~/server/schema'
import { getPlayer } from '~/server/helpers'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('_id midId')
  const battle = await BattleSchema.findOne({ 'mid.id': player?.midId, 'winner': player?._id, 'kind': BATTLE_KIND.PVE })
  if (!battle) {
    return createError({
      statusCode: 400,
      statusMessage: 'ERROR_BATTLE',
    })
  }

  if (body.midId) {
    await PlayerSchema.findOneAndUpdate({ userId: session?.user?.email }, {
      midId: body.midId,
    })
  }
  else {
    await PlayerSchema.findOneAndUpdate({ userId: session?.user?.email }, {
      $inc: {
        midId: 1,
      },
    })
  }

  return await getPlayer(session.user?.email, '')
})
