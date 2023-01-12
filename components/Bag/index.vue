<script setup lang="ts">
import { set } from '@vueuse/core'
import { useFetch } from '#app'
import type { Bag, Item, PlayerEquipment } from '~/types'

const emits = defineEmits(['close'])
const toggleDetail = ref(false)
const equipItemSelected = ref<PlayerEquipment>()
const selectedItem = ref<Item>()
const currentTab = ref('item')

const isEquipTab = computed(() => currentTab.value === 'equip')

const { data: bagDataResponse } = await useFetch<Bag>('/api/bag', {
  headers: (useRequestHeaders(['cookie']) as any),
})

const pickEquipItem = (item: PlayerEquipment) => {
  set(equipItemSelected, item)
  set(toggleDetail, true)
}

const pickItem = (item: Item) => {
  set(selectedItem, item)
  set(toggleDetail, true)
  console.log('item', item)
}

const goToHome = () => {
  emits('close')
}
</script>

<template>
  <Teleport to="body">
    <BagEquipDetail v-if="toggleDetail && isEquipTab" :item="equipItemSelected" @close="toggleDetail = false" />
    <BagItemDetail
      v-if="toggleDetail && !isEquipTab"
      :item-id="selectedItem.itemId"
      :kind="selectedItem.kind"
      :rank="selectedItem.rank"
      :preview="selectedItem.preview"
      :name="selectedItem.name"
      :info="selectedItem.info"
      @close="toggleDetail = false"
    />
  </Teleport>
  <div class="flex items-center justify-center w-full h-[calc(100vh_-_30px)] bg-bg_5 bg-cover fixed top-[28px] w-full h-full z-99">
    <div class="w-full h-[80%] absolute top-10">
      <div class="w-full h-full relative">
        <span class="font-semibold absolute w-[40px] left-[calc(50%_-_10px)] top-[-1px] text-[#656f99]">TÚI</span>
        <NuxtImg class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
        <div class="absolute top-[30px] h-[90%] flex flex-col items-center w-full">
          <div v-if="bagDataResponse.equipments.length > 0 && isEquipTab" class="grid-cols-5 grid gap-2 overflow-scroll">
            <LazyItemRank
              v-for="equipment in bagDataResponse.equipments" :key="equipment.id"
              :preview="equipment.preview"
              :rank="equipment.rank"
              :quantity="0"
              class="w-15"
              @click.stop="pickEquipItem(equipment)"
            >
              <p class="text-10 text-[#7c4ea2] font-semibold line-clamp-2">
                {{ equipment?.name }}
              </p>
            </LazyItemRank>
          </div>
          <div v-if="bagDataResponse.items.length > 0 && !isEquipTab" class="grid-cols-5 grid gap-2 overflow-scroll">
            <LazyItemRank
              v-for="item in bagDataResponse.items" :key="item.id"
              :preview="item.preview"
              :rank="item.rank"
              :quantity="item.sum"
              class="w-15"
              @click.stop="pickItem(item)"
            >
              <p class="text-10 text-[#7c4ea2] font-semibold line-clamp-2">
                {{ item?.name }}
              </p>
            </LazyItemRank>
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
    <div class="absolute bottom-0 w-full h-[65px]">
      <div class="w-full h-full relative">
        <NuxtImg class="w-full h-full" src="/common/bg1_common.png" />
      </div>
    </div>
    <div class="absolute bottom-0 flex justify-end w-full h-[65px]" @click="goToHome">
      <NuxtImg class="h-full" src="/bottom/bottom_back.png" />
    </div>
  </div>
</template>
