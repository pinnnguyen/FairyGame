import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'
import type { PlayerInfo } from '~/types'

export const usePlayerStore = defineStore('player', () => {
  const playerInfo = ref<PlayerInfo>({})
  const auth = useSupabaseUser()

  const initPlayer = (data) => {
    set(playerInfo, {
      ...data.player,
      attribute: {
        ...data.attribute,
      },
      mid: {
        ...data.mid,
      },
    })
  }

  const getPlayer = async () => {
    const data = await $fetch('/api/player', {
      params: {
        userId: auth.value?.id,
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
    })
  }

  return {
    playerInfo,
    getPlayer,
    initPlayer,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
