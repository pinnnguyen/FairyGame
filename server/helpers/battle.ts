import moment from 'moment'
import { BattleSchema, BossDataSchema, BossEliteSchema, MonsterSchema, PlayerStatusSchema } from '~/server/schema'
import type { BattleRequest, EnemyObject, PlayerInfo } from '~/types'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'
import { PlayerStatusTypeCon } from '~/types'

const handleTargetNormal = async (_p: PlayerInfo) => {
  const now = new Date().getTime()
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

    const doRefresh = new Date((battle.createdAt) as string).getTime() + ms
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        playerBefore: battle.player,
        enemyBefore: battle.enemy,
        reward: battle.reward,
        winnerBefore: battle.winner,
      }
    }
  }

  return {
    inRefresh: true,
  }
}

const handleTargetFrameTime = async (_p: PlayerInfo) => {
  const now = new Date().getTime()

  const battle = await BattleSchema
    .findOne({ 'sid': _p.player.sid, 'kind': BATTLE_KIND.BOSS_FRAME_TIME, 'mid.id': _p.player.midId })
    .sort({ createdAt: -1 }).select('player enemy reward createdAt')

  if (battle) {
    // validate
    const doRefresh = new Date((battle.createdAt as string)).getTime() + 60000
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        playerBefore: battle.player,
        enemyBefore: battle.enemy,
        reward: battle.reward,
        winnerBefore: battle.winner,
      }
    }
  }

  return {
    inRefresh: false,
  }
}

const handleTargetElite = async (_p: PlayerInfo) => {
  const now = new Date().getTime()

  const battle = await BattleSchema
    .findOne({ 'sid': _p.player.sid, 'kind': BATTLE_KIND.BOSS_ELITE, 'mid.id': _p.player.midId })
    .sort({ createdAt: -1 }).select('player enemy reward createdAt')

  if (battle) {
    // validate
    const doRefresh = new Date(battle.createdAt!).getTime() + 60000
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        playerBefore: battle.player,
        enemyBefore: battle.enemy,
        reward: battle.reward,
        winnerBefore: battle.winner,
      }
    }
  }

  return {
    inRefresh: false,
  }
}

const handleTargetDaily = async (_p: PlayerInfo, battleRequest: BattleRequest, _enemyObj: EnemyObject) => {
  const now = new Date().getTime()
  const today = moment().startOf('day')

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
      playerBefore: null,
      enemyBefore: null,
      reward: null,
      winnerBefore: null,
    }
  }

  return {
    inRefresh: false,
  }
}

export const handleBeforeStartWar = async (battleRequest: BattleRequest, _p: PlayerInfo) => {
  const bossFrameTime = battleRequest.target.type === TARGET_TYPE.BOSS_FRAME_TIME
  const bossDaily = battleRequest.target.type === TARGET_TYPE.BOSS_DAILY

  const normal = battleRequest.target.type === TARGET_TYPE.MONSTER
  const elite = battleRequest.target.type === TARGET_TYPE.BOSS_ELITE

  if (normal) {
    const _enemyObj = await MonsterSchema.findOne({ id: battleRequest.target.id })
    return { _enemyObj, ...await handleTargetNormal(_p) }
  }

  if (bossDaily) {
    const _enemyObj = await BossDataSchema.findOne({ id: battleRequest.target.id })

    return {
      _enemyObj,
      ...await handleTargetDaily(_p, battleRequest, _enemyObj),
    }
  }

  if (bossFrameTime) {
    const _enemyObj = await BossDataSchema.findOne({ id: battleRequest.target.id })
    return {
      _enemyObj,
      ...await handleTargetFrameTime(_p),
    }
  }

  if (elite) {
    const _enemyObj = await BossEliteSchema.findById(battleRequest.target.id)
    return {
      _enemyObj,
      ...await handleTargetElite(_p),
    }
  }
}
