import type { PlayerAttribute } from './../types/player'
import type { EnemyObject, PlayerAttribute, PlayerInfo } from '~/types'
import { BATTLE_ACTION, WINNER } from '~/constants/war'
import type { BaseProperties, BattleResponse, Emulator } from '~/types/war'
import { randomNumber } from '~/common'

export const receiveDamage = (player: PlayerInfo, enemy: EnemyObject) => {
  let inflictDMG = 0
  let enemyBloodsucking = 0
  let enemyCritical = false

  const enemyDMG = (enemy?.damage as number)
  const playerDef = (player?.attribute?.def as number)

  inflictDMG = Math.round(enemyDMG - playerDef * 0.75)
  if (enemy.bloodsucking > 0)
    enemyBloodsucking = Math.round((enemy.bloodsucking * inflictDMG) / 100)

  if (enemy.critical > 0) {
    const iRan = randomNumber(1, 100)

    if (enemy.critical >= iRan) {
      enemyCritical = true
      inflictDMG = Math.round(inflictDMG * 1.5)
    }
  }

  return {
    receiveDMG: inflictDMG < 0 ? 0 : inflictDMG,
    enemyBloodsucking: enemyBloodsucking < 0 ? 0 : enemyBloodsucking,
    enemyCritical,
  }
}

export const inflictDamage = (player: PlayerInfo, enemy: EnemyObject) => {
  let inflictDMG = 0
  let playerBloodsucking = 0
  let playerCritical = false

  const playerDMG = (player?.attribute?.damage as number)
  const enemyDef = (enemy?.def as number)

  inflictDMG = Math.round(playerDMG - enemyDef * 0.75)

  if (player.attribute.bloodsucking > 0)
    playerBloodsucking = Math.round((player.attribute.bloodsucking * inflictDMG) / 100)

  if (player.attribute.critical > 0) {
    const iRan = randomNumber(1, 100)

    if (player.attribute.critical >= iRan) {
      playerCritical = true
      inflictDMG = Math.round(inflictDMG * player.attribute.criticalDamage)
    }
  }

  return {
    inflictDMG,
    playerBloodsucking,
    playerCritical,
  }
}

export const formatHP = (hp: number, limit: number) => {
  if (hp < limit)
    return hp

  return limit
}

export const enemyDeep = (enemy: EnemyObject) => {
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

const addPlayerFirstEmulators = (options: {
  playerCritical: boolean
  enemyCritical: boolean
  inflictDMG: number
  receiveDMG: number
  _enemy: EnemyObject
  playerAttribute: PlayerAttribute
  enemyBloodsucking: number
  playerBloodsucking: number
}) => {
  const emulators: Emulator[] = []
  emulators.push({
    [`${1}_player`]: {
      action: BATTLE_ACTION.ATTACK,
      state: {
        damage: options.inflictDMG,
        bloodsucking: options.playerBloodsucking,
        critical: options.playerCritical,
      },
      now: {
        hp: {
          enemy: options._enemy?.hp,
        },
        mp: {
          player: options.playerAttribute?.mp,
        },
      },
    },
    [`${2}_enemy`]: {
      action: BATTLE_ACTION.ATTACK,
      state: {
        damage: options.receiveDMG,
        bloodsucking: options.enemyBloodsucking,
        critical: options.enemyCritical,
      },
      now: {
        hp: {
          player: options.playerAttribute?.hp,
        },
        mp: {
          enemy: options._enemy?.mp,
        },
      },
    },
  })

  return emulators
}

const addEnemyFirstEmulators = (options: {
  enemyCritical: boolean
  playerCritical: boolean
  receiveDMG: number
  inflictDMG: number
  playerAttribute: PlayerAttribute
  _enemy: EnemyObject
  enemyBloodsucking: number
  playerBloodsucking: number
}) => {
  const emulators: Emulator[] = []
  emulators.push({
    [`${1}_enemy`]: {
      action: BATTLE_ACTION.ATTACK,
      state: {
        damage: options.receiveDMG,
        bloodsucking: options.enemyBloodsucking,
        critical: options.enemyCritical,
      },
      now: {
        hp: {
          player: options.playerAttribute?.hp,
        },
        mp: {
          enemy: options._enemy?.mp,
        },
      },
    },
    [`${2}_player`]: {
      action: BATTLE_ACTION.ATTACK,
      state: {
        damage: options.inflictDMG,
        bloodsucking: options.playerBloodsucking,
        critical: options.playerCritical,
      },
      now: {
        hp: {
          enemy: options._enemy?.hp,
        },
        mp: {
          player: options.playerAttribute?.mp,
        },
      },
    },
  })

  return emulators
}

export const startWar = (_p: PlayerInfo, _enemy: EnemyObject) => {
  const enemyClone = enemyDeep(_enemy)
  const playerClone = playerDeep(_p)

  const emulators: Emulator[] = []
  const playerAttribute = _p.attribute
  let endWar = false
  let winner = ''
  let round = 1

  while (!endWar) {
    const { receiveDMG, enemyBloodsucking, enemyCritical } = receiveDamage(_p, _enemy) // Mục tiêu gây sát thương lên người chơi.
    const { inflictDMG, playerBloodsucking, playerCritical } = inflictDamage(_p, _enemy) // Người chơi gây sát thương lên mục tiêu.

    playerAttribute.hp -= formatHP(playerAttribute?.hp, receiveDMG)
    if (playerAttribute.hp > 0)
      playerAttribute.hp += playerBloodsucking

    _enemy.hp -= formatHP(_enemy.hp, inflictDMG)
    if (_enemy.hp > 0)
      _enemy.hp += enemyBloodsucking

    //  Tốc độ cao hơn sẽ đánh
    if (playerAttribute?.speed < _enemy?.speed) {
      emulators.push(addEnemyFirstEmulators({
        enemyCritical,
        playerCritical,
        receiveDMG,
        inflictDMG,
        playerAttribute,
        _enemy,
        enemyBloodsucking,
        playerBloodsucking,
      })[0])
    }

    else {
      emulators.push(addPlayerFirstEmulators({
        playerCritical,
        enemyCritical,
        inflictDMG,
        receiveDMG,
        _enemy,
        playerAttribute,
        enemyBloodsucking,
        playerBloodsucking,
      })[0])
    }

    if (playerAttribute?.hp <= 0) {
      endWar = true
      winner = WINNER.youlose
    }

    if (_enemy?.hp <= 0) {
      endWar = true
      winner = WINNER.youwin
    }

    if (round >= 20) {
      endWar = true
      winner = WINNER.youlose
    }
    round++
  }

  return {
    player: playerClone,
    enemy: enemyClone,
    emulators,
    winner,
  } as BattleResponse
}
