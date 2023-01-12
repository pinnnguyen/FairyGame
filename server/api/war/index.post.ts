import type { H3Event } from 'h3'
import { createError, sendError } from 'h3'
import moment from 'moment'
import { getBaseReward, getPlayer, receivedEquipment, setLastTimeReceivedRss } from '~/server/helpers'
import type { BattleRequest, BattleResponse, PlayerInfo } from '~/types'
import { BattleSchema, BossRankSchema, BossSchema, MonsterSchema, PlayerStatusSchema } from '~/server/schema'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'
import { startWar } from '~/helpers'
import { PlayerStatusTypeCon } from '~/types'

// const handleAfterBattle = () => {

// }

export const handlePlayerVsTarget = async (_p: PlayerInfo, battleRequest: BattleRequest) => {
  // Get battle information has already used it
  const isBossFrameTime = battleRequest.target.type === TARGET_TYPE.BOSS_FRAME_TIME
  const isBossDaily = battleRequest.target.type === TARGET_TYPE.BOSS_DAILY
  const isMonster = battleRequest.target.type === TARGET_TYPE.MONSTER

  const rankDMG: any = await BossRankSchema.aggregate(
    [
      {
        $group:
          {
            _id: '$name',
            totalDamage: { $sum: { $multiply: ['$damage'] } },
          },
      },
      {
        $sort: {
          totalDamage: -1,
        },
      },
    ],
  )

  let _enemyObj: any = {}

  if (isMonster)
    _enemyObj = await (MonsterSchema as any).findOne({ id: battleRequest.target.id })

  if (isBossDaily)
    _enemyObj = await (BossSchema as any).findOne({ id: battleRequest.target.id })

  if (isBossFrameTime)
    _enemyObj = await (BossSchema as any).findOne({ id: battleRequest.target.id })

  if (!_enemyObj) {
    return createError({
      statusCode: 400,
      statusMessage: 'monster not found!',
    })
  }

  const now = new Date().getTime()
  const today = moment().startOf('day')

  if (isMonster) {
    const battle = await BattleSchema
      .findOne({ sid: _p.player.sid, kind: BATTLE_KIND.PVE })
      .sort({ createdAt: -1 }).select('player enemy reward createdAt')

    if (battle) {
      // Clear pve history
      await BattleSchema.deleteMany({
        _id: {
          $nin: [battle._id],
        },
        kind: BATTLE_KIND.PVE,
        sid: _p.player.sid,
      })

      const playerStatus = await PlayerStatusSchema.findOne({
        sid: _p.player.sid,
        type: PlayerStatusTypeCon.reduce_waiting_time_training,
        timeLeft: {
          $gte: new Date().getTime(),
        },
      }).select('value')

      // validate
      let ms = (_p as any)?.mid?.current?.ms ?? 60000
      if (playerStatus && playerStatus.value)
        ms -= (ms / 100) * playerStatus.value

      console.log('ms', ms)
      const doRefresh = new Date(battle.createdAt).getTime() + ms
      console.log('doRefresh > now', doRefresh > now)
      if (doRefresh > now) {
        return {
          inRefresh: true,
          refreshTime: doRefresh - now,
          player: battle.player,
          enemy: battle.enemy,
          reward: battle.reward,
          winner: battle.winner,
        }
      }
    }
  }

  if (!_enemyObj)
    return

  if (isBossFrameTime) {
    const battle = await (BattleSchema as any)
      .findOne({ 'sid': _p.player.sid, 'kind': BATTLE_KIND.BOSS_FRAME_TIME, 'mid.id': _p.player.midId })
      .sort({ createdAt: -1 }).select('player enemy reward createdAt')

    if (battle) {
      // validate
      const doRefresh = new Date(battle.createdAt).getTime() + 60000
      if (doRefresh > now) {
        return {
          inRefresh: true,
          refreshTime: doRefresh - now,
          player: battle.player,
          enemy: battle.enemy,
          reward: battle.reward,
          winner: battle.winner,
          rankDMG,
        }
      }
    }
  }

  if (isBossDaily) {
    const numberOfBattle = await BattleSchema.find({
      sid: _p.player.sid,
      kind: BATTLE_KIND.BOSS_DAILY,
      targetId: battleRequest.target.id,
      createdAt: {
        $gte: moment().startOf('day'),
        $lte: moment(today).endOf('day').toDate(),
      },
    }).count()

    if (numberOfBattle > _enemyObj.numberOfTurn) {
      return {
        inRefresh: true,
        refreshTime: new Date(moment(today).endOf('day').toDate()).getTime() - now,
      }
    }
  }

  const {
    player,
    enemy,
    emulators,
    winner,
  } = startWar(_p, _enemyObj)

  const { exp, gold } = await getBaseReward(_p.player.sid, _enemyObj, winner)
  const { equipments } = await receivedEquipment(_p.player.sid, _enemyObj, winner)
  await setLastTimeReceivedRss(_p.player.sid)

  // set trạng thái boss
  // log sat thuong ngoi choi gay ra
  if (isBossFrameTime) {
    const _damage = enemy.hp - _enemyObj.hp
    await new BossRankSchema({
      sid: _p.player.sid,
      bossId: battleRequest.target.id,
      startHours: _enemyObj.startHours,
      damage: _damage,
      name: _p.player.name,
    }).save()

    await (BossSchema as any).findOneAndUpdate({ id: battleRequest.target.id }, {
      $inc: {
        hp: -_damage,
      },
    })
  }

  // Lưu lịch sử trận đánh
  await new BattleSchema({
    sid: _p.player.sid,
    mid: {
      id: _p.player.midId,
    },
    kind: battleRequest.kind,
    targetId: _enemyObj.id,
    player,
    enemy,
    emulators,
    winner,
    reward: {
      base: {
        exp,
        gold,
      },
      equipments,
    },
  }).save()

  return {
    player,
    enemy,
    emulators,
    winner,
    reward: {
      base: {
        exp,
        gold,
      },
      equipments,
    },
    rankDMG,
  } as BattleResponse
}

export const handleWars = async (request: BattleRequest) => {
  const player = await getPlayer(request.player.userId, '')

  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: 'player not found!',
    })
  }

  if (!request.target.type) {
    return createError({
      statusCode: 400,
      statusMessage: 'target not found!',
    })
  }

  return handlePlayerVsTarget(player, request)
}

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<BattleRequest>(event)

  if (!body.kind) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'kind war not found!',
      }),
    )
  }

  return handleWars(body)
})
