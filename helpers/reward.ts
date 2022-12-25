import { convertMillisecondsToSeconds, convertSecondsToMinutes } from '~/common'
import { BASE_EXP, BASE_GOLD, TRAINING_RESOURCE } from '~/server/rule/reward'

export const resourceReceived = (lastTimeReceivedRss: number, midId: string) => {
  const now = new Date().getTime()
  const seconds = Math.round(convertMillisecondsToSeconds(now - lastTimeReceivedRss))
  const minutes = Math.round(convertSecondsToMinutes(seconds))

  const expInMinute = Math.round(BASE_EXP() * TRAINING_RESOURCE[midId][0])
  const goldInMinute = Math.round(BASE_GOLD() * TRAINING_RESOURCE[midId][1])

  if (seconds < 59) {
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

  return {
    exp,
    gold,
    minutes,
  }
}
