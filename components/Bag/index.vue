<script setup lang="ts">
import { onClickOutside, set } from '@vueuse/core'
import { useFetch } from '#app'
import type { Bag, Item, PlayerEquipment } from '~/types'

const emits = defineEmits(['close'])
const toggle = ref(false)
const target = ref(null)

const equipItemSelected = ref<PlayerEquipment>()
const selectedItem = ref<Item>()

const currentTab = ref('item')
const isEquipTab = computed(() => currentTab.value === 'equip')

const { data: bagDataResponse, refresh } = await useFetch<Bag>('/api/bag', {
  headers: (useRequestHeaders(['cookie']) as any),
})

const showEquipTab = computed(() => toggle.value && isEquipTab.value)
const showItemTab = computed(() => toggle.value && !isEquipTab.value)
const pickEquipItem = (item: PlayerEquipment) => {
  set(equipItemSelected, item)
  set(toggle, true)
}

const pickItem = (item: Item) => {
  set(selectedItem, item)
  set(toggle, true)
}

const goToHome = () => {
  emits('close')
}

const callBackUseItem = () => {

}

const changeEquip = (action: 'equip' | 'unequip') => {
  toggle.value = false
  refresh()
}
</script>

<template>
  <var-popup v-model:show="showEquipTab" position="center">
    <BagEquipDetail
      :item="equipItemSelected"
      @changeEquip="changeEquip"
      @close="toggle = false"
    />
  </var-popup>
  <var-popup v-model:show="showItemTab" position="center">
    <BagItemDetail
      :item-id="selectedItem?.itemId"
      :kind="selectedItem?.info?.kind"
      :rank="selectedItem?.info?.rank"
      :preview="selectedItem?.info?.preview"
      :name="selectedItem?.info?.name"
      :info="selectedItem?.info?.info"
      @close="toggle = false"
      @useItem="callBackUseItem"
    />
  </var-popup>
  <Blocker @close="emits('close')">
    <div class="w-[calc(100vw_-_10px)] h-[85vh]">
      <div class="w-full h-full relative flex items-center justify-center">
        <span class="font-semibold absolute w-[40px] left-[calc(50%_-_10px)] top-[-1px] text-[#656f99]">TÚI</span>
        <NuxtImg class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
        <div class="absolute top-[30px] w-[90%] h-[90%] flex flex-col items-center w-full">
          <div v-if="bagDataResponse?.equipments?.length > 0 && isEquipTab" class="grid-cols-6 grid gap-2 overflow-scroll">
            <LazyItemRank
              v-for="equipment in bagDataResponse!.equipments" :key="equipment?.id"
              :preview="equipment?.preview"
              :rank="equipment?.rank"
              :quantity="0"
              class="w-12"
              @click.stop="pickEquipItem(equipment)"
            >
              <p class="text-10 font-semibold line-clamp-2">
                {{ equipment?.name }}
              </p>
            </LazyItemRank>
          </div>
          <div v-if="bagDataResponse?.items.length > 0 && !isEquipTab" class="grid-cols-6 grid gap-2 overflow-scroll">
            <LazyItemRank
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
  </Blocker>
</template>
