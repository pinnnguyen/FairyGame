import moment from 'moment'
import { getServerSession } from '#auth'
import { BATTLE_KIND } from '~/constants'
import { BattleSchema, BossDataSchema, EquipmentSchema, PlayerSchema } from '~/server/schema'
import type { Player } from '~/types'

const getBossDaily = async (player: Player) => {
  const today = moment().startOf('day')
  const bossDaily = await BossDataSchema.find({ kind: 'daily' }).sort({ level: 1 })

  for (let i = 0; i < bossDaily.length; i++) {
    const equipIds = bossDaily[i].reward.equipRates.map((i: { id: number }) => i.id)
    const numberOfBattle = await BattleSchema.find({
      sid: player.sid,
      kind: BATTLE_KIND.BOSS_DAILY,
      targetId: bossDaily[i].id,
      createdAt: {
        $gte: moment().startOf('day'),
        $lte: moment(today).endOf('day').toDate(),
      },
    }).count()

    bossDaily[i].numberOfTurn! -= numberOfBattle
    bossDaily[i].reward.equipments = await EquipmentSchema.find({
      id: {
        $in: equipIds,
      },
    })
  }

  return bossDaily
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

  return getBossDaily(player)
})
