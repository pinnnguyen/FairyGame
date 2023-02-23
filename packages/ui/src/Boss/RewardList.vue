<script setup lang="ts">
import type { RewardList } from '~/types'
import { qualityPalette } from '~/common'
import { ItemToName, ItemToQuality } from '~/constants'

defineProps<{
  reward: RewardList
}>()
</script>

<template>
  <div
    flex="~ "
    class="max-w-[calc(100vw_-_40px)]"
  >
    Thưởng:
    <div text="space-nowrap" overflow="scroll">
      <span
        v-for="(value, key) in reward.base"
        :key="key"
        text="underline"
        p="l-1"
        :style="{
          color: qualityPalette(ItemToQuality[key]),
        }"
      >
        {{ ItemToName[key] }} x{{ value }}
      </span>
      <span
        v-for="(value, key) in reward.equipments"
        :key="key"
        text="underline"
        p="l-1"
        :style="{
          color: qualityPalette(value.quality),
        }"
      >
        {{ value.name }}
      </span>
    </div>
  </div>
</template>
