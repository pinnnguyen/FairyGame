import { getServerSession } from '#auth'
import { startEndHoursBossFrameTime, startTimeEvent } from '~/common'
import { cloneDeep } from '~/helpers'
import { BossCreatorSchema, BossDataSchema } from '~/server/schema'

const getBossFrameTime = async () => {
  const bossFrameTime = await BossCreatorSchema.find({ death: false, kind: 'frame_time' })
  if (bossFrameTime.length !== 0)
    return bossFrameTime

  // const today = moment().startOf('day')
  const bossFrameTimeList = await BossDataSchema.find({ kind: 'frame_time' })
  const bossList = cloneDeep(bossFrameTimeList)

  const newBoss = []
  for (let i = 0; i < bossList.length; i++) {
    bossList[i].isStart = false
    const { start, end } = startEndHoursBossFrameTime(bossList[i].startHours)
    bossList[i].isStart = startTimeEvent(start, end)

    bossList[i].startHours = start
    bossList[i].endHours = end
    newBoss.push({
      bossId: bossList[i].id,
      hp: bossList[i].attribute.hp,
      death: false,
      killer: null,
      revive: 0,
      ...bossList[i],
    })
  }

  await BossCreatorSchema.insertMany(newBoss)
  return newBoss
}

const handle = defineEventHandler(async (event) => {
  const uServer = await getServerSession(event)
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return getBossFrameTime()
})

export default handle
