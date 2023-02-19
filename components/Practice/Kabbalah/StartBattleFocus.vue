<script setup lang="ts">
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
      {{ kabbalah?.name }}
    </div>
    <span
      v-for="m in kabbalah.max"
      :key="m"
      flex="~ col"
      text="8"
    >
      {{
        kabbalah.title
          .replace('#percentDamage', `${kabbalah.values.percentDamage}%`)
          .replace('#percentSpeed', `${kabbalah.values.percentSpeed}%`)
      }}
    </span>
  </div>
</template>
