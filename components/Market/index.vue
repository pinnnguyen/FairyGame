<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { startTimeEvent, timeOffset } from '~/common'
import type { AuctionItem } from '~/types'
import { sendMessage, usePlayerStore } from '#imports'

const emits = defineEmits(['close'])
const { sid } = storeToRefs(usePlayerStore())

const now = new Date().getTime()
const { $io } = useNuxtApp()
const tab = ref('market')
const tabItems = [
  {
    key: 'market',
    name: 'Chợ',
  },
  {
    key: 'auction',
    name: 'Đấu giá',
  },
]

const typeTab = ref('equipment')
const typeTabItems = [
  {
    key: 'item',
    name: 'Vật phẩm',
  },
  {
    key: 'equipment',
    name: 'Trang bị',
  },
  {
    key: 'gem',
    name: 'Đá hồn',
  },
]

const { data: marketItems } = await useFetch('/api/market')
// const gems = computed(() => {
//   if (!marketItems.value)
//     return []
//
//   return marketItems.value.filter((m: { type: string }) => {
//     return m.type === 'gem'
//   })
// })
//
// const items = computed(() => {
//   if (!marketItems.value)
//     return []
//
//   return marketItems.value.filter((m: { type: string }) => {
//     return m.type === 'item'
//   })
// })

const markets = computed(() => {
  if (!marketItems.value)
    return []

  return marketItems.value.filter((m: { type: string }) => {
    return m.type === typeTab.value
  })
})
</script>

<template>
  <div class="relative w-[calc(100vw_-_30px)] h-[75vh]">
    <nuxt-img format="webp" class="absolute w-full h-full object-fill" src="/common/panel_common_bg1.png" />
    <!--    <p class="absolute top-[0.3%] left-[calc(50%_-_50px)] flex justify-center w-[100px] text-[#ad3a36] font-semibold"> -->
    <!--      Đấu giá -->
    <!--    </p> -->
    <div v-show="tab === 'market'" class="relative w-full h-full">
      <div class="absolute top-10 left-10 z-9">
        <button
          v-for="n in typeTabItems"
          :key="n.key"
          :class="{ '!opacity-100': n.key === typeTab }"
          class="opacity-50 transition transition-opacity px-2 py-[2px] shadow rounded mr-2 text-12 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]"
          @click.stop="typeTab = n.key"
        >
          {{ n.name }}
        </button>
      </div>
      <MarketGems v-if="typeTab === 'gem'" :gems="markets" />
      <MarketItems v-if="typeTab === 'item'" :items="markets" />
      <MarketEquipments v-if="typeTab === 'equipment'" :equipments="markets" />
    </div>
    <div class="absolute bottom-4 flex items-start w-full pl-4 py-2">
      <button
        v-for="n in tabItems"
        :key="n.key"
        :class="{ '!opacity-100': n.key === tab }"
        class="opacity-50 transition transition-opacity px-2 py-[2px] shadow rounded mr-2 text-12 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]" @click="tab = n.key"
      >
        {{ n.name }}
      </button>
    </div>
  </div>
</template>
