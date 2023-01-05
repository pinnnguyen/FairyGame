import moment from 'moment'
import { getServerSession } from '#auth'
import { BattleSchema, BossSchema, EquipmentSchema, PlayerSchema } from '~/server/schema'
import { BATTLE_KIND } from '~/constants'
import { frameTimeBossEnded, startEndHoursBossFrameTime } from '~/common'

export default defineEventHandler(async (event) => {
  const uServer = await getServerSession(event)
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const query = getQuery(event)
  const today = moment().startOf('day')
  const bossNe = await (BossSchema as any).find({ kind: query.kind })

  const player = await (PlayerSchema as any).findOne({ userId: uServer?.user?.email }).select('sid')
  if (!player?.sid) {
    return createError({
      statusCode: 404,
      statusMessage: 'Người chơi không tồn tại',
    })
  }

  for (let i = 0; i < bossNe.length; i++) {
    const equipIds = bossNe[i].reward.equipRates.map((i: { id: number }) => i.id)
    const numberOfBattle = await (BattleSchema as any).find({
      sid: player.sid,
      kind: BATTLE_KIND.BOSS_DAILY,
      targetId: bossNe[i].id,
      createdAt: {
        $gte: moment().startOf('day'),
        $lte: moment(today).endOf('day').toDate(),
      },
    }).count()

    bossNe[i].numberOfTurn -= numberOfBattle
    bossNe[i].reward.equipments = await (EquipmentSchema as any).find({
      id: {
        $in: equipIds,
      },
    })

    bossNe[i].isStart = false
    if (query.kind === 'frameTime') {
      const { start, end } = startEndHoursBossFrameTime(13)
      bossNe[i].isStart = frameTimeBossEnded(start, end)

      bossNe[i].startHours = start
      bossNe[i].endHours = end
    }
  }

  return {
    bossNe,
  }
})
