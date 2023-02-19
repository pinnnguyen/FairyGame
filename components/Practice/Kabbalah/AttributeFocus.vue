<script setup lang="ts">
import { attributeToName } from '../../../constants'

defineProps<{
  kabbalah: any
}>()
</script>

<template>
  <div
    max-h="10"
    overflow="scroll"
  >
    <div font="bold">
      {{ kabbalah.name }}
    </div>
    <div text="8">
      <div v-for="(value, key) in kabbalah.values" :key="key">
        {{ attributeToName[key] }}: {{ value }}
      </div>
    </div>
  </div>
</template>
