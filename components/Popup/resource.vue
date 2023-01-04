<script setup>
import { formatNumber } from '~/common'
defineProps({
  exp: Number,
  gold: Number,
  minutes: Number,
})
const emits = defineEmits(['close'])
useHead({
  bodyAttrs: {
    class: 'overlay',
  },
})

const close = () => {
  emits('close')
}
</script>

<template>
  <div class="blocker z-9 duration-500 transition-colors transition-opacity">
    <div class="bg-[#1d160e] p-3 transform-center text-white fixed border-2 border-[#dcc18d] z-9 w-[90%] rounded">
      <button class="flex items-center justify-center absolute top-[-10px] right-[-10px] bg-[#9C7A54] w-[28px] h-[28px] rounded-full text-[#F5ECE1]" @click.stop="close">
        <svg class="w-[14px] svg-inline--fa fa-times fa-w-10 center_div" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" /></svg>
      </button>
      <div class="flex flex-col items-center justify-center mb-3">
        <div class="text-center text-[#dcc18d] text-sm font-bold mb-2 uppercase">
          Nhận tài nguyên
        </div>
      </div>
      <div>
        <div class="flex items-center justify-center">
          <div class="text-xs text-[#ffeb00] text-center font-bold mx-2">
            + <span>{{ formatNumber(exp) }}</span> XP
          </div>
          <div class="text-xs text-[#ffeb00] text-center font-bold flex items-center mx-2">
            <NuxtImg format="webp" class="w-[20px] pb-[2px] pr-[2px]" src="/bag/00578.png" />
            <span>{{ formatNumber(gold) }} Vàng</span>
          </div>
        </div>
        <div class="text-xs text-white text-center font-bold mt-2">
          <span>{{ minutes }} Phút</span>
        </div>
      </div>
    </div>
  </div>
</template>
