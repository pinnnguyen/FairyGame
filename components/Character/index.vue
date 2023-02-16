<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerSlot } from '~/composables/usePlayerSlot'

const { leftSlots, rightSlots } = storeToRefs(usePlayerSlot())
</script>

<template>
  <Line class="mb-4">
    Thuộc tính nhân vật
  </Line>
  <div class="flex-center">
    <div class="flex w-full justify-around">
      <player-short-view />
      <div>
        <player-tupo />
      </div>
    </div>
  </div>
  <Line class="mt-4">
    Thiết lập trang bị
  </Line>
  <player-equipment-default
    :left-slots="leftSlots"
    :right-slots="rightSlots"
  />
</template>
