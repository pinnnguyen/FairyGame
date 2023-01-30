<script setup lang="ts">
import type { GemValue, PlayerGem } from '~/types'
import { qualityPalette } from '~/common'

const props = defineProps<{
  gem: PlayerGem
}>()

const gemValue = (g: GemValue) => {
  if (props.gem.quality! > 1) {
    if (g.type === 'percent')
      return `${g.name} ${Math.round(g.value * (props.gem.quality! * props.gem.rateOnLevel!))}%`

    return `${g.name} ${Math.round(g.value * (props.gem.quality! * props.gem.rateOnLevel!))}`
  }

  if (g.type === 'percent')
    return `${g.name} ${g.value}%`

  return `${g.name} ${g.value}`
}
</script>

<template>
  <div
    v-for="(g, index) in gem.values" :key="index" :style="{
      color: qualityPalette(gem.quality),
    }"
  >
    <span>
      {{ gemValue(g) }}
    </span>
  </div>
</template>
