import PlayerSchema from '~/server/schema/player'
import type { PlayerServerResponse } from '~/types'
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const playerResource = await (PlayerSchema as any).getPlayer(query.userId)

  return {
    player: playerResource?.player,
    attribute: playerResource?.attribute,
    mid: playerResource?.mid,
    upgrade: playerResource.upgrade,
  } as PlayerServerResponse
})
