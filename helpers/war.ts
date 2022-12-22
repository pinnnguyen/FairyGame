import type { Monsters, PlayerAttribute } from '~/types'

export const startWar = (target1, target2) => {

}

export const receiveDamage = (player: PlayerAttribute, enemy: Monsters) => {
  let inflictDMG = 0

  const ennemyDMG = (enemy?.damage as number)
  const playerDef = (player?.def as number)

  inflictDMG = Math.round(ennemyDMG - playerDef * 0.75)

  if (inflictDMG < ennemyDMG * 0.15)
    inflictDMG = Math.round(ennemyDMG * 0.15)

  return inflictDMG
}

export const inflictDamage = (player: PlayerAttribute, enemy: Monsters) => {
  let inflictDMG = 0

  const playerDMG = (player?.damage as number)
  const monsterDef = (enemy?.def as number)

  inflictDMG = Math.round(playerDMG - monsterDef * 0.75)

  if (inflictDMG < playerDMG * 0.15)
    inflictDMG = Math.round(playerDMG * 0.15)

  return inflictDMG
}

export const formatHP = (hp: number, takeHp: number) => {
  if (hp < takeHp)
    return hp

  return takeHp
}
