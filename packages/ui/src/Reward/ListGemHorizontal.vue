<script setup lang="ts">
import type { PlayerGem } from '~/types'
import { qualityPalette } from '~/common'

defineProps<{
  rewards: PlayerGem
}>()
</script>

<template>
  <div
    flex="~ "
  >
    <div text="space-nowrap" overflow="scroll">
      <span
        v-for="(value, key) in rewards"
        :key="key"
        text="underline 8"
        p="r-1"
        :style="{
          color: qualityPalette(value.quality),
        }"
      >
        {{ value.name }} x1
      </span>
    </div>
  </div>
</template>
