<script setup lang="ts">
import { qualityPalette } from '~/common'

defineProps<{
  quality: number
}>()
</script>

<template>
  <div
    class="text-8"
    :style="{
      color: qualityPalette(quality),
    }"
  >
    <slot />
  </div>
</template>
