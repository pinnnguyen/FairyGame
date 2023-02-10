<script setup lang="ts">
import { qualityPalette } from '~/common'
import { ItemToName, ItemToQuality } from '~/constants'
import type { PlayerEquipment } from '~/types'

defineProps<{
  reward: any
}>()

const selected = reactive({
  equipment: {},
  item: {},
})

const options = reactive({
  showEquipment: false,
  showItem: false,
})

const selectedEquipment = (equipment: PlayerEquipment) => {
  selected.equipment = equipment
  options.showEquipment = true
}
</script>

<template>
  <var-popup v-if="options.showEquipment" v-model:show="options.showEquipment">
    <equipment-detail :equipment="selected.equipment" />
  </var-popup>
  <div class="w-[90%] bg-primary m-auto p-2 rounded border border-white/20">
    <Line class="mb-2 text-10">
      Phần thưởng
    </Line>
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(value, key) in reward?.base"
        :key="key"
        class="underline pl-1 border border-white/40 p-1"
        :style="{
          color: qualityPalette(ItemToQuality[key]),
        }"
      >
        {{ ItemToName[key] }} x{{ value }}
      </div>
      <template v-if="reward.equipments.length > 0">
        <div
          v-for="(equipment, key) in reward?.equipments"
          :key="key"
          class="underline pl-1 border border-white/40 p-1"
          :style="{
            color: qualityPalette(equipment.quality),
          }"
          @click.stop="selectedEquipment(equipment)"
        >
          {{ equipment.name }}
        </div>
      </template>
    </div>
    <div class="text-center text-primary underline">
      Đã hiểu
    </div>
  </div>
</template>
