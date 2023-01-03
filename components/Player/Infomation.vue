<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/composables/app'

const { playerInfoComponent } = storeToRefs(useAppStore())
const currentTab = ref('attribute')

const tabs = ref([
  {
    key: 'equipment',
    name: 'Trang bị',
  },
  {
    key: 'attribute',
    name: 'Thuộc tính',
  },
  {
    key: 'tupo',
    name: 'Đột phá',
  },
])
</script>

<template>
  <div class="bg-[#475181] text-white w-full z-99 duration-500 absolute bottom-0 h-[70%]">
    <div class="h-full">
      <div class="absolute top-[-25px] flex items-center justify-center w-full">
        <div
          v-for="t in tabs"
          :key="t.key"
          class="bg-[#455875] m-2 p-1"
          :class="{ 'bg-[#375c99]': currentTab === t.key }" @click="currentTab = t.key"
        >
          {{ t.name }}
        </div>
      </div>
      <div
        class="m-3 rounded-md pt-2 text-12 h-[calc(100%_-_60px)]"
      >
        <PlayerAttributeTab v-if="currentTab === 'attribute'" />
        <PlayerEquipTab v-if="currentTab === 'equipment'" />
        <PlayerTupo v-if="currentTab === 'tupo'" />
      </div>
      <div class="w-full flex justify-center">
        <ButtonConfirm @click.stop="playerInfoComponent = false">
          <span class="z-9">Đóng</span>
        </ButtonConfirm>
      </div>
    </div>
  </div>
</template>
