import { BATTLE_KIND } from '~/constants'
import { BattleSchema } from '~/server/schema/battle'
import { PlayerSchema } from '~/server/schema/player'

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

  const _p = await PlayerSchema.findOne({ userId: session?.user?.email })
  if (!_p) {
    return createError({
      statusCode: 400,
      message: 'Invalid player',
    })
  }

  const battle = await BattleSchema.findOne({
    sid: _p.sid,
    kind: BATTLE_KIND.PVE,
    $or: [
      {
        'mid.id': _p.midId,
      },
      {
        'mid.id': _p.midId - 1,
      },
    ],
  })

  if (!battle) {
    return createError({
      statusCode: 400,
      message: 'Invalid battle',
    })
  }

  const { exp, gold, minutes } = await resourceReceived(_p.sid, _p.lastTimeReceivedRss, _p.midId)

  return {
    exp,
    gold,
    minutes,
  }
})
