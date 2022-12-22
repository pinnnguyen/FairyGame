import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'
import type { Monsters } from '~/types/monster'

export const useMonsterStore = defineStore('monster', () => {
  const monsterBattle = ref<Monsters>({})

  const fetchMonsterById = async (id: number) => {
    const data = await $fetch('/api/monster', {
      params: {
        id,
      },
    })

    set(monsterBattle, data)
    return data
  }
  return {
    monsterBattle,
    fetchMonsterById,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMonsterStore, import.meta.hot))
