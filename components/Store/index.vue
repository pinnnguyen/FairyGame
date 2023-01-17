<script setup lang="ts">
const { data: storeItems } = await useFetch('/api/store')
</script>

<template>
  <div class="relative w-[calc(100vw_-_30px)] h-[75vh]">
    <nuxt-img format="webp" class="absolute w-full h-full" src="/common/panel_common_bg1.png" />
    <p class="absolute top-0 left-[calc(50%_-_50px)] flex justify-center w-[100px] text-[#ad3a36] font-semibold">
      Cửa hàng
    </p>
    <div class="absolute w-full h-full flex justify-center">
      <div class="w-[84%] h-[95%] overflow-auto">
        <div class="grid grid-cols-2 m-auto mt-10 gap-2">
          <LazyStoreItem
            v-for="(storeItem, index) in storeItems"
            :key="index"
            :store-item="storeItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>
