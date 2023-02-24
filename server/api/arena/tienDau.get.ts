import moment from 'moment'
import { REACH_LIMIT } from '@game/config'
import { getServerSession } from '#auth'
import { shuffle } from '~/common'
import { BATTLE_KIND } from '~/constants'
import { BattleSchema, PlayerSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  const today = moment().startOf('day')
  const uServer = await getServerSession(event)
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const player = await PlayerSchema.findOne({ userId: uServer?.user?.email }).select('sid power')
  if (!player?.sid) {
    return createError({
      statusCode: 404,
      statusMessage: 'Người chơi không tồn tại',
    })
  }

  const numberOfArena = await BattleSchema.find({
    sid: player.sid,
    kind: BATTLE_KIND.ARENA_SOLO_PVP,
    createdAt: {
      $gte: moment().startOf('day'),
      $lte: moment(today).endOf('day').toDate(),
    },
  }).count()

  const playerList1 = await PlayerSchema.find({
    power: {
      $gte: player.power,
    },
    sid: {
      $nin: [player.sid],
    },
  })
    .sort({ 'arenas.tienDau.pos': -1 })
    .limit(10)
    .select('name level arenas power sid')

  const playerList2 = await PlayerSchema.find({
    power: {
      $lte: player.power,
    },
    sid: {
      $nin: [player.sid],
    },
  })
    .sort({ 'arenas.tienDau.pos': -1 })
    .limit(10).select('name level arenas power sid')

  const data = () => {
    return shuffle([...playerList1, ...playerList2])
  }

  return {
    data: data().slice(0, 5),
    reachLimit: {
      remaining: numberOfArena,
      maximum: REACH_LIMIT.TIEN_DAU,
    },
  }
})
