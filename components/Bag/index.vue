<script setup lang="ts">
import { set } from '@vueuse/core'
import { useFetch } from '#app'
import type { Bag, Item, PlayerEquipment, PlayerGem } from '~/types'

const emits = defineEmits(['close'])
const equipItemSelected = ref<PlayerEquipment>()

const gemSelected = ref<PlayerGem>()
const selectedItem = ref<Item>()

const currentTab = ref('item')

const { data: bagDataResponse, pending, refresh } = await useFetch<Bag>('/api/bag', {
  headers: (useRequestHeaders(['cookie']) as any),
})

const { data: gems, refresh: refreshGems } = await useFetch('/api/gem')

const showItemDetail = ref(false)
const showEquipmentDetail = ref(false)
const showGemDetail = ref(false)
const pickEquipItem = (item: PlayerEquipment) => {
  set(equipItemSelected, item)
  set(showEquipmentDetail, true)
}

const pickGemItem = (gem: PlayerGem) => {
  set(gemSelected, gem)
  set(showGemDetail, true)
}

const onchangeEquip = () => {
  refresh()
}

const onmergeGems = () => {
  refreshGems()
  set(showGemDetail, false)
}

const pickItem = (item: Item) => {
  set(selectedItem, item)
  set(showItemDetail, true)
}
</script>

<template>
  <var-popup v-model:show="showGemDetail" position="center">
    <lazy-bag-gem-detail
      :gem="gemSelected"
      @mergegem="onmergeGems"
    />
  </var-popup>
  <var-popup v-model:show="showEquipmentDetail" position="center">
    <lazy-bag-equip-detail
      :item="equipItemSelected"
      :action="true"
      @changeEquip="onchangeEquip"
    />
  </var-popup>
  <var-popup v-model:show="showItemDetail" position="center">
    <lazy-bag-item-detail
      :item-id="selectedItem?.itemId"
      :kind="selectedItem?.info?.kind"
      :rank="selectedItem?.info?.rank"
      :preview="selectedItem?.info?.preview"
      :quality="selectedItem?.info?.rank"
      :name="selectedItem?.info?.name"
      :info="selectedItem?.info?.info"
    />
  </var-popup>
  <var-loading :loading="pending" color="#333" description="Đang tải...">
    <div class="w-[calc(100vw_-_20px)] h-[75vh]">
      <div class="w-full h-full relative flex items-center justify-center">
        <span class="font-bold text-14 absolute w-[40px] left-[calc(50%_-_10px)] top-[4px] text-[#656f99]">TÚI</span>
        <nuxt-img class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
        <div class="absolute top-[30px] w-[90%] h-[93%] flex flex-col items-center w-full">
          <div
            v-if="bagDataResponse?.equipments?.length > 0 && currentTab === 'equip' "
            class="grid-cols-6 grid gap-1 overflow-auto max-h-[88%] scrollbar-hide"
          >
            <lazy-item-rank
              v-for="equipment in bagDataResponse?.equipments" :key="equipment?.id"
              :preview="equipment?.preview"
              :rank="equipment?.rank"
              :quality="equipment.quality"
              :quantity="0"
              class="w-12"
              @click.stop="pickEquipItem(equipment)"
            >
              <p class="text-10 font-semibold line-clamp-1">
                {{ equipment?.name }}
              </p>
            </lazy-item-rank>
          </div>
          <div
            v-if="bagDataResponse?.items.length > 0 && currentTab === 'item' "
            class="grid-cols-6 grid gap-1 overflow-auto max-h-[88%] scrollbar-hide"
          >
            <lazy-item-rank
              v-for="item in bagDataResponse?.items" :key="item.id"
              :preview="item.info.preview"
              :rank="item.info.rank"
              :quantity="item.sum"
              :quality="item.info.rank"
              class="w-12"
              @click.stop="pickItem(item)"
            >
              <p class="text-10 font-semibold line-clamp-1">
                {{ item?.info.name }}
              </p>
            </lazy-item-rank>
          </div>
          <div
            v-if="currentTab === 'gem' "
            class="grid-cols-6 grid gap-1 overflow-auto max-h-[88%] scrollbar-hide"
          >
            <lazy-item-rank
              v-for="item in gems" :key="item.id"
              preview="/gem/default.png"
              :quantity="item.sum"
              :quality="item.quality"
              class="w-12"
              @click.stop="pickGemItem(item)"
            >
              <p class="text-10 font-semibold line-clamp-1">
                {{ item?.name }}
              </p>
            </lazy-item-rank>
          </div>
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
  </var-loading>
</template>
