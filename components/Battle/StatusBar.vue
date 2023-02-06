<script setup lang="ts">
defineProps<{
  receiverHp?: number
  hp?: number
  mp?: number
  receiverMp?: number
}>()
</script>

<template>
  <div class="h-4 text-10 w-full bg-[#212121] relative flex items-center p-[2px] border border-white/40">
    <div
      class="h-3 w-full bg-[#91100a]"
      :style="{
        width: `${(receiverHp / hp) * 100}%`,
      }"
    >
      <div class="absolute top-[-1px] text-[#d2d2d2] w-full text-center">
        {{ receiverHp ?? 0 }}/ {{ hp ?? 0 }}
      </div>
    </div>
  </div>
</template>
