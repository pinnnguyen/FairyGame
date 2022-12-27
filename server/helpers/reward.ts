import { BASE_EXP, BASE_GOLD, TRAINING_RESOURCE } from '~/server/rule/reward'
import PlayerSchema from '~/server/schema/player'

export const pveBaseReward = async (sid: string, midId: string) => {
  const expInMinute = Math.round(BASE_EXP() * TRAINING_RESOURCE[midId][0])
  const goldInMinute = Math.round(BASE_GOLD() * TRAINING_RESOURCE[midId][1])

  await PlayerSchema.updateOne({ sid }, {
    lastTimeReceivedRss: new Date().getTime(),
    $inc: {
      exp: expInMinute,
      gold: goldInMinute,
    },
  })

  return {
    exp: expInMinute,
    gold: goldInMinute,
  }
}
