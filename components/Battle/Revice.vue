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
  <div
    text="white"
    flex="~ col"
    align="items-center"
    justify="center"
  >
    <div
      v-if="endTime > 0"
      text="12"
      font="medium"
      p="1 x-4"
      m="b-2"
      border="rounded"
    >
      Hồi sinh: {{ Math.round(convertMillisecondsToSeconds(endTime)) }}s
    </div>
  </div>
</template>
