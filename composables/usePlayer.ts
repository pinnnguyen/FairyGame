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
  const playerEquipUpgrade = computed(() => playerInfo.value?.playerEquipUpgrade)

  const hasEquip = (pos: number, _equipId: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return attribute.value[(`slot_${pos}`)] === _equipId
  }

  const changeEquip = (pos: number, _equipId?: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return attribute.value[`slot_${pos}`] = _equipId
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
      playerEquipUpgrade: data.playerEquipUpgrade,
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
      playerEquipUpgrade: data.playerEquipUpgrade,
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
    hasEquip,
    changeEquip,
    equipments,
    playerEquipUpgrade,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
