import { getServerSession } from '#auth'
import { BATTLE_KIND, WINNER } from '~/constants'
import { BattleSchema, PlayerSchema } from '~/server/schema'
import { getPlayer } from '~/server/helpers'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: session?.user?.email })
  const battle = await BattleSchema.findOne({ 'mid.id': player?.midId, 'winner': WINNER.youwin, 'kind': BATTLE_KIND.PVE })
  if (!battle) {
    return createError({
      statusCode: 400,
      statusMessage: 'ERROR_BATTLE',
    })
  }

  const changeMid = await PlayerSchema.findOneAndUpdate({ userId: session?.user?.email }, {
    $inc: {
      midId: 1,
    },
  })

  if (!changeMid) {
    return createError({
      statusCode: 400,
      statusMessage: 'Chuyển map thất bại',
    })
  }

  return await getPlayer(session.user?.email, '')
})
