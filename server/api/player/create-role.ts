import mongoose from 'mongoose'
import { MidSchema, PlayerAttributeSchema, PlayerSchema } from '~/server/schema'
import { DEFAULT_ATTRIBUTE, DEFAULT_ROLE } from '~/constants'
import { serverSupabaseUser } from '#supabase/server'
const ObjectId = mongoose.Types.ObjectId

interface CreateRoleBody {
  name: string
  userId: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateRoleBody>(event)
  const sid = new ObjectId().toString()
  const serverUser = await serverSupabaseUser(event)
  if (!serverUser) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const playerResource = await (PlayerSchema as any).getPlayer(serverUser?.id)
  if (playerResource) {
    return {
      player: playerResource.player,
      attribute: playerResource.attribute,
      mid: playerResource.mid,

    }
  }

  const createRole = new PlayerSchema({
    sid,
    name: body.name,
    userId: body.userId,
    ...DEFAULT_ROLE,
  })

  await createRole.save()
  const createAttribute = new PlayerAttributeSchema({
    sid: createRole.sid,
    ...DEFAULT_ATTRIBUTE,
  })

  const mid = await MidSchema.find({
    id: {
      $in: [createRole.midId, (createRole.midId) + 1],
    },
  })

  await createAttribute.save()

  return {
    player: createRole,
    attribute: createAttribute,
    mid,
  }
})
