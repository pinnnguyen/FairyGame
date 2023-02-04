<script setup lang="ts">
import { usePlayerSlot } from '#imports'
import { SLOT_NAME } from '~/constants'
import type { PlayerEquipment } from '~/types'
import { qualityPalette } from '~/common'

const { leftSlots, rightSlots } = storeToRefs(usePlayerSlot())
const options = reactive<{
  equipSelected: Partial<PlayerEquipment>
  equipDetail: boolean
}>({
  equipSelected: {},
  equipDetail: false,
})
const setSlot = (slot: PlayerEquipment) => {
  options.equipSelected = slot
  options.equipDetail = true
}
</script>

<template>
  <var-popup v-model:show="options.equipDetail" position="center">
    <lazy-bag-equip-detail
      :item="options.equipSelected"
      :action="false"
    />
  </var-popup>
  <div class="gap-4 grid grid-cols-4 p-3">
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
        <span class="text-10 font-bold italic">
          {{ SLOT_NAME[leftS.no] }}
          <div class="text-8 whitespace-nowrap">
            (Chưa trang bị)
          </div>
        </span>
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
          {{ SLOT_NAME[rightS.no] }}
          <span class="text-8 whitespace-nowrap">
            (Chưa trang bị)
          </span>
        </span>
      </button>
    </div>
  </div>
</template>
