import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'

export const usePlayerSlot = defineStore('playerSlot', () => {
  const { equipments } = storeToRefs(usePlayerStore())

  const slot1 = computed(() => equipments.value.find((e: { slot: number }) => e.slot === 1))
  const slot2 = computed(() => equipments.value.find((e: { slot: number }) => e.slot === 2))

  const slot3 = computed(() => equipments.value.find((e: { slot: number }) => e.slot === 3))
  const slot4 = computed(() => equipments.value.find((e: { slot: number }) => e.slot === 4))

  const slot5 = computed(() => equipments.value.find((e: { slot: number }) => e.slot === 5))
  const slot6 = computed(() => equipments.value.find((e: { slot: number }) => e.slot === 6))

  const slot7 = computed(() => equipments.value.find((e: { slot: number }) => e.slot === 7))
  const slot8 = computed(() => equipments.value.find((e: { slot: number }) => e.slot === 8))

  const getSlotEquipUpgrade = (slot?: number) => {
    return equipments.value.find((e: any) => e.slot === slot)
  }

  return {
    slot1,
    slot2,
    slot3,
    slot4,
    slot5,
    slot6,
    slot7,
    slot8,
    getSlotEquipUpgrade,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerSlot, import.meta.hot))
