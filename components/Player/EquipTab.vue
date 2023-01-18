<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerSlot } from '#imports'
import type { PlayerEquipment } from '~/types'

const { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8 } = storeToRefs(usePlayerSlot())

const equipShow = ref(false)
const equipSelected = ref({})

const openDetail = (slot: PlayerEquipment) => {
  equipSelected.value = slot
  equipShow.value = true
}
</script>

<template>
  <var-popup v-model:show="equipShow" position="center">
    <BagEquipDetail
      :action="true"
      :item="equipSelected"
    />
  </var-popup>
  <div class="h-full flex items-center justify-center">
    <div class="grid grid-cols-2 gap-10 mb-2">
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot1?.preview }">
        <nuxt-img v-if="!slot1" format="webp" class="w-[60px] h-[55px]" src="/equipment/vukhi.png" />
        <item-rank
          v-else format="webp" class="w-[55px] h-[55px]"
          :quantity="0" :rank="slot1.rank"
          :preview="slot1?.preview"
          @click="openDetail(slot1)"
        />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot2?.preview }">
        <nuxt-img v-if="!slot2" format="webp" class="w-[60px] h-[55px]" src="/equipment/ngocboi.png" />
        <item-rank
          v-else
          format="webp"
          class="w-[55px] h-[55px]"
          :quantity="0"
          :rank="slot2?.rank"
          :preview="slot2?.preview"
          @click="openDetail(slot2)"
        />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot3?.preview }">
        <nuxt-img v-if="!slot3" format="webp" class="w-[60px] h-[55px]" src="/equipment/giap.png" />
        <item-rank
          v-else
          format="webp"
          class="w-[55px] h-[55px]"
          :quantity="0"
          :rank="slot3?.rank"
          :preview="slot3?.preview"
          @click="openDetail(slot3)"
        />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot4?.preview }">
        <nuxt-img v-if="!slot4" format="webp" class="w-[60px] h-[55px]" src="/equipment/baotay.png" />
        <item-rank
          v-else
          format="webp"
          class="w-[55px] h-[55px]"
          :quantity="0"
          :rank="slot4.rank"
          :preview="slot4?.preview"
          @click="openDetail(slot4)"
        />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot5?.preview }">
        <nuxt-img v-if="!slot5" format="webp" class="w-[60px] h-[55px]" src="/equipment/rinh.png" />
        <item-rank
          v-else
          format="webp"
          class="w-[55px] h-[55px]"
          :quantity="0"
          :rank="slot5.rank"
          :preview="slot5?.preview"
          @click="openDetail(slot5)"
        />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot6?.preview }">
        <nuxt-img v-if="!slot6" format="webp" class="w-[60px] h-[55px]" src="/equipment/giay.png" />
        <item-rank
          v-else
          format="webp"
          class="w-[55px] h-[55px]"
          :quantity="0"
          :rank="slot6.rank"
          :preview="slot6?.preview"
          @click="openDetail(slot6)"
        />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot7?.preview }">
        <nuxt-img v-if="!slot7" format="webp" class="w-[60px] h-[55px]" src="/equipment/ngoc.png" />
        <item-rank
          v-else
          format="webp"
          class="w-[55px] h-[55px]"
          :quantity="0"
          :rank="slot7.rank"
          :preview="slot7?.preview"
          @click="openDetail(slot7)"
        />
      </div>
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot8?.preview }">
        <nuxt-img v-if="!slot8" format="webp" class="w-[60px] h-[55px]" src="/equipment/mu.png" />
        <item-rank
          v-else
          format="webp"
          class="w-[55px] h-[55px]"
          :quantity="0"
          :rank="slot8.rank"
          :preview="slot8?.preview"
          @click="openDetail(slot8)"
        />
      </div>
    </div>
  </div>
</template>
