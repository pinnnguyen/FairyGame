<script setup lang="ts">
import { qualityPalette } from '~/common'
defineProps<{
  quality?: number
}>()
</script>

<template>
  <div
    text="12"
    font="bol"
    :style="{ color: qualityPalette(quality!) }"
  >
    <slot />
  </div>
</template>
