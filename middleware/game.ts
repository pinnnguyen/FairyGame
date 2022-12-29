import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/player'

export default defineNuxtRouteMiddleware(async () => {
  const { status } = useSession()

  const { getPlayer } = usePlayerStore()
  const { playerInfo } = storeToRefs(usePlayerStore())

  console.log('---playerInfo---', playerInfo.value)
  if (status.value !== 'authenticated')
    return navigateTo('/login')

  if (playerInfo.value?.name)
    return
//
//  else
//    return navigateTo('/role')

  await getPlayer()
})
