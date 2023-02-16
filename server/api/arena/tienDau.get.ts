import moment from 'moment'
import { getServerSession } from '#auth'
import { BATTLE_KIND, REACH_LIMIT } from '~/constants'
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

  const player = await PlayerSchema.findOne({ userId: uServer?.user?.email }).select('sid')
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

  const players = await PlayerSchema.find({}).sort({ 'arenas.tienDau.pos': 1 }).limit(50).select('name level arenas power sid')
  return {
    reachLimit: {
      remaining: numberOfArena,
      maximum: REACH_LIMIT.TIEN_DAU,
    },
    data: players,
  }
})
