<script setup lang="ts">
import { attributeToName } from '~/constants'
import type { KabbalahRule } from '~/types'

const props = defineProps<{
  kabbalah: KabbalahRule
}>()

const { kabbalahState } = storeToRefs(usePlayerStore())
const kabbalahStateSign = computed(() => {
  if (kabbalahState.value && kabbalahState.value[props.kabbalah.sign!])
    return kabbalahState.value[props.kabbalah.sign!]

  return null
})
</script>

<template>
  <div>
    <div font="bold">
      {{ kabbalah.name }} ({{ kabbalahStateSign?.level ?? 0 }}/{{ kabbalah?.max ?? 0 }})
    </div>
    <div text="8">
      <div v-for="(value, key) in kabbalah.values" :key="key">
        {{ attributeToName[key] }}: <span text="green-500">{{ value * (kabbalahStateSign?.level ?? 1) }}</span>
      </div>
    </div>
  </div>
</template>
