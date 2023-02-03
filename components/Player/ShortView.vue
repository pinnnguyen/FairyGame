<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'

const { attribute } = storeToRefs(usePlayerStore())
</script>

<template>
  <div class="flex pr-2 border-r-2 border-white/80 w-[45%]">
    <div>
      <button class="mx-2 w-16 h-8 leading-3 shadow rounded font-bold border-1 text-primary border-white/40">
        Chi tiết nhân vật
      </button>
    </div>
    <div class="">
      <div>Công kích: {{ attribute.damage }}</div>
      <div>HP: {{ attribute.hp }}</div>
      <div>Thủ: {{ attribute.def }}</div>
    </div>
  </div>
</template>
