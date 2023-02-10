<script setup lang="ts">
import type { PlayerEquipmentStat } from '~/types'
import { attributeToName } from '~/constants'

defineProps<{
  stats: PlayerEquipmentStat[]
}>()
</script>

<template>
  <Line
    m="y-1"
  >
    <div
      text="space-nowrap"
    >
      Thuộc tính cơ bản
    </div>
  </Line>
  <div
    m="x-2"
    w="full"
    text="10"
  >
    <div
      v-for="(stat, si) in stats"
      :key="si"
    >
      <div
        v-for="(value, key) in stat"
        :key="key"
      >
        <div
          v-if="value.main > 0 && value"
          flex="~ "
          justify="between"
        >
          <span> {{ attributeToName[key] }}: {{ Math.round(value.main + (value.enhance ?? 0) + (value.star ?? 0)) }}</span>
          <span
            v-if="value.enhance"
            text="green-300"
            p="x-2"
          >
            (Cường hoá + {{ Math.round(value.enhance) }})
            <span
              v-if="value.star > 0"
              text="yellow-300"
            >
              ({{ Math.round(value.star) }})
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
