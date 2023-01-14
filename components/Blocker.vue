<script setup lang="ts">
const emits = defineEmits(['close'])
</script>

<template>
  <div class="blocker z-999 fixed w-full h-full flex items-center justify-center flex-col">
    <slot />
    <p class="text-white/80 text-12 absolute bottom-8" @click="emits('close')">
      Nhấn vào chỗ trống để đóng
    </p>
  </div>
</template>
