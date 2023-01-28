<script setup lang="ts">
import { convertMillisecondsToSeconds } from '~/common'

const props = defineProps({
  refreshTime: Number,
})

const emits = defineEmits(['refreshFinished'])
const endTime = ref(props.refreshTime)

onMounted(() => {
  const time = setInterval(() => {
    endTime.value = endTime.value! - 1000
    if (endTime.value <= 1) {
      emits('refreshFinished')
      clearInterval(time)
    }
  }, 1000)
})
</script>

<template>
  <div class="text-white flex flex-col items-center justify-center">
    <div class="text-12 bg-[#41466e] text-white font-medium p-1 mb-2 rounded px-4">
      Đang làm mới {{ Math.round(convertMillisecondsToSeconds(endTime)) }}s
    </div>
  </div>
</template>
