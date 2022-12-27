<script setup>
import { convertMillisecondsToSeconds } from '../../common'

const props = defineProps({
  refreshTime: Number,
})

const emits = defineEmits(['refreshFinished'])
const endTime = ref(props.refreshTime)
const time = setInterval(() => {
  endTime.value = endTime.value - 1000
  if (endTime.value <= 0) {
    emits('refreshFinished')
    clearInterval(time)
  }
}, 1000)
</script>

<template>
  <div class="blocker duration-500 transition-colors transition-opacity">
    <div class="text-white flex flex-col items-center justify-center w-full h-full">
      <div class="text-base">Đang hồi sinh {{ convertMillisecondsToSeconds(endTime) }}</div>
      <ButtonConfirm class="mt-2" @click="navigateTo('/')">
        <span class="z-9 font-semibold">Về thành</span>
      </ButtonConfirm>
    </div>
  </div>
</template>
