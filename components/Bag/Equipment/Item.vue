<script setup lang="ts">
import type { PlayerEquipment } from '~/types'
import { playerTitle, qualityPalette } from '~/common'
import { qualityToName, slotToName } from '~/constants'

const props = defineProps<{
  equipment: PlayerEquipment
}>()

const emits = defineEmits(['onchangeEquip'])
const options = reactive({
  show: false,
})

const equipmentLevelTitle = computed(() => {
  return playerTitle(props.equipment.level!, props.equipment.level! + 1)
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
  <var-popup v-model:show="options.show" position="center">
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
    <p text="8" m="b-1">
      {{ slotToName[equipment.slot] }} ({{ equipmentLevelTitle.levelTitle }} {{ equipmentLevelTitle.floor }})
    </p>
    <div
      text="8"
      font="semibold"
      :style="{
        color: qualityPalette(equipment.quality),
      }"
    >
      {{ `${qualityToName[equipment.quality ?? 1]} -` }} {{ equipment?.name }} (+{{ equipment.enhance }})
    </div>
    <div>
      <icon v-for="i of equipment.star" :key="i" name="material-symbols:star" size="10" />
    </div>
  </div>
</template>
