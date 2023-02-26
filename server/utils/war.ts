import moment from 'moment'
import { REACH_LIMIT, randomKabbalahScript } from '@game/config'
import { formatCash } from '~/common'
import { BATTLE_ACTION, BATTLE_KIND, TARGET_TYPE, attributeToName } from '~/constants'
import { handleKabbalahStartBattle } from '~/server/utils'
import type { BattleRequest, BattleTarget, Emulator, PlayerInfo } from '~/types'
import {
  beforeEnteringFormat,
  formatHP,
  getBaseReward,
  getPlayer,
  handleAfterEndWar,
  handleBeforeStartWar,
  kabbalahFormat,
  matchFormat,
  receiveDamageV2,
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

export const startWarSolo = (targetA: BattleTarget, targetB: BattleTarget, personBeingAttacked?: string) => {
  let round = 0
  const MAX_ROUND = 60
  const emulators: Emulator[] = []

  const totalDamage: Record<string, any> = { list: {}, self: 0 }

  targetA.enemyId = targetB._id
  targetB.enemyId = targetA._id

  // TODO: Format thần thông nếu có
  kabbalahFormat(targetA, targetB)
  const match = matchFormat(targetA, targetB)

  const multipleTarget = beforeEnteringFormat(targetA, targetB)
  for (const attacker of multipleTarget) {
    const scripts = []
    const { kabbalahProps } = handleKabbalahStartBattle(attacker)
    if (!kabbalahProps)
      continue

    const vScript = []
    for (const v in kabbalahProps.values)
      vScript.push(`${kabbalahProps.values[v]}${attributeToName[v]}`)

    const script = `<span class="text-red-400">${attacker.extends.name}</span> 
    Phát động kỹ năng <span class="text-red-500">${kabbalahProps.name}</span> 
    giúp tăng ${vScript.join(' ')}`
    scripts.push(script)

    emulators.push(<Emulator>{
      [attacker._id as string]: {
        scripts,
        action: BATTLE_ACTION.BUFF,
        state: {},
        self: {
          kabbalahProps: [{ ...kabbalahProps }],
        },
        now: {},
      },
    })
  }

  for (let i = 0; i < MAX_ROUND; i++) {
    const scripts = []
    // TODO Chuẩn bị dữ liệu
    for (const attacker of multipleTarget) {
      const attackerAttribute = attacker.attribute
      const currentDefender = multipleTarget.find(m => m._id === attacker.enemyId)
      const attackerID = attacker._id ?? ''
      const defenderID = currentDefender?._id ?? ''
      const defenderAttribute = currentDefender?.attribute

      if (!defenderAttribute)
        return

      const {
        groupAction,
        kabbalahProps,
      } = receiveDamageV2(attacker, currentDefender, round)

      const {
        receiveDMG,
        attackerBloodsucking,
        attackerCritical,
        defenderCounterAttack,
        defenderAvoid,
      } = groupAction

      let totalRestoreHP = attackerBloodsucking
      const disadvantage = currentDefender.effect.disadvantage

      for (const disv in disadvantage) {
        // TODO hiệu ứng bị trúng độc
        if (disv === 'poisoned') {
          const { value, target, expire } = disadvantage[disv]
          if (expire < round)
            continue

          // TODO: Bị giảm tỉ lệ hồi máu
          if (target === 'reductionRecoveryPerformance')
            totalRestoreHP -= (totalRestoreHP * value) / 100
        }
      }

      totalDamage.list[attackerID] += receiveDMG
      if (kabbalahProps && kabbalahProps?.tag) {
        const script = randomKabbalahScript()
          .replace('#attacker', attacker?.extends?.name ?? '')
          .replace('#kabbalahName', kabbalahProps?.name ?? '')
          .replace('#defender', currentDefender?.extends.name ?? '')
          .replace('#damage', formatCash(receiveDMG))

        scripts.push(script)
      }
      else {
        const script = `<span class="underline">${attacker?.extends?.name}</span> 
        Tung ra một đòn cực mạnh 
        <span class="underline">${currentDefender?.extends.name}</span> 
        trực tiếp nhận <span class="text-red-500">${formatCash(receiveDMG)} sát thương </span>`
        scripts.push(script)
      }

      defenderAttribute.hp -= formatHP(defenderAttribute?.hp, (receiveDMG ?? 0))
      attackerAttribute.hp -= formatHP(attackerAttribute.hp, (defenderCounterAttack ?? 0))

      if (attackerAttribute.hp > 0 && totalRestoreHP > 0) {
        attackerAttribute.hp += totalRestoreHP
        if (attackerAttribute.hp > attackerAttribute.maxhp)
          attackerAttribute.hp = attackerAttribute.maxhp
      }

      // TODO: Lưu giả lập
      emulators.push(<Emulator>{
        [attackerID]: {
          scripts,
          action: BATTLE_ACTION.ATTACK,
          state: {
            receiveDamage: {
              [defenderID]: receiveDMG,
            },
            bloodsucking: attackerBloodsucking,
            critical: attackerCritical,
            counterDamage: defenderCounterAttack,
            avoid: defenderAvoid,
          },
          self: {
            hp: attackerAttribute.hp,
            mp: attackerAttribute.mp,
            kabbalahProps: [{ ...kabbalahProps }],
          },
          now: {
            hp: {
              [defenderID]: defenderAttribute.hp,
            },
            mp: {
              [attackerID]: attackerAttribute.mp,
            },
          },
        },
      })

      const isResult = attackerAttribute.hp <= 0 || defenderAttribute.hp <= 0
      if (isResult) {
        let realId = ''
        if (attackerAttribute.hp <= 0)
          realId = defenderID

        if (defenderAttribute.hp <= 0)
          realId = attackerID

        return {
          emulators: emulators ?? [],
          match,
          winner: realId,
          totalDamage,
        } as any
      }

      if (round === 50) {
        return {
          emulators: emulators ?? [],
          match,
          winner: personBeingAttacked,
          totalDamage,
        } as any
      }

      round++
    }
  }
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
