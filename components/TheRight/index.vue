<script setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { BASE_EXP } from '~/server/rule'

const { mids } = storeToRefs(usePlayerStore())
const toggle = ref(false)

const exp = computed(() => Math.round(BASE_EXP() * mids.value.current.reward.base.exp))
const gold = computed(() => Math.round(BASE_EXP() * mids.value.current.reward.base.gold))
</script>

<template>
  <BossDaily v-if="toggle" @close="toggle = false" />
  <div class="text-10 mb-1 flex justify-end flex-col items-end text-white p-2 fixed bg-black top-10 right-0 z-99">
    <ClientOnly>
      <div class="flex items-center justify-center my-1">
        <NuxtImg class="w-[20px] pr-1" format="webp" src="/items/4_s.png" />
        {{ exp }}/Phút
      </div>
      <div class="flex items-center justify-center my-1">
        <NuxtImg class="w-[20px] pr-1" format="webp" src="/items/3_s.png" />
        {{ gold }}/Phút
      </div>
    </ClientOnly>
  </div>
  <div class="fixed z-10 top-[30%] right-0 flex flex-col justify-end items-end">
    <button class="w-[55px] relative" @click="toggle = true">
      <NuxtImg format="webp" src="/button/right_bottom.png" />
      <NuxtImg class="w-[20px] absolute top-0" format="webp" src="/activity_icon/icon_61.png" />
      <NuxtImg class="absolute w-[30px] top-[3px] right-[3px]" format="webp" src="/activity_icon/txt_mainui_boss.png" />
    </button>
  </div>
</template>
