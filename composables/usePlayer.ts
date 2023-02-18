import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'
import type { PlayerDataResponse, PlayerServerResponse } from '~/types'

export const usePlayerStore = defineStore('player', () => {
  const playerInfo = ref<PlayerDataResponse>()

  const $io = useNuxtApp().$io
  const sid = computed(() => playerInfo.value?.sid)
  const mids = computed(() => playerInfo.value?.mid)
  const upgrade = computed(() => playerInfo.value?.upgrade)
  const attribute = computed(() => playerInfo.value?.attribute)
  const equipments = computed(() => playerInfo.value?.equipments)
  const mindDharma = computed(() => playerInfo.value?.mindDharma)
  const linhCan = computed(() => playerInfo.value?.linhCan)
  const moneyManagement = computed(() => playerInfo.value?.moneyManagement)

  const fetchPlayer = () => {
    $io.emit('fetch:player', sid.value)
  }
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
    try {
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
        equipments: data.equipments,
      })
    }
    catch (e) {
      console.error(e)
    }
  }

  return {
    sid,
    mids,
    playerInfo,
    getPlayer,
    loadPlayer,
    fetchPlayer,
    upgrade,
    attribute,
    equipments,
    mindDharma,
    linhCan,
    moneyManagement,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
