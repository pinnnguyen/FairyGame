<script setup lang="ts">
import { attributeToName } from '~/constants'

defineProps<{
  kabbalah: any
}>()

const { kabbalahState } = storeToRefs(usePlayerStore())
</script>

<template>
  <div>
    <div font="bold">
      {{ kabbalah.name }} ({{ kabbalahState[kabbalah.sign]?.level ?? 0 }}/{{ kabbalah?.max ?? 0 }})
    </div>
    <div text="8">
      <div v-for="(value, key) in kabbalah.values" :key="key">
        {{ attributeToName[key] }}: {{ value }}
      </div>
    </div>
  </div>
</template>
