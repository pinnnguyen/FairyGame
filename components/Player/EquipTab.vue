<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerSlot, usePlayerStore } from '#imports'
import type { PlayerEquipment } from '~/types'
import { ROLE_IMG, ROLE_NAME } from '~/constants'
import { formatCash } from '~/common'

const { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8 } = storeToRefs(usePlayerSlot())
const { playerInfo } = usePlayerStore()

const equipShow = ref(false)
const equipSelected = ref({})

const playerClassIMG = computed(() => {
  if (!playerInfo?.class)
    return ''

  return ROLE_IMG[playerInfo.class]
})

const classListColor: Record<number, string> = {
  1: '#75cd52',
  2: '#b257a0',
  3: '#2f94fa',
  4: '#7788e8',
}

const classTitle = computed(() => ROLE_NAME[playerInfo!.class])
const classColor = computed(() => classListColor[playerInfo!.class])

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
  <div class="justify-between flex items-center mx-4 my-2">
    <div class="flex items-center">
      <nuxt-img class="h-[50px] mr-2" format="webp" src="/pve/player-avatar.png" />
      <div class="flex flex-col items-start">
        <div>
          Tên: {{ playerInfo?.name }}
        </div>
        <div>
          Cảnh giới: {{ playerInfo?.levelTitle }} {{ playerInfo?.floor }}
        </div>
        <div>
          Đẳng cấp: {{ playerInfo?.level }}
        </div>
      </div>
    </div>
    <!--          <a style="background: radial-gradient(black, transparent);" class="text-white giftcode" href="?cmd=Yc2x1pkhPpWR1aWh1YW4mc2lkPTQ3MTRjMmE2NDNmOTQwMTY3NWE5YjY0OTFhZDJiOGQ4">Giftcode</a> -->
  </div>
  <div class="flex flex-col mx-4">
    <span class="">
      Hệ: <span :class="`bg-[${classColor}]`">{{ classTitle }}</span>
    </span>
    <span class=" ">
      Tu vị: {{ formatCash((playerInfo?.exp)) }}
    </span>
    <span class="">
      Tiên ngọc: {{ Math.round(playerInfo.coin) }}
    </span>
    <span class="">
      KNB: {{ Math.round(playerInfo.knb) ?? 0 }}
    </span>
    <span class="">
      Vàng: {{ formatCash(playerInfo.gold) }}
    </span>
  </div>
  <div class="h-full flex items-center justify-around h-[70%]">
    <div class="flex flex-col gap-2">
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot1?.preview }">
        <nuxt-img v-if="!slot1" format="webp" class="w-[60px] h-[55px]" src="/equipment/vukhi.png" />
        <item-rank
          v-else format="webp" class="w-[55px] h-[55px]"
          :quantity="0"
          :quality="slot1.quality"
          :rank="slot1.rank"
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
          :quality="slot2.quality"
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
          :quality="slot3.quality"
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
          :quality="slot4.quality"
          :rank="slot4.rank"
          :preview="slot4?.preview"
          @click="openDetail(slot4)"
        />
      </div>
    </div>
    <nuxt-img
      :src="playerClassIMG"
      format="webp"
      class="w-40"
    />
    <div class="flex flex-col gap-2">
      <div class="relative" :class="{ 'bg-iconbg_3 bg-contain bg-no-repeat': slot5?.preview }">
        <nuxt-img v-if="!slot5" format="webp" class="w-[60px] h-[55px]" src="/equipment/rinh.png" />
        <item-rank
          v-else
          format="webp"
          class="w-[55px] h-[55px]"
          :quantity="0"
          :quality="slot5.quality"
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
          :quality="slot6.quality"
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
          :quality="slot7.quality"
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
          :quality="slot8.quality"
          :rank="slot8.rank"
          :preview="slot8?.preview"
          @click="openDetail(slot8)"
        />
      </div>
    </div>
  </div>
</template>
