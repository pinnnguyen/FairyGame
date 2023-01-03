import mongoose from 'mongoose'
import { getServerSession } from '#auth'
import { MidSchema } from '~/server/schema/mid'
import { PlayerAttributeSchema } from '~/server/schema/playerAttribute'
import { PlayerSchema } from '~/server/schema/player'

import { DEFAULT_ATTRIBUTE, DEFAULT_ROLE } from '~/constants'
const ObjectId = mongoose.Types.ObjectId

interface CreateRoleBody {
  name: string
  userId: string
  class: number
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const body = await readBody<CreateRoleBody>(event)
  const sid = new ObjectId().toString()

  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const playerResource = await (PlayerSchema as any).getPlayer(session?.user?.email)
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
    userId: session?.user?.email,
    class: body?.class,
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
