<script setup lang="ts">
const { data: storeItems } = useFetch('/api/store')
const typeTab = ref<string>('coin')
const typeTabItems = [
  {
    key: 'coin',
    name: 'Tiên ngọc',
  },
  {
    key: 'knb',
    name: 'Tiên duyên',
  },
  {
    key: 'scoreTienDau',
    name: 'Shop Tiên Đấu',
  },
  {
    key: 'gold',
    name: 'Tiền tiên',
  },
]

const storeItemType = computed(() => {
  if (!storeItems.value)
    return []

  return storeItems.value.filter((s: any) => s.currency === typeTab.value)
})
</script>

<template>
  <div
    p="2"
    h="full"
  >
    <button
      v-for="n in typeTabItems"
      :key="n.key"
      :class="{ '!opacity-100': n.key === typeTab }"
      transition="~ opacity duration-800"
      m="x-2 y-2"
      p="x-2"
      h="8"
      font="italic bold leading-3"
      opacity="40"
      border="rounded 1 white/40"
      text="primary"
      @click.stop="typeTab = n.key"
    >
      {{ n.name }}
    </button>
    <div
      class="h-[calc(100%_-_45px)]"
      overflow="auto"
      p="x-2"
    >
      <div class="grid grid-cols-3 gap-2">
        <lazy-store-item
          v-for="(storeItem, index) in storeItemType"
          :key="index"
          :store-item="storeItem"
        />
      </div>
    </div>
  </div>
</template>
