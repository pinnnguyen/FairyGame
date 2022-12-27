import PlayerSchema from '~/server/schema/player'
import type { PlayerServerResponse } from '~/types'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const serverUser = await serverSupabaseUser(event)
  const playerResource = await (PlayerSchema as any).getPlayer(serverUser?.id)

  return {
    player: playerResource?.player,
    attribute: playerResource?.attribute,
    mid: playerResource?.mid,
    upgrade: playerResource?.upgrade,
  } as PlayerServerResponse
})
