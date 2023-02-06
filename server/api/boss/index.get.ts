import moment from 'moment'
import type { Player } from '~/types'
import { getServerSession } from '#auth'
import { BattleSchema, BossDataSchema, BossEliteSchema, EquipmentSchema, PlayerSchema } from '~/server/schema'
import { BATTLE_KIND } from '~/constants'
import { startEndHoursBossFrameTime, startTimeEvent } from '~/common'
import { cloneDeep } from '~/helpers'

const getBossDaily = async (player: Player) => {
  const today = moment().startOf('day')
  const bossDailys = await BossDataSchema.find({ kind: 'daily' }).sort({ level: 1 })

  for (let i = 0; i < bossDailys.length; i++) {
    const equipIds = bossDailys[i].reward.equipRates.map((i: { id: number }) => i.id)
    const numberOfBattle = await BattleSchema.find({
      sid: player.sid,
      kind: BATTLE_KIND.BOSS_DAILY,
      targetId: bossDailys[i]._id,
      createdAt: {
        $gte: moment().startOf('day'),
        $lte: moment(today).endOf('day').toDate(),
      },
    }).count()

    bossDailys[i].numberOfTurn -= numberOfBattle
    bossDailys[i].reward.equipments = await EquipmentSchema.find({
      id: {
        $in: equipIds,
      },
    })
  }

  return bossDailys
}

const getBossFrameTime = async (player: Player) => {
  const today = moment().startOf('day')
  const bossNe = await BossDataSchema.find({ kind: 'frameTime' })

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
    const { start, end } = startEndHoursBossFrameTime(bossNe[i].startHours)
    bossNe[i].isStart = startTimeEvent(start, end)

    bossNe[i].startHours = start
    bossNe[i].endHours = end
  }

  return bossNe
}

const getBossElite = async () => {
  const bossEliteData = await BossEliteSchema.find({ death: false })
  if (bossEliteData.length !== 0)
    return bossEliteData

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

  return bossElite
}

export default defineEventHandler(async (event) => {
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

  return {
    elites: await getBossElite(),
    daily: await getBossDaily(player),
    frameTime: await getBossFrameTime(player),
  }
})
