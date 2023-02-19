<script setup lang="ts">
defineProps<{
  kabbalah: any
}>()

const convertTitleTemplate = (str: string, kabbalah: any, level: number) => {
  return str
    .replace('#rate', `${kabbalah.rate}%`)
    .replace('#value', `${kabbalah.value + (level * kabbalah.valueOnLevel)}%`)
    .replace('#targetNum', `${kabbalah?.target?.num}`)
}
</script>

<template>
  <div
    max-h="10"
    overflow="scroll"
  >
    <div font="bold">
      {{ kabbalah.name }}
    </div>
    <span
      v-for="m in kabbalah.max"
      :key="m"
      flex="~ col"
      m="y-1"
      text="8"
    >
      {{ convertTitleTemplate(kabbalah.title, kabbalah, m) }}
    </span>
  </div>
</template>
