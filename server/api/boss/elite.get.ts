import { getServerSession } from '#auth'
import { cloneDeep } from '~/helpers'
import { BossCreatorSchema, BossDataSchema, PlayerSchema } from '~/server/schema'

const getBossElite = async () => {
  const bossEliteData = await BossCreatorSchema.find({ death: false })
  if (bossEliteData.length !== 0)
    return bossEliteData

  const bossData = await BossDataSchema.find({ kind: 'elite' })
  const bossClone = cloneDeep(bossData)
  return await BossCreatorSchema.insertMany(bossClone.map(b => ({
    ...b,
    bossId: b.id,
    hp: b.attribute.hp,
    death: false,
    killer: null,
    revive: 0,
  })))
}

const handle = defineEventHandler(async (event) => {
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

  return getBossElite()
})

export default handle
