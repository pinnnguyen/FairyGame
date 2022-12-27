import type { H3Event } from 'h3'
import { createError, sendError } from 'h3'
import { pveBaseReward, receivedEquipment, setLastTimeReceivedRss } from '~/server/helpers'
import type { BattleRequest, BattleResponse, PlayerInfo } from '~/types'
import { BattleSchema, MonsterSchema, PlayerSchema } from '~/server/schema'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'
import { startWar } from '~/helpers'

export const handlePlayerVsTarget = async (_p: PlayerInfo, battleRequest: BattleRequest) => {
  // Get battle information has already used it
  const battle = await BattleSchema
    .findOne({ 'sid': _p.player.sid, 'kind': BATTLE_KIND.PVE, 'mid.id': _p.player.midId })
    .sort({ createdAt: -1 })

  if (battle) {
    const doRefresh = new Date(battle.createdAt).getTime() + (_p as any)?.mid?.current?.ms ?? 60000
    const now = new Date().getTime()

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

  // if (battleRequest.target.type === TARGET_TYPE.BOSS_DAILY) {
  //   _enemyObj = await MonsterSchema.findOne({ id: battleRequest.target.id })
  // }

  if (!_enemyObj) {
    return createError({
      statusCode: 400,
      statusMessage: 'monster not found!',
    })
  }

  const {
    player,
    enemy,
    emulators,
    winner,
  } = startWar(_p, _enemyObj)

  const { exp, gold } = await pveBaseReward(_p.player.sid, _p.player.midId)
  await receivedEquipment(_p.player.sid, _enemyObj)
  await setLastTimeReceivedRss(_p.player.sid)

  // Lưu lịch sử trận đánh
  await new BattleSchema({
    sid: _p.player.sid,
    mid: {
      id: _p.player.midId,
    },
    kind: battleRequest.kind,
    player,
    enemy,
    emulators,
    winner,
    reward: {
      exp,
      gold,
    },
  }).save()

  // await PlayerSchema.updateOne({ sid: _p.player.sid }, { lastTimeReceivedRss: new Date().getTime() })

  return {
    player,
    enemy,
    emulators,
    winner,
    reward: {
      exp,
      gold,
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
