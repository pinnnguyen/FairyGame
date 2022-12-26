<script setup lang="ts">
import { convertMillisecondsToSeconds } from '~/common'
import { WINNER } from '~/constants/war'

defineProps({
  battleResource: String,
})
const emits = defineEmits(['close'])

const endTime = ref(6000)
const close = () => {
  emits('close')
}
const time = setInterval(() => {
  endTime.value = endTime.value - 1000
  if (endTime.value <= 0) {
    close()
    clearInterval(time)
  }
}, 1000)
</script>

<template>
  <div class="blocker duration-500 transition-colors transition-opacity z-9">
    <div class="flex flex-col items-center">
      <NuxtImg class="w-[300px]" format="webp" :src="battleResource.win === WINNER.YOU_WIN ? 'battle/win.png' : 'battle/lose.png' " />
      <div class="w-[250px] h-[250px] border border-[#6d6c6c] bg-black rounded-md">
        <ul class="h-full w-full p-1">
          <li class="float-left w-[calc(23%_-_8px)] h-[48px] ml-2 m-1 bg-iconbg_3 bg-cover">
            <div class="relative">
              <NuxtImg src="items/7.png" format="webp" />
              <p class="absolute bottom-0 right-0 text-xs font-bold text-white pr-1 pb-1">
                112120
              </p>
            </div>
          </li>
        </ul>
      </div>
      <ButtonConfirm class="m-2" @close="close">
        <span class="font-semibold">Nhận thưởng ({{ convertMillisecondsToSeconds(endTime) }})</span>
      </ButtonConfirm>
    </div>
  </div>
</template>
