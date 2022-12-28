import { PlayerSchema } from '~/server/schema'
import type { PlayerServerResponse } from '~/types'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const serverUser = await serverSupabaseUser(event)
  if (!serverUser) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const playerResource = await (PlayerSchema as any).getPlayer(serverUser?.id)
  return {
    player: playerResource?.player,
    attribute: playerResource?.attribute,
    mid: playerResource?.mid,
    upgrade: playerResource?.upgrade,
  } as PlayerServerResponse
})
