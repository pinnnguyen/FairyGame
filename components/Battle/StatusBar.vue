<script setup lang="ts">
defineProps<{
  receiverHp?: number
  hp?: number
  mp?: number
  receiverMp?: number
}>()
</script>

<template>
  <div class="h-4 w-full bg-[#212121] relative flex items-center p-[2px] border border-white/40">
    <div
      class="h-3 w-full bg-[#91100a]"
      :style="{
        width: `${(receiverHp / hp) * 100}%`,
      }"
    >
      <div class="absolute top-[-2px] text-12 text-[#d2d2d2] w-full text-center">
        {{ receiverHp }}/ {{ hp }}
      </div>
    </div>
  </div>
</template>
