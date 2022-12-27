import { BattleSchema, PlayerSchema } from '~/server/schema'
import { resourceReceived } from '~/helpers/reward'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const _p: any = await PlayerSchema.findOne({ sid: body.sid })
  if (!_p) {
    return createError({
      statusCode: 400,
      message: 'Invalid player',
    })
  }

  const battle = await BattleSchema.findOne({ 'sid': body.sid, 'mid.id': _p.midId, 'kind': 'pve' })
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
