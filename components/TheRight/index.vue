<script setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { BASE_EXP } from '~/server/rule'

const { mids } = storeToRefs(usePlayerStore())
// const toggle = ref(false)

const exp = computed(() => Math.round(BASE_EXP() * mids.value.current?.reward?.base?.exp))
const gold = computed(() => Math.round(BASE_EXP() * mids.value.current?.reward?.base?.gold))
</script>

<template>
  <!--  <var-popup v-model:show="toggle" position="center"> -->
  <!--    <Boss /> -->
  <!--  </var-popup> -->
  <div class="text-10 mb-1 flex justify-end flex-col items-end text-white p-2 absolute bg-black top-10 right-0 z-99">
    <div class="flex items-center justify-center my-1">
      <nuxt-img class="w-[20px] pr-1" format="webp" src="/items/4_s.png" />
      {{ exp }}/Phút
    </div>
    <div class="flex items-center justify-center my-1">
      <nuxt-img class="w-[20px] pr-1" format="webp" src="/items/3_s.png" />
      {{ gold }}/Phút
    </div>
  </div>
<!--  <div class="absolute z-10 top-[25%] right-0 flex flex-col justify-end items-end"> -->
<!--    <button class="w-[55px] relative" @click="toggle = true"> -->
<!--      <nuxt-img format="webp" src="/button/right_bottom.png" /> -->
<!--      <nuxt-img class="w-[20px] absolute top-0" format="webp" src="/activity_icon/icon_61.png" /> -->
<!--      <nuxt-img class="absolute w-[30px] top-[3px] right-[3px]" format="webp" src="/activity_icon/txt_mainui_boss.png" /> -->
<!--    </button> -->
<!--  </div> -->
</template>
