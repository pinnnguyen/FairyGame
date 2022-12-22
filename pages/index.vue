<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/player'

const { playerInfo } = storeToRefs(usePlayerStore())

definePageMeta({
  middleware: ['game'],
})

const onAttach = async () => {
  return navigateTo('/pve')
}

//
// const nextMid = () => {
//   playerInfo.value.mid_id += 1
// }
</script>

<template>
  <PageSection class="flex-1 flex items-center relative justify-center">
    <div class="absolute bottom-0 w-full">
      <div class="w-full relative h-[100px]">
        <NuxtImg class="w-[100px] transform-center top-[55%] absolute" src="/center/attack_btn.png" alt="" @click.stop="onAttach" />
        <NuxtImg class="h-[110px] w-full object-cover" src="/center/bg_attack.png" alt="" />
        <div class="flex flex-col items-center absolute top-[87%] left-[50%] transform-center" @click.stop="nextMid">
          <div style="background: radial-gradient(#6e0d0d, transparent)" class="text-xs m-0 !text-white h-[34px] !flex items-center">
            {{ playerInfo?.mid?.current?.name }} →
          </div>
        </div>
      </div>
      <div class="relative">
        <NuxtImg src="/center/bg-home.jpg" class="w-full h-[300px] object-cover" />
        <div class="flex flex-col absolute top-[10px] text-white">
          <a class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">
            <NuxtImg class="w-[40px]" src="bottom/bottom-3.png" />
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
            <NuxtImg class="w-[40px]" src="/bottom/bottom-6.png" />
          </a>
          <a class="text-white flex-col flex items-center mb-3">
            <NuxtImg class="w-[40px]" src="/bottom/bottom-5.png" />
          </a>
          <a class="text-white flex-col flex items-center mb-3">
            <NuxtImg class="w-[40px]" src="/bottom/bottom-7.png" />
          </a>
        </div>
      </div>
    </div>
  </PageSection>
</template>
