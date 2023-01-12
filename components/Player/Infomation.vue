<script setup>
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'
import { useAppStore } from '~/composables/app'

const { playerInfoComponent } = storeToRefs(useAppStore())
const currentTab = ref('attribute')
const target = ref(null)
onClickOutside(target, () => playerInfoComponent.value = false)

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
  <Blocker class="duration-500 transition-colors transition-opacity z-999">
    <div ref="target" class="bg-[#1d160e] border border-[#926633] rounded shadow-md text-white w-full h-[80%]">
      <div class="h-full">
        <div class="flex items-center justify-center w-full">
          <div
            v-for="t in tabs"
            :key="t.key"
            class="transition transition-opacity bg-[#8c6333] opacity-40 rounded m-2 p-1"
            :class="{ '!opacity-100': currentTab === t.key }" @click="currentTab = t.key"
          >
            {{ t.name }}
          </div>
        </div>
        <div
          class="m-1 rounded-md pt-2 text-12 font-semibold h-[calc(100%_-_60px)]"
        >
          <PlayerAttributeTab v-if="currentTab === 'attribute'" />
          <PlayerEquipTab v-if="currentTab === 'equipment'" />
          <PlayerTupo v-if="currentTab === 'tupo'" />
        </div>
      </div>
    </div>
  </Blocker>
</template>
