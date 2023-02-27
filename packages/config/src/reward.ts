export const BASE_EXP = () => {
  return 20
}

export const BASE_GOLD = () => {
  return 10
}

export const receviedBaseExp = (exp: number, isPvp: boolean) => {
  if (isPvp)
    return Math.round(BASE_EXP() * (exp * 2))
  return Math.round(BASE_EXP() * exp)
}

export const receviedBaseGold = (gold: number, isPvp: boolean) => {
  if (isPvp)
    return Math.round(BASE_GOLD() * (gold * 2))
  return Math.round(BASE_GOLD() * gold)
}

export const receviedBaseExpOrGold = (kind: string, value: number) => {
  if (kind === 'exp') {
    return Math.round(BASE_EXP() * value)
  }

  return Math.round(BASE_GOLD() * value)
}
