import { randomNumber } from '~/common'
import { DEFAULT_MAX_RATE_RECEIVED, DEFAULT_MIN_RATE_RECEIVED } from '~/config'

export const getRateQuality = () => {
  const qualityRate = randomNumber(DEFAULT_MIN_RATE_RECEIVED, DEFAULT_MAX_RATE_RECEIVED)
  let quality = 0

  if (qualityRate > 1 && qualityRate <= 3)
    quality = 9

  if (qualityRate > 3 && qualityRate <= 7)
    quality = 8

  if (qualityRate > 7 && qualityRate <= 10)
    quality = 7

  if (qualityRate > 10 && qualityRate <= 15)
    quality = 6

  if (qualityRate > 15 && qualityRate <= 20)
    quality = 5

  if (qualityRate > 20 && qualityRate <= 25)
    quality = 4

  if (qualityRate > 25 && qualityRate <= 40)
    quality = 3

  if (qualityRate > 40 && qualityRate <= 60)
    quality = 2

  if (qualityRate > 60 && qualityRate <= 100)
    quality = 1

  return quality
}
