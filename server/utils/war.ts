import moment from 'moment'
import { REACH_LIMIT } from '~/config'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'
import type { BattleRequest, BattleTarget, PlayerInfo } from '~/types'
import { startWarSolo } from '~/helpers'

import {
  getBaseReward,
  getPlayer,
  handleAfterEndWar,
  handleBeforeStartWar,
  receivedEquipment,
  receivedItems,
  setLastTimeReceivedRss,
} from '~/server/helpers'
import { BattleSchema, PlayerSchema } from '~/server/schema'

const preparePlayerTargetData = (_p: PlayerInfo) => {
  return {
    spiritualRoot: _p.player.spiritualRoot,
    kabbalah: _p.player.kabbalah,
    kabbalahRule: null,
    extends: {
      _id: _p.player._id ?? 'a',
      name: _p.player.name,
      level: _p.player.level,
      sid: _p.player.sid,
    },
    _id: _p.player._id,
    attribute: _p.attribute,
    effect: {
      disadvantage: {},
      helpful: {},
    },
  } as unknown as BattleTarget
}

const prepareEnemyTargetData = (_enemyObj: any) => {
  return {
    spiritualRoot: null,
    kabbalah: null,
    kabbalahRule: null,
    extends: {
      _id: _enemyObj._id ?? 'b',
      name: _enemyObj.name,
      level: _enemyObj.level,
      sid: null,
    },
    _id: _enemyObj._id,
    attribute: _enemyObj.attribute,
    effect: {
      disadvantage: {},
      helpful: {},
    },
  } as unknown as BattleTarget
}

export const handlePlayerVsMonster = async (_p: PlayerInfo, battleRequest: BattleRequest) => {
  const {
    _enemyObj,
    inRefresh,
    refreshTime,
    match: beforeMatch,
    reward,
    winner,
    kind,
    damageList,
  } = await handleBeforeStartWar(battleRequest, _p)

  if (inRefresh) {
    return {
      inRefresh,
      refreshTime,
      match: beforeMatch,
      reward,
      winner,
      kind,
      damageList,
    }
  }

  const targetA = preparePlayerTargetData(_p)
  const targetB = prepareEnemyTargetData(_enemyObj)

  try {
    const {
      emulators,
      match,
      winner: realWinner,
      totalDamage,
    } = startWarSolo(targetA, targetB, battleRequest.target.id)

    for (const d in totalDamage.list) {
      if (d === _p.player._id)
        totalDamage.self = totalDamage.list[d]
    }

    const { exp, gold } = await getBaseReward(_p.player, _enemyObj, realWinner)
    const { equipments } = await receivedEquipment(_p.player, _enemyObj, realWinner)
    const { itemDrafts } = await receivedItems(_p.player, _enemyObj, realWinner)
    await setLastTimeReceivedRss(_p.player.sid)

    // Log battle
    await new BattleSchema({
      sid: _p.player.sid,
      mid: {
        id: _p.player.midId,
      },
      kind: battleRequest.kind,
      targetId: battleRequest.target.id,
      match,
      emulators,
      winner: realWinner,
      damageList: totalDamage,
      reward: {
        base: {
          exp,
          gold,
        },
        items: itemDrafts,
        equipments,
      },
    }).save()

    await handleAfterEndWar({
      battleRequest,
      _p,
      realWinner,
      totalDamage,
    })

    return {
      match,
      emulators,
      winner: realWinner,
      damageList: totalDamage,
      kind: battleRequest.kind,
      reward: {
        base: {
          exp,
          gold,
        },
        items: itemDrafts,
        equipments,
      },
    }
  }
  catch (e) {
    console.log('e', e)
  }
}

