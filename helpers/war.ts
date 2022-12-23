import type { Monsters, PlayerInfo } from '~/types'
import { TURN, WINNER } from '~/constants/war'
import type { Emulator, BaseProperties, WarResponse } from '~/types/war'

export const receiveDamage = (player: PlayerInfo, enemy: Monsters) => {
  let inflictDMG = 0

  const enemyDMG = (enemy?.damage as number)
  const playerDef = (player?.attribute?.def as number)

  inflictDMG = Math.round(enemyDMG - playerDef * 0.75)

  if (inflictDMG < enemyDMG * 0.15)
    inflictDMG = Math.round(enemyDMG * 0.15)

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

export const enemyDeep = (enemy: Monsters) => {
  return {
    level: enemy?.level,
    damage: enemy?.damage,
    def: enemy?.def,
    hp: enemy?.hp,
    critical: enemy?.critical,
    speed: enemy?.speed,
    name: enemy?.name,
  } as BaseProperties
}

export const playerDeep = (player: PlayerInfo) => {
  return {
    level: player?.level,
    damage: player?.attribute?.damage,
    def: player?.attribute?.def,
    hp: player?.attribute?.hp,
    speed: player?.attribute?.speed,
    critical: player?.attribute?.critical,
    name: player?.name,
  } as BaseProperties
}

export const startWar = (player: PlayerInfo, enemy: Monsters) => {
  const enemyClone = enemyDeep(enemy)
  const playerClone = playerDeep(player)

  const receiveDMG = receiveDamage(player, enemy) // Mục tiêu gây sát thương lên người chơi.
  const inflictDMG = inflictDamage(player, enemy) // Người chơi gây sát thương lên mục tiêu.

  const emulators: Emulator[] = []
  let endWar = false
  let winner = ''
  let firstTurn = TURN.PLAYER

  while (!endWar) {
    player.attribute.hp -= formatHP(player.attribute.hp, receiveDMG)
    enemy.hp -= formatHP(enemy.hp, inflictDMG)

    //  Tốc độ cao hơn sẽ đánh
    if (player?.attribute?.speed < enemy?.speed) {
      firstTurn = TURN.ENEMY
      emulators.push({
        enemy: {
          action: 'attack',
          critical: false,
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
          critical: false,
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
      firstTurn = TURN.PLAYER
      emulators.push({
        player: {
          action: 'attack',
          critical: false,
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
          critical: false,
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

    console.log('emulators', emulators)

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
    player: playerClone,
    enemy: enemyClone,
    emulators,
    winner,
    firstTurn,
  } as WarResponse
}
