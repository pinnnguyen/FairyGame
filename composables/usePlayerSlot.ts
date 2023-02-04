import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'

export const usePlayerSlot = defineStore('playerSlot', () => {
  const { equipments } = storeToRefs(usePlayerStore())

  const slot1 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 1))
  const slot2 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 2))

  const slot3 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 3))
  const slot4 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 4))

  const slot5 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 5))
  const slot6 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 6))

  const slot7 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 7))
  const slot8 = computed(() => equipments.value?.find((e: { slot: number }) => e.slot === 8))

  const leftSlots = computed(() => {
    return [
      {
        no: 1,
        slot: slot1.value,
      },
      {
        no: 2,
        slot: slot2.value,
      },
      {
        no: 3,
        slot: slot3.value,
      },
      {
        no: 4,
        slot: slot4.value,
      },
    ]
  })

  const rightSlots = computed(() => {
    return [
      {
        no: 5,
        slot: slot5.value,
      },
      {
        no: 6,
        slot: slot6.value,
      },
      {
        no: 7,
        slot: slot7.value,
      },
      {
        no: 8,
        slot: slot8.value,
      },
    ]
  })

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
    leftSlots,
    rightSlots,
    getSlotEquipUpgrade,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlayerSlot, import.meta.hot))
