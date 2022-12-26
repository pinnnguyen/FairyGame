import { useCookie } from '#app'

export default defineNuxtRouteMiddleware(async () => {
  const { initPlayer } = usePlayerStore()
  const user = useSupabaseUser()

  let uid: any = user.value?.id
  if (!uid)
    uid = useCookie('NUXT_SS_ID').value

  const role = await $fetch('/api/player', {
    params: {
      userId: uid,
    },
  })

  console.log('role', role)
  if (role.player.sid) {
    initPlayer(role)
    return navigateTo('/')
  }
})
