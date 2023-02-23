<script setup lang="ts">
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

const convertTitleTemplate = (str: string, kabbalah: any, level: number) => {
  return str
    .replace('#rate', `${kabbalah.rate.value + (level * kabbalah.valueOnLevel)}%`)
    .replace('#value', `${kabbalah.value + (level * kabbalah.valueOnLevel)}%`)
    .replace('#targetNum', `${kabbalah?.target?.num}`)
}
</script>

<template>
  <div>
    <div font="bold">
      {{ kabbalah?.name }} ({{ kabbalahStateSign?.level ?? 0 }}/{{ kabbalah?.max ?? 0 }})
    </div>
    <span
      v-for="m in kabbalah.max"
      :key="m"
      flex="~ col"
      text="8"
      :class="{ 'text-green-500': m === kabbalahStateSign?.level }"
    >
      {{ convertTitleTemplate(kabbalah.title, kabbalah, m) }}
    </span>
  </div>
</template>
