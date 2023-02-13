<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { convertMillisecondsToSeconds } from '~/common'

const props = defineProps({
  refreshTime: Number,
})

const emits = defineEmits(['refreshFinished'])
const endTime = ref(props.refreshTime)
const { pause, resume } = useIntervalFn(() => {
  endTime.value = endTime.value! - 1000
  if (endTime.value <= 1) {
    emits('refreshFinished')
    pause()
  }
}, 1000)

watchEffect(() => {
  resume()
})
</script>

<template>
  <div class="text-white flex flex-col items-center justify-center">
    <div v-if="endTime > 0" class="text-12 text-primary font-medium p-1 mb-2 rounded px-4">
      Hồi sinh: {{ Math.round(convertMillisecondsToSeconds(endTime)) }}s
    </div>
  </div>
</template>
