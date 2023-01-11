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
  <Blocker class="duration-500 transition-colors transition-opacity z-99">
    <div ref="target" class="bg-black/70 text-white w-full h-[70%]">
      <div class="h-full">
        <div class="flex items-center justify-center w-full">
          <div
            v-for="t in tabs"
            :key="t.key"
            class="bg-[#455875] font-semibold rounded m-2 p-1"
            :class="{ 'bg-[#375c99]': currentTab === t.key }" @click="currentTab = t.key"
          >
            {{ t.name }}
          </div>
        </div>
        <div
          class="m-3 rounded-md pt-2 text-12 font-semibold h-[calc(100%_-_60px)]"
        >
          <PlayerAttributeTab v-if="currentTab === 'attribute'" />
          <PlayerEquipTab v-if="currentTab === 'equipment'" />
          <PlayerTupo v-if="currentTab === 'tupo'" />
        </div>
      </div>
    </div>
  </Blocker>
</template>
