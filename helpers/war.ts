import type { BaseAttributes, EnemyObject, PlayerAttribute, PlayerInfo } from '~/types'
import { BATTLE_ACTION, WINNER } from '~/constants/war'
import type { BaseProperties, BattleResponse, Emulator } from '~/types/war'
import { randomNumber } from '~/common'
import { playerTitle } from '~/server/helpers'

const handleAvoid = (avoid: number, reductionAvoid: number) => {
  if (avoid <= 0) {
    return {
      hasAvoid: false,
    }
  }

  if (avoid > 0) {
    let a = avoid
    if (reductionAvoid > 0)
      a = (avoid - reductionAvoid) <= 0 ? 1 : (avoid - reductionAvoid)

    const ran = randomNumber(1, 100)
    if (a >= ran) {
      return {
        hasAvoid: true,
      }
    }
  }

  return {
    hasAvoid: false,
  }
}
const handleCounterAttack = (inflictDMG: number, reductionCounterAttack: number, counterAttack: number) => {
  if (inflictDMG <= 0) {
    return {
      counterDamage: 0,
    }
  }

  let ca = counterAttack
  let counterDamage = 0
  if (reductionCounterAttack > 0)
    ca = (counterAttack - reductionCounterAttack) <= 0 ? 1 : (counterAttack - reductionCounterAttack)

  if (counterAttack > 0)
    counterDamage = Math.round((inflictDMG * ca) / 100)

  return {
    counterDamage,
  }
}
const handleRecoveryPerformance = (recovery: number, recoveryPerformance: number, reductionRecoveryPerformance: number) => {
  if (recovery <= 0) {
    return {
      recovery,
    }
  }

  if (recoveryPerformance <= 0) {
    return {
      recovery,
    }
  }

  let rp = recoveryPerformance
  if (reductionRecoveryPerformance > 0)
    rp = (recoveryPerformance - reductionRecoveryPerformance) <= 0 ? 1 : (recoveryPerformance - reductionRecoveryPerformance)

  const r = recovery + Math.round((recovery * rp) / 100)
  return {
    recovery: r,
  }
}
const handleBloodsucking = (inflictDMG: number, bloodsucking: number, reductionBloodsucking: number) => {
  if (bloodsucking <= 0) {
    return {
      blood: 0,
    }
  }

  let b = bloodsucking
  if (reductionBloodsucking > 0)
    b = (bloodsucking - reductionBloodsucking) <= 0 ? 1 : (bloodsucking - reductionBloodsucking)

  const blood = Math.round((b * inflictDMG) / 100)
  return {
    blood,
  }
}
const handleCritical = (critical: number, inflictDMG: number, criticalDamage: number, reductionCriticalDamage: number) => {
  if (critical <= 0) {
    return {
      hasCritical: false,
      inflictDMG,
    }
  }

  const ran = randomNumber(1, 100)
  let reduction = criticalDamage
  if (critical >= ran) {
    if (reductionCriticalDamage > 0)
      reduction = (criticalDamage - reductionCriticalDamage) <= 0 ? 1 : (criticalDamage - reductionCriticalDamage)

    return {
      hasCritical: true,
      inflictDMG: Math.round(inflictDMG * (reduction / 100)),
    }
  }

  return {
    hasCritical: false,
    inflictDMG,
  }
}
export const receiveDamage = (player: PlayerInfo, enemy: EnemyObject) => {
  let inflictDMG = 0
  const enemyDMG = (enemy?.attribute.damage as number)
  const playerDef = (player?.attribute?.def as number)

  inflictDMG = Math.round(enemyDMG - playerDef * 0.75)
  const { blood } = handleBloodsucking(inflictDMG, enemy?.attribute?.bloodsucking, player.attribute.reductionBloodsucking)
  const { recovery } = handleRecoveryPerformance(blood, enemy.attribute.recoveryPerformance, player.attribute.reductionRecoveryPerformance)
  const { hasCritical, inflictDMG: inflictDMGAfter } = handleCritical(enemy?.attribute?.critical, inflictDMG, enemy?.attribute?.criticalDamage, player?.attribute?.reductionCriticalDamage)
  if (hasCritical)
    inflictDMG = inflictDMGAfter

  const { counterDamage } = handleCounterAttack(inflictDMG, enemy.attribute.reductionCounterAttack, player.attribute.counterAttack)
  const { hasAvoid } = handleAvoid(player.attribute.avoid, enemy.attribute.reductionAvoid)
  if (hasAvoid)
    inflictDMG = 0

  return {
    receiveDMG: inflictDMG < 0 ? 0 : inflictDMG,
    enemyBloodsucking: recovery,
    enemyCritical: hasCritical,
    playerCounterAttack: counterDamage,
    playerAvoid: hasAvoid,
  }
}
export const inflictDamage = (player: PlayerInfo, enemy: EnemyObject) => {
  let inflictDMG = 0
  const playerDMG = (player?.attribute?.damage as number)
  const enemyDef = (enemy?.attribute.def as number)
  inflictDMG = Math.round(playerDMG - enemyDef * 0.75)

  const { blood } = handleBloodsucking(inflictDMG, player?.attribute?.bloodsucking, enemy.attribute.reductionBloodsucking)
  const { recovery } = handleRecoveryPerformance(blood, player.attribute.recoveryPerformance, enemy.attribute.reductionRecoveryPerformance)
  const { hasCritical, inflictDMG: inflictDMGAfter } = handleCritical(player.attribute.critical, inflictDMG, player.attribute.criticalDamage, enemy.attribute.reductionCriticalDamage)
  if (hasCritical)
    inflictDMG = inflictDMGAfter

  const { counterDamage } = handleCounterAttack(inflictDMG, player.attribute.reductionCounterAttack, enemy.attribute.counterAttack)
  const { hasAvoid } = handleAvoid(enemy.attribute.avoid, player.attribute.reductionAvoid)
  if (hasAvoid)
    inflictDMG = 0

  return {
    inflictDMG,
    playerBloodsucking: recovery,
    playerCritical: hasCritical,
    enemyCounterAttack: counterDamage,
    enemyAvoid: hasAvoid,
  }
}

