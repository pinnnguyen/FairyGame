<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const emits = defineEmits(['close'])
const target = ref(null)
onClickOutside(target, () => emits('close'))
const { data: storeItems } = await useFetch('/api/store')
</script>

<template>
  <Blocker class="z-99">
    <div ref="target" class="relative w-[95%] h-[80%]">
      <NuxtImg format="webp" class="absolute" src="/common/panel_common_bg1.png" />
      <p class="absolute top-0 left-[calc(50%_-_50px)] w-[100px] text-[#ad3a36] font-semibold">
        Cửa hàng
      </p>
      <div class="absolute w-full h-full flex justify-center">
        <div class="w-[84%] h-[70%] overflow-auto">
          <div class="grid grid-cols-2 m-auto mt-10 gap-2">
            <StoreItem
              v-for="(storeItem, index) in storeItems"
              :key="index"
              :store-item="storeItem"
            />
          </div>
        </div>
      </div>
    </div>
  </Blocker>
</template>
