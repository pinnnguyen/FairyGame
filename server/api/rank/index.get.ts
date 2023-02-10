import { getServerSession } from '#auth'
import { PlayerSchema } from '~/server/schema'

const handle = defineEventHandler(async (event) => {
  const query = getQuery(event)
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  if (query.sorted === 'power') {
    return PlayerSchema.find({}).sort({
      power: -1,
    }).limit(20)
  }

  return PlayerSchema.find({}).sort({
    level: -1,
  }).limit(20)
})

export { handle as default }
