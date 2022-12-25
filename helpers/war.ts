import { BASE_EXP, TRAINING_RESOURCE } from '~/server/rule/reward'
import mid from '~/server/schema/mid'
import type { Monsters, PlayerInfo } from '~/types'
import { BATTLE_ACTION, WINNER } from '~/constants/war'
import type { BaseProperties, Emulator, WarResponse } from '~/types/war'
import { convertMillisecondsToSeconds } from '~/common'

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

export const playerDeep = (params: PlayerInfo) => {
  return {
    level: params?.player?.level,
    damage: params?.attribute?.damage,
    def: params?.attribute?.def,
    hp: params?.attribute?.hp,
    speed: params?.attribute?.speed,
    critical: params?.attribute?.critical,
    name: params?.player?.name,
  } as BaseProperties
}

export const startWar = (_p: PlayerInfo, _enemy: Monsters) => {
  const enemyClone = enemyDeep(_enemy)
  const playerClone = playerDeep(_p)

  const receiveDMG = receiveDamage(_p, _enemy) // Mục tiêu gây sát thương lên người chơi.
  const inflictDMG = inflictDamage(_p, _enemy) // Người chơi gây sát thương lên mục tiêu.

  const emulators: Emulator[] = []
  let endWar = false
  let winner = ''

  while (!endWar) {
    _p.attribute.hp -= formatHP(_p.attribute.hp, receiveDMG)
    _enemy.hp -= formatHP(_enemy.hp, inflictDMG)

    //  Tốc độ cao hơn sẽ đánh
    if (_p?.attribute?.speed < _enemy?.speed) {
      emulators.push({
        [`${1}_enemy`]: {
          action: BATTLE_ACTION.ATTACK,
          critical: false,
          state: {
            damage: receiveDMG,
          },
          now: {
            hp: {
              player: _p?.attribute?.hp,
            },
            mp: {
              enemy: _enemy?.mp,
            },
          },
        },
        [`${2}_player`]: {
          action: BATTLE_ACTION.ATTACK,
          critical: false,
          state: {
            damage: inflictDMG,
          },
          now: {
            hp: {
              enemy: _enemy?.hp,
            },
            mp: {
              player: _p?.attribute?.mp,
            },
          },
        },
      })
    }
    else {
      emulators.push({
        [`${1}_player`]: {
          action: BATTLE_ACTION.ATTACK,
          critical: false,
          state: {
            damage: inflictDMG,
          },
          now: {
            hp: {
              enemy: _enemy?.hp,
            },
            mp: {
              player: _p?.attribute?.mp,
            },
          },
        },
        [`${2}_enemy`]: {
          action: BATTLE_ACTION.ATTACK,
          critical: false,
          state: {
            damage: receiveDMG,
          },
          now: {
            hp: {
              player: _p?.attribute?.hp,
            },
            mp: {
              enemy: _enemy?.mp,
            },
          },
        },
      })
    }

    if (_p.attribute.hp <= 0) {
      endWar = true
      winner = WINNER.YOU_LOSE
    }

    if (_enemy.hp <= 0) {
      endWar = true
      winner = WINNER.YOU_WIN
    }
  }

  return {
    player: playerClone,
    enemy: enemyClone,
    emulators,
    winner,
  } as WarResponse
}
