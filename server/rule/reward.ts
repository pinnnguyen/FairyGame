import { randomNumber } from '~/common'

/*
    1 = midId
    [5, 2]: 5 = nhận exp / phút; 2 = số gold nhận / phút
*/
export const TRAINING_RESOURCE: Record<string, Array<number>> = {
  1: [5, 2],
  2: [6, 3],
}

export const BASE_EXP = () => {
  return randomNumber(5, 7) + 7
}

export const BASE_GOLD = () => {
  return randomNumber(2, 3) + 1
}


