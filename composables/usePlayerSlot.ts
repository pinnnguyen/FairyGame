import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'

export const usePlayerSlot = defineStore('playerSlot', () => {
  const { playerEquipUpgrade, attribute, equipments } = storeToRefs(usePlayerStore())

  console.log('equipments', equipments.value)
  const slot1 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_1))
  const slot2 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_2))

  const slot3 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_3))
  const slot4 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_4))

  const slot5 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_5))
  const slot6 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_6))

  const slot7 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_7))
  const slot8 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_8))

  const getSlotEquipUpgrade = (slot: number) => {
    return playerEquipUpgrade.value.find((e: any) => e.slot === slot)
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
