import { PlayerSchema } from '~/server/schema'
import type { PlayerServerResponse } from '~/types'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const playerResource = await (PlayerSchema as any).getPlayer(session?.user?.email)
  if (!playerResource) {
    return createError({
      statusCode: 404,
      statusMessage: 'Player not found',
    })
  }

  return {
    player: playerResource?.player,
    attribute: playerResource?.attribute,
    mid: playerResource?.mid,
    upgrade: playerResource?.upgrade,
    equipments: playerResource.equipments,
    playerEquipUpgrade: playerResource.playerEquipUpgrade,
  } as PlayerServerResponse
})
