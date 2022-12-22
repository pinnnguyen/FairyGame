export default defineNuxtRouteMiddleware(async () => {
  const { initPlayer } = usePlayerStore()
  const user = useSupabaseUser()

  const role = await $fetch('/api/player', {
    params: {
      userId: user.value?.id,
    },
  })

  if (role) {
    initPlayer(role)
    return navigateTo('/')
  }
})
