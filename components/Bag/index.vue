<script setup lang="ts">
import { set } from '@vueuse/core'
import { useFetch } from '#app'
import type { Bag, Item, PlayerEquipment, PlayerGem } from '~/types'

const emits = defineEmits(['close'])
const currentTab = ref<'equip' | 'gem' | 'item'>('item')

// const { data: bagDataResponse, pending, refresh } = await useFetch<Bag>('/api/bag', {
//   headers: (useRequestHeaders(['cookie']) as any),
// })

// const { data: gems, refresh: refreshGems } = await useFetch('/api/gem')
// const onchangeEquip = () => {
//   refresh()
// }

// const onmergeGems = () => {
//   refreshGems()
//   set(showGemDetail, false)
// }

// const pickItem = (item: Item) => {
//   set(selectedItem, item)
//   set(showItemDetail, true)
// }
</script>

<template>
  <div class="w-[calc(100vw_-_20px)] h-[75vh]">
    <div class="w-full h-full relative flex items-center justify-center">
      <span class="font-bold text-14 absolute w-[40px] left-[calc(50%_-_10px)] top-[4px] text-[#656f99]">TÚI</span>
      <nuxt-img class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
      <div class="absolute top-[30px] w-[90%] h-[93%] flex flex-col items-center w-full">
        <template v-if="currentTab === 'equip' ">
          <BagEquipments />
        </template>
        <template v-if="currentTab === 'item' ">
          <BagItems />
        </template>
        <template v-if="currentTab === 'gem' ">
          <BagGems />
        </template>
        <div class="absolute bottom-0 flex items-start w-full pl-4 py-2">
          <button
            :class="{
              'opacity-50': currentTab !== 'item',
            }"
            class="transition transition-opacity bg-[#41466e] text-white px-4 m-2 p-1 text-12" @click="currentTab = 'item'"
          >
            Vật phẩm
          </button>
          <button
            :class="{
              'opacity-50': currentTab !== 'equip',
            }"
            class="transition transition-opacity bg-[#41466e] text-white px-4 m-2 p-1 text-12" @click="currentTab = 'equip'"
          >
            Trang bị
          </button>
          <button
            :class="{
              'opacity-50': currentTab !== 'gem',
            }"
            class="transition transition-opacity bg-[#41466e] text-white px-4 m-2 p-1 text-12" @click="currentTab = 'gem'"
          >
            Đá hồn
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
