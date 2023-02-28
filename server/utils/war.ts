import moment from 'moment'
import { KABBALAH_RULE, KABBALAH_TAG_NAME, REACH_LIMIT, randomKabbalahScript } from '@game/config'
import { formatCash, randomNumber } from '~/common'
import { BATTLE_ACTION, BATTLE_KIND, TARGET_TYPE, attributeToName } from '~/constants'
import { cloneDeep } from '~/helpers'
import {
  getPlayer,
  handleAfterEndWar,
  handleBeforeStartWar,
  handleKabbalahInBattle,
  handleKabbalahStartBattle,
  receivedEquipment,
  receivedItems,
  setLastTimeReceivedRss,
  useBaseReward,
} from '~/server/utils'
import type { BaseAttributes, BattleRequest, BattleTarget, Emulator, PlayerInfo } from '~/types'

import { BattleSchema, PlayerSchema } from '~/server/schema'

export const formatHP = (hp: number, limit: number) => {
  if (hp < limit)
    return hp

  return limit
}

export const attributeDeep = (attribute: BaseAttributes) => {
  const aDeep = cloneDeep(attribute)

  return {
    hp: aDeep.hp,
  }
}

export const kabbalahFormat = (targetA: BattleTarget, targetB: BattleTarget) => {
  // Check & get xem có thần thông không để bước vào trận chiến
  if (targetA.spiritualRoot?.kind && targetA?.kabbalah) {
    let aKabbalahRule = null
    const kabbalahKeyUsed: (string | undefined)[] = []

    for (const kaUsed in targetA?.kabbalah) {
      if (targetA?.kabbalah[kaUsed].unlock
          && ['automatic', 'manual'].includes(targetA.kabbalah[kaUsed].type))
        kabbalahKeyUsed.push(kaUsed)
    }

    aKabbalahRule = KABBALAH_RULE[targetA.spiritualRoot?.kind]
    targetA.kabbalahRule = aKabbalahRule
      .filter(k => kabbalahKeyUsed.includes(k.sign))
  }

  if (targetB.spiritualRoot?.kind && targetB?.kabbalah) {
    let aKabbalahRule = null
    const kabbalahKeyUsed: (string | undefined)[] = []

    for (const kaUsed in targetA?.kabbalah) {
      if (targetB?.kabbalah[kaUsed].used)
        kabbalahKeyUsed.push(kaUsed)
    }

    aKabbalahRule = KABBALAH_RULE[targetB.spiritualRoot?.kind]
    targetB.kabbalahRule = aKabbalahRule.filter(k => kabbalahKeyUsed.includes(k.sign))
  }
}

export const matchFormat = (targetA: BattleTarget, targetB: BattleTarget) => {
  return {
    [(targetA.extends._id as string)]: {
      extends: {
        pos: 1,
        ...targetA.extends,
      },
      attribute: {
        ...attributeDeep(targetA.attribute),
      },
    },
    [(targetB.extends._id as string)]: {
      extends: {
        pos: 2,
        ...targetB.extends,
      },
      attribute: {
        ...attributeDeep(targetB.attribute),
      },
    },
  }
}

export const beforeEnteringFormat = (targetA: BattleTarget, targetB: BattleTarget) => {
  function compare(a: any, b: any) {
    if (a.attribute.speed < b.attribute.speed)
      return 1

    if (a.attribute.speed > b.attribute.speed)
      return -1

    return 0
  }

  const multipleTarget = [targetA, targetB]
  return multipleTarget.sort(compare)
}

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

    const ran = randomNumber(1, 200)
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
  if (inflictDMG <= 0) {
    return {
      blood: 0,
    }
  }

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
  if (inflictDMG <= 0) {
    return {
      hasCritical: false,
      inflictDMG,
    }
  }

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

