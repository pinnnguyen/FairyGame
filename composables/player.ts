import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'
import type { PlayerDataResponse, PlayerServerResponse } from '~/types'

export const usePlayerStore = defineStore('player', () => {
  const playerInfo = ref<PlayerDataResponse>()

  const upgrade = computed(() => playerInfo.value?.upgrade)
  const attribute = computed(() => playerInfo.value?.attribute)

  const hasEquip = (pos: number, _equipId: string) => {
    return attribute.value[(`slot_${pos}`)] === _equipId
  }

  const changeEquip = (pos: number, _equipId: string) => {
    return attribute.value[`slot_${pos}`] = _equipId
  }

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
      headers: (useRequestHeaders(['cookie']) as any),
    })

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
    })
  }

  return {
    playerInfo,
    getPlayer,
    initPlayer,
    upgrade,
    attribute,
    hasEquip,
    changeEquip,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
