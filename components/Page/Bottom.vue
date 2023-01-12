<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { sendMessage, useAppStore, usePlayerStore } from '#imports'

const { playerInfoComponent } = storeToRefs(useAppStore())
const { playerInfo } = storeToRefs(usePlayerStore())

const toggleAuction = useState('toggleAuction')
const toggleStore = useState('toggleStore')

const toggleBag = useState('toggleBag')
const toggleUpgrade = useState('toggleUpgrade')

const active = ref(0)
const isEven = ref(true)

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
    try {
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
    catch (e: any) {
      sendMessage(e.statusMessage)
    }
  }
})
</script>

<template>
  <div class="h-[calc(100vh_-_230px)]">
    <NuxtImg class="h-full object-cover" format="webp" src="/index/bg_bottom.png" />
    <div class="flex justify-around w-full absolute top-[10px] pl-1 text-white">
      <div class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">
        <NuxtImg class="w-[50px]" src="/index/info.png" @click.stop="playerInfoComponent = true" />
        <span class="text-black whitespace-nowrap text-12">Nhân vật</span>
      </div>
      <div class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">
        <NuxtImg class="w-[50px]" src="/index/bag.png" @click.stop="toggleBag = true" />
        <span class="text-black whitespace-nowrap text-12">Túi</span>
      </div>
      <div class="items-center justify-center flex flex-col w-[50px] mb-3">
        <NuxtImg class="w-[50px]" src="/index/store.png" @click.stop="toggleStore = true" />
        <span class="text-black whitespace-nowrap text-12">Cửa hàng</span>
      </div>
      <NuxtLink to="/battle" class="flex flex-col items-center justify-center w-[50px] mb-3">
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
        <div class="flex items-center jsutify-center flex-col" @click="toggleAuction = true">
          <div class="diamond bg-[#4881bf] w-[30px] h-[30px]" />
          <span class="whitespace-nowrap text-12 text-black/70 mt-1">Đấu giá</span>
        </div>
        <div class="flex items-center jsutify-center flex-col">
          <div class="diamond bg-[#4881bf] w-[30px] h-[30px]" />
          <span class="whitespace-nowrap text-12 text-black/70 mt-1">Tông môn</span>
        </div>
        <div class="flex items-center jsutify-center flex-col" @click.stop="toggleUpgrade = true">
          <div class="diamond bg-[#4881bf] w-[30px] h-[30px]" />
          <span class="whitespace-nowrap text-12 text-black/70 mt-1">Nâng cấp</span>
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
        <!--        <var-bottom-navigation -->
        <!--          v-model:active="active" -->
        <!--          class="bottom-navigation-example" -->
        <!--          @fab-click="isEven = !isEven" -->
        <!--        > -->
        <!--          <template #fab> -->
        <!--            <var-icon name="/index/dungeo.png" /> -->
        <!--          </template> -->
        <!--          <var-bottom-navigation-item label="label" icon="home" /> -->
        <!--          <var-bottom-navigation-item v-if="!isEven" label="Vượt ải" icon="account-circle" /> -->
        <!--          <var-bottom-navigation-item label="label" icon="bell" /> -->
        <!--        </var-bottom-navigation> -->
      </div>
    </div>
  </div>
</template>
