export default defineNuxtRouteMiddleware(async () => {
  const { loadPlayer } = usePlayerStore()

  onMounted(async () => {
    const role = await $fetch('/api/player', {
      headers: (useRequestHeaders(['cookie']) as any),
    })

    if (role?.player?.sid) {
      loadPlayer(role)
      return navigateTo('/')
    }
  })
})
