import { usePlayerStore } from '~/composables/player'

export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  const { initPlayer } = usePlayerStore()

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
