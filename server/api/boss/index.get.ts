import moment from 'moment'
import { getServerSession } from '#auth'
import { BattleSchema, BossDataSchema, BossEliteSchema, EquipmentSchema, PlayerSchema } from '~/server/schema'
import { BATTLE_KIND } from '~/constants'
import { startEndHoursBossFrameTime, startTimeEvent } from '~/common'
import { cloneDeep } from '~/helpers'

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

  if (query.kind === 'elite') {
    const bossEliteData = await BossEliteSchema.find({ death: false })
    if (bossEliteData.length !== 0) {
      return {
        bossNe: bossEliteData,
      }
    }

    const bossData = await BossDataSchema.find({ kind: 'elite' })
    const bossClone = cloneDeep(bossData)
    const bossElite = await BossEliteSchema.insertMany(bossClone.map(b => ({
      ...b,
      bossId: b.id,
      hp: b.attribute.hp,
      death: false,
      killer: null,
      revive: 0,
    })))

    return {
      bossNe: bossElite,
    }
  }

  const bossNe = await BossDataSchema.find({ kind: query.kind })
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

    bossNe[i].isStart = false
    if (query.kind === 'frameTime') {
      const { start, end } = startEndHoursBossFrameTime(bossNe[i].startHours)
      bossNe[i].isStart = startTimeEvent(start, end)

      bossNe[i].startHours = start
      bossNe[i].endHours = end
    }
  }

  return {
    bossNe,
  }
})
