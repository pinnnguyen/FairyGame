import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMidStore = defineStore('mid', () => {

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMidStore, import.meta.hot))
