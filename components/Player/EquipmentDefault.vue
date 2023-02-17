<script setup lang="ts">
import { slotToName } from '~/constants'
import type { PlayerEquipment } from '~/types'
import { qualityPalette } from '~/common'

defineProps<{
  leftSlots?: []
  rightSlots?: []
  wClass?: string
}>()

const options = reactive<{
  equipSelected: Partial<PlayerEquipment>
  equipDetail: boolean
}>({
  equipSelected: {},
  equipDetail: false,
})

const setSlot = (equipment: PlayerEquipment) => {
  options.equipSelected = equipment
  options.equipDetail = true
}

const onchangeEquip = () => {
  options.equipDetail = false
}
</script>

<template>
  <var-popup v-model:show="options.equipDetail" position="center">
    <equipment-detail
      :equipment="options.equipSelected"
      :action="true"
      @change-equip="onchangeEquip"
    />
  </var-popup>
  <div
    :class="wClass"
    gap="4"
    grid="~ cols-4"
    p="3"
    text="center"
  >
    <div
      v-for="leftS in leftSlots"
      :key="leftS.no"
    >
      <button
        v-if="leftS.slot"
        class="diamond items-center justify-center"
        w="20"
        h="12"
        flex="~ col"
        :style="{
          border: `1px solid ${qualityPalette(leftS.slot?.quality)}`,
        }"
        @click.stop="setSlot(leftS.slot)"
      >
        <div
          flex="~ "
        >
          <icon v-for="i of leftS.slot?.star" :key="i" name="material-symbols:star" size="10" />
        </div>
        <div
          text="8"
          font="bold italic"
        >
          {{ leftS.slot?.name }}(+{{ leftS.slot?.enhance }})
        </div>
      </button>
      <button
        v-else
        class="diamond"
        h="12"
        w="20"
      >
        <span
          text="8"
          font="bold italic"
        >
          {{ slotToName[leftS.no] }}
          <span
            text="8 space-nowrap"
          >
            (Trống)
          </span>
        </span>
      </button>
    </div>
    <div
      v-for="rightS in rightSlots"
      :key="rightS.no"
    >
      <button
        v-if="rightS.slot"
        class="diamond"
        h="12"
        w="20"
        :style="{
          border: `1px solid ${qualityPalette(rightS.slot?.quality)}`,
        }"
        @click.stop="setSlot(rightS.slot)"
      >
        <span
          text="10"
          font="bold italic"
        >
          {{ rightS.slot?.name }}(+{{ rightS.slot?.enhance }})
        </span>
      </button>
      <button
        v-else
        class="diamond"
        h="12"
        w="20"
      >
        <span
          text="10"
          font="bold italic"
        >
          {{ slotToName[rightS.no] }}
          <span
            text="8 space-nowrap"
          >
            (Trống)
          </span>
        </span>
      </button>
    </div>
  </div>
</template>
