<script setup lang="ts">
defineProps<{
  kabbalah: any
}>()

const { kabbalahState } = storeToRefs(usePlayerStore())
const convertTitleTemplate = (str: string, kabbalah: any, level: number) => {
  return str
    .replace('#rate', `${kabbalah.rate}%`)
    .replace('#value', `${kabbalah.value + (level * kabbalah.valueOnLevel)}%`)
    .replace('#targetNum', `${kabbalah?.target?.num}`)
}
</script>

<template>
  <div>
    <div font="bold">
      {{ kabbalah.name }} ({{ kabbalahState[kabbalah.sign]?.level ?? 0 }}/{{ kabbalah?.max ?? 0 }})
    </div>
    <span
      v-for="m in kabbalah.max"
      :key="m"
      flex="~ col"
      m="y-1"
      text="8"
      :class="{ 'text-green-500': m === kabbalahState[kabbalah.sign]?.level }"
    >
      {{ convertTitleTemplate(kabbalah.title, kabbalah, m) }}
    </span>
  </div>
</template>
