import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'
import type { PlayerDataResponse, PlayerServerResponse } from '~/types'

export const usePlayerStore = defineStore('player', () => {
  const playerInfo = ref<PlayerDataResponse>()

  const sid = computed(() => playerInfo.value?.sid)
  const mids = computed(() => playerInfo.value?.mid)
  const upgrade = computed(() => playerInfo.value?.upgrade)
  const attribute = computed(() => playerInfo.value?.attribute)
  const equipments = computed(() => playerInfo.value?.equipments)

  const loadPlayer = (data: any) => {
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
      equipments: data.equipments,
    })
  }

  const getPlayer = async () => {
    const data = await $fetch<PlayerServerResponse>('/api/player', {
      headers: (useRequestHeaders(['cookie']) as any),
    })

    if (!data)
      return navigateTo('/role')

    set(playerInfo, {
      ...data?.player,
      attribute: {
        ...data?.attribute,
      },
      mid: {
        ...data?.mid,
      },
      upgrade: {
        ...data?.upgrade,
      },
      equipments: data.equipments,
    })
  }

  return {
    sid,
    mids,
    playerInfo,
    getPlayer,
    loadPlayer,
    upgrade,
    attribute,
    equipments,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
