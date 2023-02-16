<script setup lang="ts">
import { qualityPalette } from '~/common'
import { qualityToName } from '~/constants'

const props = defineProps<{
  quality: number
  enhance: number
  name: string
}>()

const qualityTitle = computed(() => {
  return qualityToName[props.quality]
})
</script>

<template>
  <div
    :style="{ color: qualityPalette(quality) }"
  >
    {{ qualityTitle }} - {{ name }}
    <span
      text="12"
    >
      (+{{ enhance }})
    </span>
  </div>
</template>
