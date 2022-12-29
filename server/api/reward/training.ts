import { BATTLE_KIND } from '~/constants'
import { BattleSchema, PlayerSchema } from '~/server/schema'
import { resourceReceived } from '~/helpers'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const _p: any = await PlayerSchema.findOne({ userId: session?.user?.email })
  if (!_p) {
    return createError({
      statusCode: 400,
      message: 'Invalid player',
    })
  }

  const battle = await BattleSchema.findOne({ 'sid': _p.sid, 'mid.id': _p.midId, 'kind': BATTLE_KIND.PVE })
  if (!battle) {
    return createError({
      statusCode: 400,
      message: 'Invalid battle',
    })
  }

  const { exp, gold, minutes } = resourceReceived(_p.lastTimeReceivedRss, _p.midId)
  await PlayerSchema.updateOne({ sid: _p.sid }, {
    lastTimeReceivedRss: new Date().getTime(),
    $inc: {
      exp,
      gold,
    },
  })

  return {
    exp,
    gold,
    minutes,
  }
})
