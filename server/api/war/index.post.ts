import type { H3Event } from 'h3'
import { createError, sendError } from 'h3'
import moment from 'moment'
import { getBaseReward, receivedEquipment, setLastTimeReceivedRss } from '~/server/helpers'
import type { BattleRequest, BattleResponse, PlayerInfo } from '~/types'
import { BattleSchema, BossSchema, MonsterSchema, PlayerSchema } from '~/server/schema'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'
import { startWar } from '~/helpers'

export const handlePlayerVsTarget = async (_p: PlayerInfo, battleRequest: BattleRequest) => {
  // Get battle information has already used it
  console.log('--battleRequest--', battleRequest)
  const today = moment().startOf('day')
  const now = new Date().getTime()

  const battle = await BattleSchema
    .findOne({ 'sid': _p.player.sid, 'kind': BATTLE_KIND.PVE, 'mid.id': _p.player.midId })
    .sort({ createdAt: -1 }).select('player enemy reward createdAt')

  if (battle) {
    // Clear pve history
    await BattleSchema.deleteMany({
      '_id': {
        $nin: [battle._id],
      },
      'kind': BATTLE_KIND.PVE,
      'sid': _p.player.sid,
      'mid.id': _p.player.midId,
    })

    // validate
    const doRefresh = new Date(battle.createdAt).getTime() + (_p as any)?.mid?.current?.ms ?? 60000

    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
        player: battle.player,
        enemy: battle.enemy,
        reward: battle.reward,
      }
    }
  }

  let _enemyObj: any = {}
  if (battleRequest.target.type === TARGET_TYPE.MONSTER)
    _enemyObj = await MonsterSchema.findOne({ id: battleRequest.target.id })

  if (battleRequest.target.type === TARGET_TYPE.BOSS_DAILY)
    _enemyObj = await BossSchema.findOne({ id: battleRequest.target.id })

  if (!_enemyObj) {
    return createError({
      statusCode: 400,
      statusMessage: 'monster not found!',
    })
  }

  if (battleRequest.target.type === TARGET_TYPE.BOSS_DAILY) {
    const numberOfbattle = await BattleSchema.find({
      sid: _p.player.sid,
      kind: BATTLE_KIND.BOSS_DAILY,
      targetId: battleRequest.target.id,
      createdAt: {
        $gte: moment().startOf('day'),
        $lte: moment(today).endOf('day').toDate(),
      },
    }).count()

    if (numberOfbattle > _enemyObj.numberOfTurn) {
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

  const { exp, gold } = await getBaseReward(_p.player.sid, _enemyObj)
  const { equipments } = await receivedEquipment(_p.player.sid, _enemyObj)
  await setLastTimeReceivedRss(_p.player.sid)

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
  } as BattleResponse
}

export const handleWars = async (request: BattleRequest) => {
  const player = await (PlayerSchema as any).getPlayer(request.player.userId)

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
