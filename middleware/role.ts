export default defineNuxtRouteMiddleware(async () => {
  const { initPlayer } = usePlayerStore()
  const user = useSupabaseUser()

  console.log('user', user)
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