export const receiveDamageV2 = (attacker: BattleTarget, defender: BattleTarget, round: number) => {
  let originDMG: number

  const attackerAttribute = attacker.attribute
  const defenderAttribute = defender.attribute

  const attackerKabbalahRule = attacker.kabbalahRule
  const attackerKabbalah = attacker.kabbalah

  const attackerDamage = attackerAttribute.damage ?? 0
  const defenderDef = defenderAttribute.def ?? 0

  originDMG = Math.round(attackerDamage - defenderDef * 0.75)
  if (originDMG < 0)
    originDMG = 0

  const { kabbalahDamage, kabbalahProps } = handleKabbalahInBattle(attackerKabbalahRule, attackerKabbalah, originDMG)
  if (kabbalahProps && kabbalahDamage) {
    if (kabbalahProps.tag === KABBALAH_TAG_NAME.CARPENTRY_TECHNIQUES) {
      const disadvantage = kabbalahProps.effect?.disadvantage

      if (disadvantage?.poisoned) {
        defender.effect.disadvantage.poisoned = {
          ...disadvantage.poisoned,
          expire: round + disadvantage?.poisoned.round,
          name: kabbalahProps.name,
        }
      }
    }

    // TODO: 1 Số skill không có hiệu ứng
    if (kabbalahProps.tag === KABBALAH_TAG_NAME.JINYUAN_SWORD)
      originDMG = kabbalahDamage
  }

  const { blood } = handleBloodsucking(originDMG, attackerAttribute?.bloodsucking, defenderAttribute.reductionBloodsucking)
  const { recovery } = handleRecoveryPerformance(blood, attackerAttribute.recoveryPerformance, defenderAttribute.reductionRecoveryPerformance)
  const { hasCritical, inflictDMG: inflictDMGAfter } = handleCritical(attackerAttribute?.critical, originDMG, attackerAttribute?.criticalDamage, defenderAttribute?.reductionCriticalDamage)
  if (hasCritical && inflictDMGAfter > 0)
    originDMG = inflictDMGAfter

  const { counterDamage } = handleCounterAttack(originDMG, attackerAttribute?.reductionCounterAttack, defenderAttribute?.counterAttack)
  const { hasAvoid } = handleAvoid(defenderAttribute?.avoid, attackerAttribute?.reductionAvoid)
  if (hasAvoid)
    originDMG = 0

  return {
    groupAction: {
      receiveDMG: originDMG,
      attackerBloodsucking: recovery,
      attackerCritical: hasCritical,
      defenderCounterAttack: counterDamage,
      defenderAvoid: hasAvoid,
    },
    kabbalahProps,
  }
}

export const startWarSolo = async (targetA: BattleTarget, targetB: BattleTarget, personBeingAttacked?: string) => {
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

      defenderAttribute.maxhp -= formatHP(defenderAttribute?.maxhp, (receiveDMG ?? 0))
      attackerAttribute.maxhp -= formatHP(attackerAttribute.maxhp, (defenderCounterAttack ?? 0))

      if (attackerAttribute.maxhp > 0 && totalRestoreHP > 0) {
        attackerAttribute.maxhp += totalRestoreHP
        if (attackerAttribute.maxhp > attackerAttribute.hp)
          attackerAttribute.maxhp = attackerAttribute.hp
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
            hp: attackerAttribute.maxhp,
            mp: attackerAttribute.mp,
            kabbalahProps: [{ ...kabbalahProps }],
          },
          now: {
            hp: {
              [defenderID]: defenderAttribute.maxhp,
            },
            mp: {
              [attackerID]: attackerAttribute.mp,
            },
          },
        },
      })

      const isResult = attackerAttribute.maxhp <= 0 || defenderAttribute.maxhp <= 0 || round === 50
      if (isResult) {
        //         const p = await PlayerSchema.findOne({ _id: attackerID }).select('sid')
        //         if (p) {
        //           console.log('attackerAttribute.hp', attackerAttribute.hp)
        // //          await PlayerAttributeSchema.findOneAndUpdate({ sid: p.sid }, {
        // //            hp: attackerAttribute.hp,
        // //          })
        //         }

        let realId = ''
        if (attackerAttribute.maxhp <= 0)
          realId = defenderID

        if (defenderAttribute.maxhp <= 0)
          realId = attackerID

        return {
          emulators: emulators ?? [],
          match,
          winner: round === 50 ? personBeingAttacked : realId,
          totalDamage,
        } as any
      }

      round++
    }
  }
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

  const warResponse = await startWarSolo(targetA, targetB, attacker.player._id)
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
    } = await startWarSolo(targetA, targetB, battleRequest.target.id)

    for (const d in totalDamage.list) {
      if (d === _p.player._id)
        totalDamage.self = totalDamage.list[d]
    }

    const { exp, gold } = await useBaseReward(_p.player, _enemyObj, realWinner)
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