export const handleWars = async (request: BattleRequest) => {
  const player = await getPlayer(request.player.userId, '')

  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: 'player not found!',
    })
  }

  // await addPlayerGem(player.player.sid, 1, 1, 3)
  // await addPlayerGem(player.player.sid, 2, 1, 3)
  // await addPlayerGem(player.player.sid, 3, 1, 3)
  // await addPlayerGem(player.player.sid, 4, 1, 3)
  // await addPlayerGem(player.player.sid, 5, 1, 3)
  // await addPlayerGem(player.player.sid, 6, 2, 3)
  // await addPlayerGem(player.player.sid, 7, 3, 3)
  // await addPlayerGem(player.player.sid, 8, 5, 3)
  // await addPlayerGem(player.player.sid, 9, 5, 3)
  //
  // await addPlayerGem(player.player.sid, 10, 5, 3)
  // await addPlayerGem(player.player.sid, 11, 5, 3)
  // await addPlayerGem(player.player.sid, 12, 5, 3)
  // await addPlayerGem(player.player.sid, 13, 5, 3)
  // await addPlayerGem(player.player.sid, 14, 5, 3)

  if (!request.target.type) {
    return createError({
      statusCode: 400,
      statusMessage: 'target not found!',
    })
  }

  return handlePlayerVsMonster(player, request)
}

export const handleArenaTienDauSolo = async (request: {
  attackerSid: string
  defenderSid: string
}) => {
  const today = moment().startOf('day')

  const numberOfArena = await BattleSchema.find({
    sid: request.attackerSid,
    kind: BATTLE_KIND.ARENA_SOLO_PVP,
    createdAt: {
      $gte: moment().startOf('day'),
      $lte: moment(today).endOf('day').toDate(),
    },
  }).count()

  if (numberOfArena >= REACH_LIMIT.TIEN_DAU) {
    return {
      reachLimit: true,
    }
  }

  const attacker = await getPlayer('', request.attackerSid)
  if (!attacker) {
    return createError({
      statusCode: 400,
      statusMessage: 'player not found!',
    })
  }

  const defender = await getPlayer('', request.defenderSid)
  if (!defender) {
    return createError({
      statusCode: 400,
      statusMessage: 'player not found!',
    })
  }

  const targetA = preparePlayerTargetData(attacker)
  const targetB = preparePlayerTargetData(defender)

  const warResponse = startWarSolo(targetA, targetB, attacker.player._id)
  await new BattleSchema({
    sid: attacker.player.sid,
    kind: BATTLE_KIND.ARENA_SOLO_PVP,
    match: warResponse.match,
    emulators: warResponse.emulators,
    winner: warResponse.winner,
    damageList: warResponse.totalDamage,
  }).save()

  const youwin = warResponse.winner === attacker.player._id
  if (youwin) {
    const playerLose = await PlayerSchema.findById(defender.player._id).select('arenas')
    if (playerLose && playerLose?.arenas?.tienDau?.pos >= 10) {
      await PlayerSchema.findByIdAndUpdate(defender.player._id,
        {
          $inc: {
            'arenas.tienDau.pos': -10,
          },
        })
    }

    await PlayerSchema.findByIdAndUpdate(attacker.player._id, {
      $inc: {
        'knb': 10,
        'arenas.tienDau.score': 10,
        'arenas.tienDau.pos': 10,
      },
    })

    return {
      youwin,
      attacker: attacker.player,
      defender: defender.player,
      reward: {
        knb: 10,
        scoreTienDau: 10,
      },
      ...warResponse,
    }
  }

  await PlayerSchema.findByIdAndUpdate(attacker.player._id, {
    $inc: {
      'knb': 5,
      'arenas.tienDau.score': 5,
      'arenas.tienDau.pos': 10,
    },
  })

  return {
    youwin,
    attacker: attacker.player,
    defender: defender.player,
    reward: {
      knb: 5,
      scoreTienDau: 5,
    },
    ...warResponse,
  }
}

export const isBossDaily = (target?: string) => {
  return target === TARGET_TYPE.BOSS_DAILY
}

export const isBossFrameTime = (target?: string) => {
  return target === TARGET_TYPE.BOSS_FRAME_TIME
}

export const isBossElite = (target?: string) => {
  return target === TARGET_TYPE.BOSS_ELITE
}

export const isNormalMonster = (target?: string) => {
  return target === TARGET_TYPE.MONSTER
}
