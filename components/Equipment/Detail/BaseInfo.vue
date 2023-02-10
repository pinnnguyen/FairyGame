<script setup lang="ts">
import { slotToName } from '~/constants'

defineProps<{
  name: string
  quality: number
  enhance: number
  star: number
  slotNum: number
  rank: number
}>()
</script>

<template>
  <div
    m="x-2"
    font="semibold"
    text="left"
  >
    <equipment-detail-name
      :quality="quality"
      :ehance="enhance"
      :name="name"
    />
    <div
      flex="~ "
    >
      <icon v-for="i of star" :key="i" name="material-symbols:star" size="18" />
    </div>
    <p
      text="10"
    >
      {{ slotToName[slotNum] }}
    </p>
    <p
      text="10"
    >
      Bậc {{ rank }}
    </p>
  </div>
</template>
