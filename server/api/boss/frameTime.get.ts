import { getServerSession } from '#auth'
import { startEndHoursBossFrameTime } from '~/common'
import { cloneDeep } from '~/helpers'
import { BossCreatorSchema, BossDataSchema } from '~/server/schema'

const getBossFrameTime = async () => {
  const now = new Date().getTime()

  const bossFrameTime = await BossCreatorSchema.find({
    death: false,
    kind: 'frame_time',
    startHours: {
      $gte: now,
    },
    endHours: {
      $lte: now,
    },
  })

  if (bossFrameTime.length !== 0)
    return bossFrameTime

  const bossFrameTimeList = await BossDataSchema.find({ kind: 'frame_time' }).select({
    __v: false,
  })

  const bossList = cloneDeep(bossFrameTimeList)
  const newBoss = []
  for (let i = 0; i < bossList.length; i++) {
    // bossList[i].isStart = false
    const { start, end } = startEndHoursBossFrameTime(bossList[i].startHours!)
    // bossList[i].isStart = startTimeEvent(start, end)

    bossList[i].startHours = start
    bossList[i].endHours = end
    newBoss.push({
      bossId: bossList[i].id,
      hp: bossList[i].attribute.hp,
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
