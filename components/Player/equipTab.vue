<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import type { PlayerEquipment } from '~/types'

const { playerInfo, attribute, equipments } = storeToRefs(usePlayerStore())
const equipShow = ref(false)
const equipSelected = ref({})
const slot1 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_1))
const slot2 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_2))
const slot3 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_3))
const slot4 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_4))
const slot5 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_5))
const slot6 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_6))
const slot7 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_7))
const slot8 = computed(() => equipments.value.find((e: { _id: string }) => e._id === attribute.value?.slot_8))

const openDetail = (slot: PlayerEquipment) => {
  equipSelected.value = slot
  equipShow.value = true
}
</script>

<template>
  <Teleport to="#app-before">
    <PopupEquipDetail v-if="equipShow" :item="equipSelected" @close="equipShow = false" />
  </Teleport>
  <div class="h-full flex items-end justify-center">
    <div class="grid grid-cols-4 gap-2 mb-2">
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot1?.preview }">
        <NuxtImg v-if="!slot1" format="webp" class="w-[60px] h-[55px]" src="/equipment/vukhi.png" />
        <NuxtImg v-else format="webp" class="w-[60px] h-[55px]" :src="slot1?.preview" @click="openDetail(slot1)" />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot2?.preview }">
        <NuxtImg v-if="!slot2" format="webp" class="w-[60px] h-[55px]" src="/equipment/ngocboi.png" />
        <NuxtImg v-else format="webp" class="w-[60px] h-[55px]" :src="slot2?.preview" />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot3?.preview }">
        <NuxtImg v-if="!slot3" format="webp" class="w-[60px] h-[55px]" src="/equipment/giap.png" />
        <NuxtImg v-else format="webp" class="w-[60px] h-[55px]" :src="slot3.preview" />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot4?.preview }">
        <NuxtImg v-if="!slot4" format="webp" class="w-[60px] h-[55px]" src="/equipment/baotay.png" />
        <NuxtImg v-else format="webp" class="w-[60px] h-[55px]" :src="slot4?.preview" />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot5?.preview }">
        <NuxtImg v-if="!slot5" format="webp" class="w-[60px] h-[55px]" src="/equipment/rinh.png" />
        <NuxtImg v-else format="webp" class="w-[60px] h-[55px]" :src="slot5?.preview" />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot6?.preview }">
        <NuxtImg v-if="!slot6" format="webp" class="w-[60px] h-[55px]" src="/equipment/giay.png" />
        <NuxtImg v-else format="webp" class="w-[60px] h-[55px]" :src="slot6?.preview" />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot7?.preview }">
        <NuxtImg v-if="!slot7" format="webp" class="w-[60px] h-[55px]" src="/equipment/ngoc.png" />
        <NuxtImg v-else format="webp" class="w-[60px] h-[55px]" :src="slot7?.preview" />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot8?.preview }">
        <NuxtImg v-if="!slot8" format="webp" class="w-[60px] h-[55px]" src="/equipment/mu.png" />
        <NuxtImg v-else format="webp" class="w-[60px] h-[55px]" :src="slot8?.preview" />
      </div>
    </div>
  </div>
</template>
