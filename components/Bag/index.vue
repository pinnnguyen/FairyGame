<script setup lang="ts">
const emits = defineEmits(['close'])
const currentTab = ref<'equip' | 'gem' | 'item'>('item')
const tabItems = [
  {
    key: 'item',
    name: 'Vật Phẩm',
  },
  {
    key: 'equip',
    name: 'Trang Bị',
  },
  {
    key: 'gem',
    name: 'Đá Hồn',
  },
]
</script>

<template>
  <div class="relative flex items-center justify-center h-full">
    <div class="absolute top-0 flex items-start w-full p-2">
      <button
        v-for="tabItem in tabItems"
        :key="tabItem.key"
        :class="{
          '!opacity-100': currentTab === tabItem.key,
        }"
        class="transition opacity-40 transition-opacity duration-800 mx-2 w-16 h-8 leading-3 italic shadow rounded font-bold border-1 text-primary border-white/40"
        @click.stop="currentTab = tabItem.key"
      >
        {{ tabItem.name }}
      </button>
    </div>

    <div class="absolute top-10 w-full flex flex-col items-center p-4 h-[calc(100%_-_47px)] overflow-auto">
      <BagEquipments v-if="currentTab === 'equip' " />
      <BagItems v-if="currentTab === 'item' " />
      <BagGems v-if="currentTab === 'gem' " />
    </div>
  </div>
</template>
