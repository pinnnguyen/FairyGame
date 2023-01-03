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

    sendMessage(`+${resources.exp} XP`, 1500)
    sendMessage(`+${resources.gold} Linh thạch`, 2000)

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
  <div>
    <Upgrade v-if="toggle.upgrade" @close="close('upgrade')" />
    <Bag v-if="toggle.bag" @close="close('bag')" />
    <NuxtImg src="/center/bg-home.png" class="w-full h-[300px] object-cover" />
    <div class="flex flex-col absolute top-[10px] pl-1 text-white">
      <div class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">
        <NuxtImg class="w-[35px]" src="/bottom/bottom-3.png" @click.stop="playerInfoComponent = true" />
      </div>
      <div class="items-center justify-center flex flex-col w-[50px] mb-3">
        <NuxtImg class="w-[35px]" src="/bottom/bottom-2.png" />
      </div>
      <div class="flex flex-col items-center justify-center w-[50px] mb-3" @click.stop="onToggle('upgrade')">
        <NuxtImg class="w-[35px]" src="/bottom/bottom-4.png" />
      </div>
    </div>
    <div class="absolute top-[10px] right-2 flex flex-col">
      <div class="text-white flex-col flex items-center mb-3">
        <NuxtImg class="w-[35px]" src="/bottom/bottom-6.png" @click.stop="onToggle('bag')" />
      </div>
      <div class="text-white flex-col flex items-center mb-3">
        <NuxtImg class="w-[35px]" src="/bottom/bottom-5.png" />
      </div>
      <div class="text-white flex-col flex items-center mb-3">
        <NuxtImg class="w-[35px]" src="/bottom/bottom-7.png" />
      </div>
    </div>
    <div class="absolute bottom-[25px] text-center w-full flex justify-center flex-col items-center text-white">
      <div class="w-[60%] bg-gray-200 rounded-full h-1 dark:bg-gray-700">
        <div class="bg-blue-600 h-1 rounded-full duration-700" :style="{ width: `${needTimeResource}%` }" />
      </div>
    </div>
  </div>
</template>
