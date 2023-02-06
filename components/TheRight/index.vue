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
<!--  <div class="text-10 mb-1 flex justify-end flex-col items-end text-white p-2 absolute bg-black top-10 right-0 z-99"> -->
<!--    <div class="flex-center my-1"> -->
<!--      <nuxt-img class="w-[20px] pr-1" format="webp" src="/items/4_s.png" /> -->
<!--      {{ exp }}/Phút -->
<!--    </div> -->
<!--    <div class="flex-center my-1"> -->
<!--      <nuxt-img class="w-[20px] pr-1" format="webp" src="/items/3_s.png" /> -->
<!--      {{ gold }}/Phút -->
<!--    </div> -->
<!--  </div> -->
</template>
