<script setup lang="ts">
import { set } from '@vueuse/core'
import { useFetch } from '#app'
import type { Bag, Item, PlayerEquipment } from '~/types'

const emits = defineEmits(['close'])
const equipItemSelected = ref<PlayerEquipment>()
const selectedItem = ref<Item>()

const currentTab = ref('item')
const isEquipTab = computed(() => currentTab.value === 'equip')

const { data: bagDataResponse } = await useFetch<Bag>('/api/bag', {
  headers: (useRequestHeaders(['cookie']) as any),
})

const toggleItemTab = ref(false)
const toggleEquipTab = ref(false)
const pickEquipItem = (item: PlayerEquipment) => {
  set(equipItemSelected, item)
  set(toggleEquipTab, true)
}

const pickItem = (item: Item) => {
  set(selectedItem, item)
  set(toggleItemTab, true)
}

const goToHome = () => {
  emits('close')
}

const callBackUseItem = () => {

}
</script>

<template>
  <var-popup v-model:show="toggleEquipTab" position="center">
    <LazyBagEquipDetail
      :item="equipItemSelected"
      :action="true"
    />
  </var-popup>
  <var-popup v-model:show="toggleItemTab" position="center">
    <LazyBagItemDetail
      :item-id="selectedItem?.itemId"
      :kind="selectedItem?.info?.kind"
      :rank="selectedItem?.info?.rank"
      :preview="selectedItem?.info?.preview"
      :name="selectedItem?.info?.name"
      :info="selectedItem?.info?.info"
    />
  </var-popup>
  <div class="w-[calc(100vw_-_30px)] h-[75vh]">
    <div class="w-full h-full relative flex items-center justify-center">
      <span class="font-semibold text-12 absolute w-[40px] left-[calc(50%_-_10px)] top-[1px] text-[#656f99]">TÚI</span>
      <nuxt-img class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
      <div class="absolute top-[30px] w-[90%] h-[90%] flex flex-col items-center w-full">
        <div v-if="bagDataResponse?.equipments?.length > 0 && isEquipTab" class="grid-cols-5 grid gap-2 overflow-auto max-h-[90%] scrollbar-hide">
          <lazy-item-rank
            v-for="equipment in bagDataResponse?.equipments" :key="equipment?.id"
            :preview="equipment?.preview"
            :rank="equipment?.rank"
            :quantity="0"
            class="w-12"
            @click.stop="pickEquipItem(equipment)"
          >
            <p class="text-10 font-semibold line-clamp-2">
              {{ equipment?.name }}
            </p>
          </lazy-item-rank>
        </div>
        <div v-if="bagDataResponse?.items.length > 0 && !isEquipTab" class="grid-cols-5 grid gap-2 overflow-auto max-h-[90%]">
          <lazy-item-rank
            v-for="item in bagDataResponse?.items" :key="item.id"
            :preview="item.info.preview"
            :rank="item.info.rank"
            :quantity="item.sum"
            class="w-12"
            @click.stop="pickItem(item)"
          >
            <p class="text-10 font-semibold line-clamp-2">
              {{ item?.info.name }}
            </p>
          </lazy-item-rank>
        </div>
        <div class="absolute bottom-0 flex items-start w-full pl-4 pb-2">
          <button
            :class="{
              'opacity-50': isEquipTab,
            }"
            class="bg-[#6e7fa7] mx-1 p-1 text-12" @click="currentTab = 'item'"
          >
            Vật phẩm
          </button>
          <button
            :class="{
              'opacity-50': !isEquipTab,
            }"
            class="bg-[#6e7fa7] mx-1 p-1 text-12" @click="currentTab = 'equip'"
          >
            Trang bị
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
