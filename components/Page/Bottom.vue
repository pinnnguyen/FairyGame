<script lang="ts" setup>
// import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'
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

const onToggle = (key: string) => {
  toggle[key] = true
}

const close = (key: string) => {
  toggle[key] = false
}
</script>

<template>
<!--  <Teleport to="body">-->
<!--    <PageFooterBag v-if="toggle.bag" @close="close('bag')" />-->
<!--  </Teleport>-->
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
</template>
