import moment from 'moment'
import { getServerSession } from '#auth'
import { BattleSchema, BossSchema, EquipmentSchema, PlayerSchema } from '~/server/schema'
import { BATTLE_KIND } from '~/constants'

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
  const bossNe = await BossSchema.find({ kind: query.kind })

  const player = await PlayerSchema.findOne({ userId: uServer?.user?.email }).select('sid')
  if (!player?.sid) {
    return createError({
      statusCode: 404,
      statusMessage: 'Người chơi không tồn tại',
    })
  }

  for (let i = 0; i < bossNe.length; i++) {
    const equipIds = bossNe[i].reward.equipRates.map((i: { id: number }) => i.id)
    const numberOfBattle = await BattleSchema.find({
      sid: player.sid,
      kind: BATTLE_KIND.BOSS_DAILY,
      targetId: bossNe[i].id,
      createdAt: {
        $gte: moment().startOf('day'),
        $lte: moment(today).endOf('day').toDate(),
      },
    }).count()

    bossNe[i].numberOfTurn -= numberOfBattle
    bossNe[i].reward.equipments = await EquipmentSchema.find({
      id: {
        $in: equipIds,
      },
    })

    let startHours = 0
    if (query.kind === 'frameTime') {
      console.log('bossNe.startTime', bossNe)
      const date = new Date()
      const now = new Date().getTime()
      date.setHours(bossNe[i].startHours)
      date.setMinutes(0)

      if (date.getTime() > now)
        date.setDate(date.getDate() + 1)

      startHours = date.getTime()
      bossNe[i].startHours = startHours
      bossNe[i].endHours = startHours + 1800000
      console.log('bossNe[i].endHours', bossNe[i].endHours)
    }
  }

  return {
    bossNe,
  }
})
