<script setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'

const emits = defineEmits(['close'])
const { playerInfo, upgrade } = storeToRefs(usePlayerStore())

const res = ref({})
const error = ref()
const doUpgrade = async () => {
  try {
    res.value = await $fetch('/api/breakthrough', {
      method: 'POST',
      body: {
        sid: playerInfo.value.sid,
      },
    })

    error.value = ''
  }
  catch (err) {
    error.value = err.message
  }
}

const close = () => {
  emits('close')
}
</script>

<template>
  <!--  <div class="blocker" v-if="upgrade.condition.beUpgraded"> -->
  <!--    <div class="bg-[#1d160e] p-3 transform-center text-white fixed border-2 border-[#dcc18d] z-[999] w-[90%] rounded sm:w-[640px] md:w-[640px] lg:w-[640px]"> -->
  <!--      <button @click="close" class="flex items-center justify-center absolute top-[-10px] right-[-10px] bg-[#9C7A54] w-[28px] h-[28px] rounded-full text-[#F5ECE1]"> -->
  <!--        <svg class="w-[14px] svg-inline&#45;&#45;fa fa-times fa-w-10 center_div" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""> -->
  <!--          <path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" /></svg> -->
  <!--      </button> -->
<!--  <div class="p-4"> -->
<!--    <div class="flex flex-col items-center justify-center mb-1"> -->
<!--      <div class="text-center text-[#dcc18d] text-sm font-bold mb-2 uppercase"> -->
<!--        Đột phá cảnh giới -->
<!--      </div> -->
<!--    </div> -->
<!--    <div v-if="error" class="text-center text-red-600 text-xs mb-3 uppercase"> -->
<!--      {{ error }} -->
<!--    </div> -->
<!--    <div v-if="!res.status" class="text-center text-red-600 text-xs mb-3 uppercase"> -->
<!--      {{ res.message }} -->
<!--    </div> -->
<!--    <div v-if="res.status" class="text-center text-green-500 text-xs mb-3 uppercase"> -->
<!--      {{ res.message }} -->
<!--    </div> -->
<!--    <div class="flex justify-between"> -->
<!--      <div class="w-[45%]"> -->
<!--        <div class="text-xs uppercase mb-1"> -->
<!--          Cảnh giới trước mắt -->
<!--        </div> -->
<!--        <div class="border border-[#dcc18d] bg-[#2d251d] rounded h-[35px] leading-[35px] text-center"> -->
<!--          Luyện Khí  Tầng 1 -->
<!--        </div> -->
<!--      </div> -->
<!--      <div class="w-[45%]"> -->
<!--        <div class="text-xs uppercase mb-1"> -->
<!--          Linh thạch cần -->
<!--        </div> -->
<!--        <div class="border border-[#dcc18d] bg-[#2d251d] rounded h-[35px] leading-[35px] text-center flex items-center justify-center"> -->
<!--          <img class="w-[20px] pb-[2px] pr-[2px]" src="/bag/00578.png" alt=""> {{ upgrade?.condition?.needGold }} / {{ playerInfo.gold }} -->
<!--        </div> -->
<!--      </div> -->
<!--    </div> -->
<!--    <div class="mt-4" /> -->
<!--    <div class="text-center"> -->
<!--      <button class="button-confirm" @click.stop="doUpgrade"> -->
<!--        Đột phá -->
<!--      </button> -->
<!--    </div> -->
<!--  </div> -->

<!--    </div> -->
<!--  </div> -->
</template>
