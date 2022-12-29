<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import { useAppStore } from '~/composables/app'

const { playerInfoComponent } = storeToRefs(useAppStore())
const toggle = reactive<Record<string, boolean>>({
  bag: false,
  tienDe: false,
  figure: false,
  tienPhap: false,
  ren: false,
  tienLinh: false,
})

const toast = useToast()
const needTimeResource = ref(0)
const doReFetch = ref(false)

onMounted(() => {
  useIntervalFn(() => {
    if (doReFetch.value)
      doReFetch.value = false
    needTimeResource.value += 0.5
    if (needTimeResource.value >= 100) {
      doReFetch.value = true
      needTimeResource.value = 0
    }
  }, 250)
})

watch(doReFetch, async (value) => {
  if (value) {
    const resources = await $fetch('/api/reward/training', {
      headers: (useRequestHeaders(['cookie']) as any),
    })

    toast(`+${resources.exp} XP`, {
      timeout: 2000,
    })

    toast(`+${resources.gold} Linh thạch`, {
      timeout: 3000,
    })
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
  <NuxtImg src="/center/bg-home.jpg" class="w-full h-[300px] object-cover" />
  <div class="flex flex-col absolute top-[10px] text-white">
    <a class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">
      <NuxtImg class="w-[40px]" src="bottom/bottom-3.png" @click.stop="playerInfoComponent = true" />
    </a>
    <a class="items-center justify-center flex flex-col w-[50px] mb-3">
      <NuxtImg class="w-[40px]" src="/bottom/bottom-2.png" />
    </a>
    <a class="flex flex-col items-center justify-center w-[50px] mb-3">
      <NuxtImg class="w-[40px]" src="/bottom/bottom-4.png" />
    </a>
  </div>
  <div class="absolute top-[10px] right-0 flex flex-col">
    <a class="text-white flex-col flex items-center mb-3">
      <NuxtImg class="w-[40px]" src="/bottom/bottom-6.png" @click.stop="navigateTo('/bag')" />
    </a>
    <a class="text-white flex-col flex items-center mb-3">
      <NuxtImg class="w-[40px]" src="/bottom/bottom-5.png" />
    </a>
    <a class="text-white flex-col flex items-center mb-3">
      <NuxtImg class="w-[40px]" src="/bottom/bottom-7.png" />
    </a>
  </div>
  <div class="absolute bottom-[25px] text-center w-full flex justify-center">
    <div class="w-[60%] bg-gray-200 rounded-full h-1 dark:bg-gray-700">
      <div class="bg-blue-600 h-1 rounded-full duration-400" :style="{ width: `${needTimeResource}%` }" />
    </div>
  </div>
</template>
