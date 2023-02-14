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
