<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onClickOutside, set } from '@vueuse/core'
import { usePlayerStore } from '~/composables/player'

const { playerInfo } = storeToRefs(usePlayerStore())

definePageMeta({
  middleware: ['game'],
  auth: false,
})

const onAttach = async () => {
  return navigateTo('/battle')
}

onMounted(async () => {
  // const tupo = shouldTupo({
  //   level: playerInfo.value?.level,
  //   floor: playerInfo.value?.floor,
  //   levelTitle: playerInfo.value?.levelTitle,
  // })
})

const closePopupRss = () => {
  set(togglePopupRss, false)
}
</script>

<template>
  <!--  <PopupTupo v-if="false" /> -->
  <TheRight />
  <PageSection class="flex-1 flex items-center relative justify-center z-8">
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
        <PageBottom />
      </div>
    </div>
  </PageSection>
</template>
