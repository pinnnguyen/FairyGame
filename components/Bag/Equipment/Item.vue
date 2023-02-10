<script setup lang="ts">
import type { PlayerEquipment } from '~/types'
import { qualityPalette } from '~/common'
import { qualityToName } from '~/constants'

defineProps<{
  equipment: PlayerEquipment
}>()

const emits = defineEmits(['onchangeEquip'])
const options = reactive({
  show: false,
})
const pickEquipItem = () => {
  options.show = true
}

const onchangeEquip = () => {
  options.show = false
  emits('onchangeEquip')
}
</script>

<template>
  <var-popup v-if="options.show" v-model:show="options.show" position="center">
    <equipment-detail
      :equipment="equipment"
      :action="true"
      :sell-action="true"
      @refresh="onchangeEquip"
      @change-equip="onchangeEquip"
    />
  </var-popup>
  <div
    border="rounded"
    p="2"
    :style="{
      border: `1px solid ${qualityPalette(equipment.quality)}`,
    }"
    @click.stop="pickEquipItem()"
  >
    <div
      text="8"
      font="semibold"
      :style="{
        color: qualityPalette(equipment.quality),
      }"
    >
      {{ `${qualityToName[equipment.quality ?? 1]} -` }} {{ equipment?.name }} (+{{ equipment.enhance }})
    </div>
  </div>
</template>
