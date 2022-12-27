export default defineNuxtRouteMiddleware(async () => {
  const { initPlayer } = usePlayerStore()

  const { data: role } = await useFetch('/api/player', {
    headers: (useRequestHeaders(['cookie']) as any),
  })

  if (role.value?.player?.sid) {
    initPlayer(role.value)
    return navigateTo('/')
  }
})
