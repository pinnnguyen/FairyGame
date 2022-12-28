import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware(async () => {
  const userSupabase = useSupabaseUser()
  const playerStore = usePlayerStore()

  const { getPlayer } = playerStore
  const { playerInfo } = storeToRefs(playerStore)

  if (!userSupabase.value)
    return navigateTo('/login')

  if (playerInfo.value?._id)
    return

  await getPlayer()
})
