<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useAppStore, usePlayerStore } from '#imports'
import { sendMessage } from '~/composables/useMessage'

const { playerInfoComponent } = storeToRefs(useAppStore())
const { playerInfo } = storeToRefs(usePlayerStore())

const toggle = reactive<Record<string, boolean>>({
  bag: false,
  tienDe: false,
  figure: false,
  tienPhap: false,
  ren: false,
  tienLinh: false,
})

const needTimeResource = ref(0)
const doReFetch = ref(false)

onMounted(() => {
  useIntervalFn(() => {
    if (doReFetch.value)
      doReFetch.value = false
    needTimeResource.value += 1
    if (needTimeResource.value >= 100) {
      doReFetch.value = true
      needTimeResource.value = 0
    }
  }, 800)
})

watch(doReFetch, async (value) => {
  if (value) {
    const resources = await $fetch('/api/reward/training', {
      headers: (useRequestHeaders(['cookie']) as any),
    })

    sendMessage(`+${resources.exp} XP`)
    sendMessage(`+${resources.gold} VÀNG`)

    if (playerInfo.value) {
      playerInfo.value.exp += resources.exp
      playerInfo.value.gold += resources.gold
    }
  }
})

const onToggle = (key: string) => {
  toggle[key] = true
}

const close = (key: string) => {
  toggle[key] = false
}
</script>

<template>
  <div class="h-[calc(100vh_-_230px)] bg-white">
    <Upgrade v-if="toggle.upgrade" @close="close('upgrade')" />
    <Bag v-if="toggle.bag" @close="close('bag')" />
    <div class="flex justify-around w-full absolute top-[10px] pl-1 text-white">
      <div class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">
        <NuxtImg class="w-[50px]" src="/index/bag.png" @click.stop="onToggle('bag')" />
        <span class="text-black whitespace-nowrap text-12">Túi</span>
      </div>
      <div class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">
        <NuxtImg class="w-[50px]" src="/index/info.png" @click.stop="playerInfoComponent = true" />
        <span class="text-black whitespace-nowrap text-12">Kỹ năng</span>
      </div>
      <div class="items-center justify-center flex flex-col w-[50px] mb-3">
        <NuxtImg class="w-[50px]" src="/index/store.png" />
        <span class="text-black whitespace-nowrap text-12">Cửa hàng</span>
      </div>
      <NuxtLink to="/battle" class="flex flex-col items-center justify-center w-[50px] mb-3" @click.stop="onToggle('upgrade')">
        <NuxtImg class="w-[50px]" src="/index/dungeo.png" />
        <span class="text-black whitespace-nowrap text-12">Vượt ải</span>
      </NuxtLink>
    </div>
    <div class="absolute bottom-0 text-center w-full flex justify-center flex-col items-center text-white">
      <div class="flex items-center justify-around w-full mb-4">
        <div class="flex items-center jsutify-center flex-col">
          <div class="diamond bg-[#4881bf] w-[30px] h-[30px]" />
          <span class="whitespace-nowrap text-12 text-black/70 mt-1">Công pháp</span>
        </div>
        <div class="flex items-center jsutify-center flex-col">
          <div class="diamond bg-[#4881bf] w-[30px] h-[30px]" />
          <span class="whitespace-nowrap text-12 text-black/70 mt-1">Phi thăng</span>
        </div>
        <div class="flex items-center jsutify-center flex-col">
          <div class="diamond bg-[#4881bf] w-[30px] h-[30px]" />
          <span class="whitespace-nowrap text-12 text-black/70 mt-1">Tông môn</span>
        </div>
        <div class="flex items-center jsutify-center flex-col">
          <div class="diamond bg-[#4881bf] w-[30px] h-[30px]" />
          <span class="whitespace-nowrap text-12 text-black/70 mt-1">Thành tích</span>
        </div>
        <div class="flex items-center jsutify-center flex-col">
          <div class="diamond bg-[#4881bf] w-[30px] h-[30px]" />
          <span class="whitespace-nowrap text-12 text-black/70 mt-1">Cài đặt</span>
        </div>
      </div>
      <div class="h-12 w-full flex justify-around items-center bg-[#1d3a62]">
        <NuxtImg class="w-[45px]" src="/index/avatar-bottom.png" />
        <div class="w-[60%] bg-gray-200 rounded-full h-1 dark:bg-gray-700">
          <div class="bg-blue-600 h-1 rounded-full duration-700" :style="{ width: `${needTimeResource}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>
