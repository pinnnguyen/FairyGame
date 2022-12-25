import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'
import { useCookie } from '#app'
import type { PlayerDataResponse, PlayerServerResponse } from '~/types'

export const usePlayerStore = defineStore('player', () => {
  const playerInfo = ref<PlayerDataResponse>({})
  const auth = useSupabaseUser()

  let uid: any = auth.value?.id
  if (!uid)
    uid = useCookie('NUXT_SS_ID').value

  const upgrade = computed(() => playerInfo.value.upgrade)
  const attribute = computed(() => playerInfo.value.attribute)

  const initPlayer = (data: any) => {
    set(playerInfo, {
      ...data.player,
      attribute: {
        ...data.attribute,
      },
      mid: {
        ...data.mid,
      },
      upgrade: {
        ...data.upgrade,
      },
    })
  }

  const getPlayer = async () => {
    const data = await $fetch<PlayerServerResponse>('/api/player', {
      params: {
        userId: uid,
      },
    })

    set(playerInfo, {
      ...data.player,
      attribute: {
        ...data.attribute,
      },
      mid: {
        ...data.mid,
      },
      upgrade: {
        ...data.upgrade,
      },
    })
  }

  return {
    playerInfo,
    getPlayer,
    initPlayer,
    upgrade,
    attribute,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
