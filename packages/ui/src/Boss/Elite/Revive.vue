<script setup lang="ts">
import { timeOffset } from '~/common'

const props = defineProps<{
  revive: number
}>()

const now = new Date().getTime()
const revive = ref((props.revive - now) / 1000)
setInterval(() => {
  revive.value -= 1
}, 1000)
</script>

<template>
  <div v-if="revive > 0" text="center">
    Hồi sinh: {{ timeOffset(revive).minutes }}p {{ timeOffset(revive).seconds }}s
  </div>
</template>
