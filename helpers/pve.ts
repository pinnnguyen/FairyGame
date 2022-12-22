import type { Monsters, Players } from '~/types'

export const calTakeDamage = (player: Players, monster: Monsters | undefined) => {
  let takeDamageNumber = 0

  const monsterDamage = (monster?.damage as number)
  const playerDef = (player?.player_attributes?.def as number)

  takeDamageNumber = Math.round(monsterDamage - playerDef * 0.75)

  if (takeDamageNumber < monsterDamage * 0.15)
    takeDamageNumber = Math.round(monsterDamage * 0.15)

  return takeDamageNumber
}

export const calYourDamage = (player: Players, monster: Monsters | undefined) => {
  let yourDamageNumber = 0

  const playerDamage = (player?.player_attributes?.damage as number)
  const monsterDef = (monster?.def as number)

  yourDamageNumber = Math.round(playerDamage - monsterDef * 0.75)

  if (yourDamageNumber < playerDamage * 0.15)
    yourDamageNumber = Math.round(playerDamage * 0.15)

  return yourDamageNumber
}

export const validateHp = (hp: number, takeHp: number) => {
  if (hp < takeHp)
    return hp

  return takeHp
}
