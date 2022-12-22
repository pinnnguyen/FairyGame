export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  const { playerInfo, getPlayer } = usePlayerStore()

  if (!user.value)
    return navigateTo('/login')

  if (playerInfo.value?.id)
    return
  //

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  await useAsyncData(() => getPlayer(), {
    initialCache: false,
  })
})
