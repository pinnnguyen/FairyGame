import { getServerSession } from '#auth'
import { MidSchema, PlayerSchema } from '~/server/schema'

export default defineEventHandler(async (event) => {
  // const session = await getServerSession(event)
  // if (!session) {
  //   return createError({
  //     statusCode: 401,
  //     statusMessage: 'Unauthorized',
  //   })
  // }

  const mids = MidSchema.find({})

  return mids

  // const player = await PlayerSchema.findOne({ userId: session?.user?.email }).select('_id')
})
