import { getServerSession } from '#auth'
import { BATTLE_KIND } from '~/constants'
import { BattleSchema, PlayerSchema } from '~/server/schema'

const handle = defineEventHandler(async (event) => {
  const now = new Date().getTime()

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
      statusMessage: 'Player Invalid',
    })
  }

  const battle = await BattleSchema
    .findOne({ sid: player.sid, kind: BATTLE_KIND.BOSS_ELITE })
    .sort({ createdAt: -1 }).select('createdAt')

  if (battle) {
    // validate
    const doRefresh = new Date(battle.createdAt!).getTime() + 60000
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now,
      }
    }
  }

  return {
    inRefresh: false,
    refreshTime: 0,
  }
})

export default handle
