import { convertMillisecondsToSeconds, convertSecondsToMinutes } from '~/common'
import { BASE_EXP, BASE_GOLD } from '~/server/rule/reward'
import { MidSchema } from '~/server/schema/mid'
import { PlayerSchema } from '~/server/schema/player'

export const resourceReceived = async (sid: string, lastTimeReceivedRss: number, midId: string) => {
  const now = new Date().getTime()
  const seconds = Math.round(convertMillisecondsToSeconds(now - lastTimeReceivedRss))
  const minutes = Math.round(convertSecondsToMinutes(seconds))

  const mid = await MidSchema.findOne({ id: midId })
  if (!mid) {
    return {
      exp: 0,
      gold: 0,
      minutes: 0,
    }
  }

  const expInMinute = Math.round(BASE_EXP() * mid.reward.base.exp)
  const goldInMinute = Math.round(BASE_GOLD() * mid.reward.base.gold)

  console.log('seconds', seconds)
  if (seconds < 60) {
    return {
      exp: 0,
      gold: 0,
      minutes: 0,
    }
  }

  let exp = 0
  let gold = 0

  for (let i = 0; i < minutes; i++) {
    exp += expInMinute
    gold += goldInMinute
  }

  await PlayerSchema.updateOne({ sid }, {
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
}
