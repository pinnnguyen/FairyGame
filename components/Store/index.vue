<script setup lang="ts">
const { data: storeItems } = await useFetch('/api/store')
</script>

<template>
  <div class="h-full w-full overflow-auto scrollbar-hide p-4">
    <div class="grid grid-cols-3 gap-2">
      <LazyStoreItem
        v-for="(storeItem, index) in storeItems"
        :key="index"
        :store-item="storeItem"
      />
    </div>
  </div>
</template>
