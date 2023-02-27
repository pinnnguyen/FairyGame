<script setup lang="ts">
import { BossDaily, BossElite, BossFrameTime } from '#components'
const emits = defineEmits(['close'])
const tab = ref('daily')

const tabItems = [
  {
    key: 'daily',
    name: 'Hằng ngày',
  },
  {
    key: 'elite',
    name: 'Dã ngoại',
  },
  {
    key: 'frameTime',
    name: 'Thế giới',
  },
]

const dynamicComponents = computed(() => {
  if (tab.value === 'elite')
    return BossElite

  if (tab.value === 'frameTime')
    return BossFrameTime

  return BossDaily
})
</script>

<template>
  <div class="p-2">
    <button
      v-for="tabItem in tabItems"
      :key="tabItem.key"
      :class="{ '!opacity-100 !text-[#4add3b]': tab === tabItem.key }"
      transition="~ opacity duration-800"
      m="x-2"
      w="16"
      h="8"
      font="italic bold leading-3"
      opacity="40"
      border="rounded 1 white/40"
      text="primary"
      @click="tab = tabItem.key"
    >
      {{ tabItem.name }}
    </button>
  </div>
  <div class="h-[calc(100%_-_47px)] overflow-scroll">
    <component :is="dynamicComponents" />
  </div>
</template>
