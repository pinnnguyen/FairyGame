<script setup>
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
</script>

<template>
  <div class="p-2">
    <button
      v-for="tabItem in tabItems"
      :key="tabItem.key"
      :class="{ '!opacity-100': tab === tabItem.key }"
      class="transition opacity-40 transition-opacity duration-800 mx-2 w-16 h-8 leading-3 italic shadow rounded font-bold border-1 text-primary border-white/40"
      @click="tab = tabItem.key"
    >
      {{ tabItem.name }}
    </button>
  </div>
  <div class="h-[calc(100%_-_47px)] overflow-scroll">
    <template
      v-if="tab === 'elite'"
    >
      <lazy-boss-elite />
    </template>
    <template
      v-if="tab === 'daily'"
    >
      <lazy-boss-daily />
    </template>
    <template
      v-if="tab === 'frameTime'"
    >
      <lazy-boss-frame-time />
    </template>
  </div>
</template>
