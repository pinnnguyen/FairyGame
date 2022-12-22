import mongoose from 'mongoose'
import PlayerSchema from '~/server/schema/player'
import MidSchema from '~/server/schema/mid'
import PlayerAttribute from '~/server/schema/playerAttribute'
import { DEFAULT_ATTRIBUTE, DEFAULT_ROLE } from '~/constants'
const ObjectId = mongoose.Types.ObjectId
interface CreateRoleBody {
  name: string
  userId: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateRoleBody>(event)
  const sid = new ObjectId().toString()

  const playerResource = await PlayerSchema.getPlayer(body.userId)

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
  const createAttribute = new PlayerAttribute({
    sid: createRole.sid,
    ...DEFAULT_ATTRIBUTE,
  })

  const mid = await MidSchema.find({
    id: {
      $in: [createRole.midId, (createRole.midId as number) + 1],
    },
  })

  await createAttribute.save()

  return {
    player: createRole,
    attribute: createAttribute,
    mid,
  }
})
