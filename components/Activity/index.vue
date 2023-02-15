<script setup lang="ts">
const typeTab = ref<'auction' | 'tien_dau'>('tien_dau')
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

const isAuction = computed(() => typeTab.value === 'auction')
const isTienDau = computed(() => typeTab.value === 'tien_dau')
</script>

<template>
  <div
    p="2"
  >
    <button
      v-for="n in typeTabItems"
      :key="n.key"
      :class="{ '!opacity-100': n.key === typeTab }"
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
    <ActivityAuciton v-if="isAuction" />
    <ActivityTienDau v-if="isTienDau" />
  </div>
</template>
