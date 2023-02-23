<script setup lang="ts">
import { slotToName } from '~/constants'

defineProps<{
  name?: string
  quality?: number
  enhance?: number
  star?: number
  slotNum?: number
  rank?: number
}>()
</script>

<template>
  <section
    m="x-2"
    font="semibold"
    text="left"
  >
    <equipment-detail-name
      :quality="quality"
      :enhance="enhance"
      :name="name"
    />
    <div
      v-if="star > 0"
      flex="~ "
      align="items-center"
      font="bold"
      text="10"
    >
      {{ star }}
      <icon name="material-symbols:star" size="10" />
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
  </section>
</template>
