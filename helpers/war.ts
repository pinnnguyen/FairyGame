import type { Monsters, PlayerInfo } from '~/types'
import { WINNER } from '~/constants/war'

export const receiveDamage = (player: PlayerInfo, enemy: Monsters) => {
  let inflictDMG = 0

  const ennemyDMG = (enemy?.damage as number)
  const playerDef = (player?.attribute?.def as number)

  inflictDMG = Math.round(ennemyDMG - playerDef * 0.75)

  if (inflictDMG < ennemyDMG * 0.15)
    inflictDMG = Math.round(ennemyDMG * 0.15)

  return inflictDMG
}

export const inflictDamage = (player: PlayerInfo, enemy: Monsters) => {
  let inflictDMG = 0

  const playerDMG = (player?.attribute?.damage as number)
  const monsterDef = (enemy?.def as number)

  inflictDMG = Math.round(playerDMG - monsterDef * 0.75)

  if (inflictDMG < playerDMG * 0.15)
    inflictDMG = Math.round(playerDMG * 0.15)

  return inflictDMG
}

export const formatHP = (hp: number, limit: number) => {
  if (hp < limit)
    return hp

  return limit
}

const enemyDeep = (enemy: Monsters) => {
  return {
    level: enemy?.level,
    damage: enemy?.damage,
    def: enemy?.def,
    hp: enemy?.hp,
    name: enemy?.name,
  }
}

export const startWar = (player: PlayerInfo, enemy: Monsters) => {
  const enemyClone = enemyDeep(enemy)
    console.log('enemy', enemy)

  const receiveDMG = receiveDamage(player, enemy) // Mục tiêu gây sát thương lên người chơi.
  const inflictDMG = inflictDamage(player, enemy) // Người chơi gây sát thương lên mục tiêu.

  const emulators = []
  let endWar = false
  let winner = ''

  while (!endWar) {
    player.attribute.hp -= formatHP(player.attribute.hp, receiveDMG)
    enemy.hp -= formatHP(enemy.hp, inflictDMG)

    //  Tốc độ cao hơn sẽ đánh
    if (player?.attribute?.speed < enemy?.speed) {
      emulators.push({
        enemy: {
          action: 'attack',
          crit: false,
          state: {
            damage: receiveDMG,
          },
          now: {
            hp: {
              player: player?.attribute?.hp,
            },
            mp: {
              enemy: enemy?.mp,
            },
          },
        },
        player: {
          action: 'attack',
          crit: false,
          state: {
            damage: inflictDMG,
          },
          now: {
            hp: {
              enemy: enemy?.hp,
            },
            mp: {
              player: player?.attribute?.mp,
            },
          },
        },
      })
    }
    else {
      emulators.push({
        player: {
          action: 'attack',
          crit: false,
          state: {
            damage: inflictDMG,
          },
          now: {
            hp: {
              enemy: enemy?.hp,
            },
            mp: {
              player: player?.attribute?.mp,
            },
          },
        },
        enemy: {
          action: 'attack',
          crit: false,
          state: {
            damage: receiveDMG,
          },
          now: {
            hp: {
              player: player?.attribute?.hp,
            },
            mp: {
              enemy: enemy?.mp,
            },
          },
        },
      })
    }

    if (player.attribute.hp <= 0) {
      endWar = true
      winner = WINNER.YOU_WIN
    }

    if (enemy.hp <= 0) {
      endWar = true
      winner = WINNER.YOU_WIN
    }
  }

  return {
    enemy: enemyClone,
    winner,
    emulators,
  }
}
