<script setup>
import { convertMillisecondsToSeconds } from '~/common'

const props = defineProps({
  refreshTime: Number,
})

const emits = defineEmits(['refreshFinished'])
const endTime = ref(props.refreshTime)
const time = setInterval(() => {
  endTime.value = endTime.value - 1000
  if (endTime.value <= 1) {
    emits('refreshFinished')
    clearInterval(time)
  }
}, 1000)
</script>

<template>
  <div class="text-white flex flex-col items-center justify-center">
    <div class="text-base text-black">
      Đang hồi sinh {{ Math.round(convertMillisecondsToSeconds(endTime)) }}s
    </div>
    <!--      <NuxtLink to="/"> -->
    <!--        <ButtonConfirm class="mt-2"> -->
    <!--          <span class="z-9 font-semibold">Về thành</span> -->
    <!--        </ButtonConfirm> -->
    <!--      </NuxtLink> -->
  </div>
</template>
