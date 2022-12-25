<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onClickOutside, set } from '@vueuse/core'
import { usePlayerStore } from '~/composables/player'

const { playerInfo } = storeToRefs(usePlayerStore())

definePageMeta({
  middleware: ['game'],
})

const togglePopupRss = ref(false)
const togglePlayerInfo = ref(false)
const resources = ref({})

const playerInfoComponent = ref(null)
onClickOutside(playerInfoComponent, event => togglePlayerInfo.value = false)

const onAttach = async () => {
  return navigateTo('/battle')
}

onMounted(async () => {
  // const tupo = shouldTupo({
  //   level: playerInfo.value?.level,
  //   floor: playerInfo.value?.floor,
  //   levelTitle: playerInfo.value?.levelTitle,
  // })

  // setInterval(async () => {
  //   console.log('runn')
  //   resources.value = await $fetch('/api/reward/training', {
  //     method: 'POST',
  //     body: {
  //       sid: playerInfo.value?.sid,
  //     },
  //   })
  //
  //   if (resources.value)
  //     set(togglePopupRss, true)
  // }, 60000)
})

const closePopupRss = () => {
  set(togglePopupRss, false)
}
</script>

<template>
  <PopupTupo v-if="false" />
  <PopupResource v-if="togglePopupRss" :exp="resources.exp" :gold="resources.gold" :minutes="resources.minutes" @close="closePopupRss" />
  <PlayerInfomation ref="playerInfoComponent" :class="{ 'h-[0px]': !togglePlayerInfo }" />
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
            <NuxtImg class="w-[40px]" src="bottom/bottom-3.png" @click.stop="togglePlayerInfo = !togglePlayerInfo" />
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
