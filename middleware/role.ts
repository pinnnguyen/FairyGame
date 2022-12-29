export default defineNuxtRouteMiddleware(async () => {
  const { initPlayer } = usePlayerStore()
  const { status } = useSession()

  console.log('status', status)
  onMounted(async () => {
    const role = await $fetch('/api/player', {
      headers: (useRequestHeaders(['cookie']) as any),
    })

    if (role?.player?.sid) {
      initPlayer(role)
      return navigateTo('/')
    }
  })
})
