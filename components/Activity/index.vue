<script setup lang="ts">
import { ActivityAuciton, ActivityTienDau } from '#components'

const typeTab = ref('tien_dau')
const typeTabItems = [
  {
    key: 'tien_dau',
    name: 'Tiên đấu',
  },
  {
    key: 'auction',
    name: 'Đấu giá',
  },
]

const component = computed(() => {
  if (typeTab.value === 'auction')
    return ActivityAuciton

  return ActivityTienDau
})
</script>

<template>
  <div
    p="2"
  >
    <button
      v-for="n in typeTabItems"
      :key="n.key"
      :class="{ '!opacity-100 !text-[#4add3b]': n.key === typeTab }"
      transition="~ opacity duration-800"
      m="x-2"
      w="16"
      h="8"
      font="italic bold leading-3"
      opacity="40"
      border="rounded 1 white/40"
      text="primary"
      @click.stop="typeTab = n.key"
    >
      {{ n.name }}
    </button>
  </div>
  <div class="h-[calc(100%_-_47px)] overflow-scroll">
    <component :is="component" />
  </div>
</template>
