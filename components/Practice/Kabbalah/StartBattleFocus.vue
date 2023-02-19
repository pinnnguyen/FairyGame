<script setup lang="ts">
defineProps<{
  kabbalah: any
}>()

const { kabbalahState } = storeToRefs(usePlayerStore())
</script>

<template>
  <div>
    <div font="bold">
      {{ kabbalah?.name }} ({{ kabbalahState[kabbalah.sign]?.level ?? 0 }}/{{ kabbalah?.max ?? 0 }})
    </div>
    <span
      v-for="m in kabbalah.max"
      :key="m"
      flex="~ col"
      text="8"
      :class="{ 'text-green-500': m === kabbalahState[kabbalah.sign]?.level }"
    >
      {{
        kabbalah.title
          .replace('#percentDamage', `${kabbalah.values.percentDamage}%`)
          .replace('#percentSpeed', `${kabbalah.values.percentSpeed}%`)
      }}
    </span>
  </div>
</template>
