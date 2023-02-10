<script setup lang="ts">
import { usePlayerSlot } from '#imports'
import { slotToName } from '~/constants'
import type { PlayerEquipment } from '~/types'
import { qualityPalette } from '~/common'

defineProps<{
  wClass?: string
}>()

const { leftSlots, rightSlots } = storeToRefs(usePlayerSlot())
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
</script>

<template>
  <var-popup v-if="options.equipDetail" v-model:show="options.equipDetail" position="center">
    <equipment-detail
      :equipment="options.equipSelected"
      :action="false"
    />
  </var-popup>
  <div :class="wClass" class="gap-4 grid grid-cols-4 p-3 text-center">
    <div
      v-for="leftS in leftSlots"
      :key="leftS.no"
    >
      <button
        v-if="leftS.slot"
        class="diamond w-20 h-12"
        :style="{
          border: `1px solid ${qualityPalette(leftS.slot?.quality)}`,
        }"
        @click.stop="setSlot(leftS.slot)"
      >
        <span class="text-10 font-bold italic">
          {{ leftS.slot?.name }}(+{{ leftS.slot?.enhance }})
        </span>
      </button>
      <button
        v-else
        class="diamond w-20 h-12"
      >
        <div class="text-10 font-bold italic">
          {{ slotToName[leftS.no] }}
          <span class="text-8 whitespace-nowrap">
            (Trống)
          </span>
        </div>
      </button>
    </div>
    <div
      v-for="rightS in rightSlots"
      :key="rightS.no"
    >
      <button
        v-if="rightS.slot"
        class="diamond w-20 h-12"
        :style="{
          border: `1px solid ${qualityPalette(rightS.slot?.quality)}`,
        }"
        @click.stop="setSlot(rightS.slot)"
      >
        <span class="text-10 font-bold italic">
          {{ rightS.slot?.name }}(+{{ rightS.slot?.enhance }})
        </span>
      </button>
      <button
        v-else
        class="diamond w-20 h-12"
      >
        <span class="text-10 font-bold italic">
          {{ slotToName[rightS.no] }}
          <span class="text-8 whitespace-nowrap">
            (Trống)
          </span>
        </span>
      </button>
    </div>
  </div>
</template>