export const formatHP = (hp: number, limit: number) => {
  if (hp < limit)
    return hp

  return limit
}

export const enemyDeep = (enemy: EnemyObject) => {
  const { levelTitle, floor } = playerTitle(enemy.level, enemy.level + 1)

  return {
    levelTitle,
    floor,
    level: enemy?.level,
    damage: enemy?.attribute.damage,
    def: enemy?.attribute.def,
    hp: enemy?.attribute.hp,
    critical: enemy?.attribute.critical,
    speed: enemy?.attribute.speed,
    name: enemy?.name,
    class: enemy.class,
  } as BaseProperties
}

export const playerDeep = (params: PlayerInfo) => {
  return {
    levelTitle: params.player.levelTitle,
    floor: params.player.floor,
    level: params?.player?.level,
    damage: params?.attribute?.damage,
    def: params?.attribute?.def,
    hp: params?.attribute?.hp,
    speed: params?.attribute?.speed,
    critical: params?.attribute?.critical,
    name: params?.player?.name,
    class: params.player.class,
  } as BaseProperties
}

const addPlayerFirstEmulators = (options: {
  playerCritical: boolean
  enemyCritical: boolean
  inflictDMG: number
  receiveDMG: number
  _enemy: BaseAttributes
  _player: PlayerAttribute
  enemyBloodsucking: number
  playerBloodsucking: number
  playerCounterAttack: number
  enemyCounterAttack: number
  enemyAvoid: boolean
  playerAvoid: boolean
}) => {
  const emulators: Emulator[] = []
  emulators.push({
    [`${1}_player`]: {
      action: BATTLE_ACTION.ATTACK,
      state: {
        damage: options.inflictDMG,
        bloodsucking: options.playerBloodsucking,
        critical: options.playerCritical,
        counterDamage: options.enemyCounterAttack,
        avoid: options.playerAvoid,
      },
      now: {
        hp: {
          enemy: options._enemy?.hp,
        },
        mp: {
          player: options._player?.mp,
        },
      },
    },
    [`${2}_enemy`]: {
      action: BATTLE_ACTION.ATTACK,
      state: {
        damage: options.receiveDMG,
        bloodsucking: options.enemyBloodsucking,
        critical: options.enemyCritical,
        counterDamage: options.playerCounterAttack,
        avoid: options.enemyAvoid,
      },
      now: {
        hp: {
          player: options._player?.hp,
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
  _player: PlayerAttribute
  _enemy: BaseAttributes
  enemyBloodsucking: number
  playerBloodsucking: number
  playerCounterAttack: number
  enemyCounterAttack: number
  enemyAvoid: boolean
  playerAvoid: boolean
}) => {
  const emulators: Emulator[] = []
  emulators.push({
    [`${1}_enemy`]: {
      action: BATTLE_ACTION.ATTACK,
      state: {
        damage: options.receiveDMG,
        bloodsucking: options.enemyBloodsucking,
        critical: options.enemyCritical,
        counterDamage: options.playerCounterAttack,
        avoid: options.enemyAvoid,
      },
      now: {
        hp: {
          player: options._player?.hp,
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
        counterDamage: options.enemyCounterAttack,
        avoid: options.playerAvoid,
      },
      now: {
        hp: {
          enemy: options._enemy?.hp,
        },
        mp: {
          player: options._player?.mp,
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
  const enemyAttribute = _enemy.attribute

  let endWar = false
  let winner = ''
  let round = 1
  let totalDamage = 0

  while (!endWar) {
    const { receiveDMG, enemyBloodsucking, enemyCritical, playerCounterAttack, playerAvoid } = receiveDamage(_p, _enemy) // Mục tiêu gây sát thương lên người chơi.
    const { inflictDMG, playerBloodsucking, playerCritical, enemyCounterAttack, enemyAvoid } = inflictDamage(_p, _enemy) // Người chơi gây sát thương lên mục tiêu.

    playerAttribute.hp -= formatHP(playerAttribute?.hp, receiveDMG)
    playerAttribute.hp -= formatHP(playerAttribute.hp, enemyCounterAttack)
    if (playerAttribute.hp > 0 && playerBloodsucking > 0)
      playerAttribute.hp += playerBloodsucking

    totalDamage += inflictDMG
    enemyAttribute.hp -= formatHP(enemyAttribute.hp, inflictDMG)
    enemyAttribute.hp -= formatHP(enemyAttribute.hp, playerCounterAttack)
    if (enemyAttribute.hp > 0 && enemyBloodsucking)
      enemyAttribute.hp += enemyBloodsucking

    if (enemyAttribute.hp <= 0) {
      winner = WINNER.youwin
      endWar = true

      return {
        player: playerClone,
        enemy: enemyClone,
        emulators,
        winner,
        totalDamage,
      } as BattleResponse
    }

    if (playerAttribute?.hp <= 0) {
      winner = WINNER.youlose
      endWar = true

      return {
        player: playerClone,
        enemy: enemyClone,
        emulators,
        winner,
        totalDamage,
      } as BattleResponse
    }

    //  Tốc độ cao hơn sẽ đánh
    if (playerAttribute?.speed < enemyAttribute?.speed) {
      emulators.push(addEnemyFirstEmulators({
        enemyCritical,
        playerCritical,
        receiveDMG,
        inflictDMG,
        _player: playerAttribute,
        _enemy: enemyAttribute,
        enemyBloodsucking,
        playerBloodsucking,
        playerCounterAttack,
        enemyCounterAttack,
        enemyAvoid,
        playerAvoid,
      })[0])
    }

    else {
      emulators.push(addPlayerFirstEmulators({
        playerCritical,
        enemyCritical,
        inflictDMG,
        receiveDMG,
        _enemy: enemyAttribute,
        _player: playerAttribute,
        enemyBloodsucking,
        playerBloodsucking,
        playerCounterAttack,
        enemyCounterAttack,
        enemyAvoid,
        playerAvoid,
      })[0])
    }

    if (round >= 30) {
      winner = WINNER.youlose
      endWar = true

      return {
        player: playerClone,
        enemy: enemyClone,
        emulators,
        winner,
        totalDamage,
      } as BattleResponse
    }

    round++
  }

  return {
    player: playerClone,
    enemy: enemyClone,
    emulators,
    winner,
    totalDamage,
  } as BattleResponse
}
