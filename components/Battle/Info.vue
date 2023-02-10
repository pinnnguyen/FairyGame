<script setup lang="ts">
const props = defineProps<{
  hp?: number
  name?: string
  level?: number
  receiver?: any
}>()
</script>

<template>
  {{ receiver }} 11
  <div class="text-[#333] text-10">
    <BattleStatusBar
      :receiver-hp="receiver ?? hp"
      :hp="hp"
    />
    <div class="h-4 text-8 text-[#d2d2d2] bg-[#00000040] relative flex items-center p-[2px] border border-white/40">
      {{ level ?? '...' }}
    </div>
  </div>
</template>
