import mongoose from 'mongoose'
import { getServerSession } from '#auth'
import { MidSchema, PlayerAttributeSchema, PlayerSchema, addSystemChat } from '~/server/schema'
import { getPlayer } from '~/server/helpers'

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

  const playerResource = await getPlayer(session?.user?.email, '')
  if (playerResource) {
    return {
      player: playerResource.player,
      attribute: playerResource.attribute,
      mid: playerResource.mid,
    }
  }

  const playerName = await PlayerSchema.findOne({ name: body.name })
  if (playerName) {
    return {
      success: false,
      message: 'Tên nhân vật của đạo hữu đã bị trùng!',
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
  await addSystemChat('', `Chào mừng ${body.name} gia nhập Tu tiên giả`)

  return {
    success: true,
    message: 'Tạo nhân vật thành công',
    player: createRole,
    attribute: createAttribute,
    mid,
  }
})
