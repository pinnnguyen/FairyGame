<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerSlot } from '~/composables/usePlayerSlot'
import type { PlayerEquipment } from '~/types'
import { SLOT_NAME } from '~/constants'
import { qualityPalette } from '~/common'

const emits = defineEmits(['onselected'])

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
}

watch(options, (value) => {
  console.log('watch', value)
  emits('onselected', value.equipSelected)
})
</script>

<template>
  <var-popup v-model:show="options.equipDetail" position="center">
    <lazy-bag-equip-detail
      :item="options.equipSelected"
      :action="false"
    />
  </var-popup>
  <div class="flex items-center justify-center w-[95vw] h-[70vh] bg-[#191b1e]">
    <div class="w-full h-full relative border border-white/40">
      <span class="font-bold absolute left-[calc(50%_-_50px)] top-[4px] text-white text-12 w-25 flex justify-center">
        <slot name="title" />
      </span>
      <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full" />
      <div class="flex justify-around items-center w-full absolute top-10">
        <div class="flex flex-col pl-2 gap-2">
          <div v-for="leftS in leftSlots" :key="leftS.no">
            <button
              v-if="leftS.slot"
              class="diamond w-20 h-13"
              :class="{ 'border border-green-500': leftS.slot && leftS.slot?._id === options.equipSelected?._id }"
              @click.stop="setSlot(leftS.slot)"
            >
              <span class="text-10 font-bold italic">
                {{ leftS.slot?.name }}(+{{ leftS.slot?.enhance }})
              </span>
            </button>
            <button
              v-else
              class="diamond w-20 h-13"
            >
              <span class="text-10 font-bold italic">
                {{ SLOT_NAME[leftS.no] }}
                <span class="text-8">
                  (Trống)
                </span>
              </span>
            </button>
          </div>
        </div>
        <div class="w-20 h-13 rounded" @click="options.equipDetail = true">
          <button
            class="diamond w-20 h-13"
            :style="{
              border: `1px solid ${qualityPalette(options.equipSelected.quality)}`,
            }"
          >
            <span class="text-10 italic font-bold">
              {{ options.equipSelected?.name }}(+{{ options.equipSelected?.enhance }})
            </span>
          </button>
        </div>
        <div class="flex flex-col pr-2 gap-2">
          <div
            v-for="rightS in rightSlots"
            :key="rightS.no"
          >
            <button
              v-if="rightS.slot"
              class="diamond w-20 h-13"
              :class="{ 'border border-green-500': rightS.slot && rightS.slot?._id === options.equipSelected?._id }"
              @click.stop="setSlot(rightS.slot)"
            >
              <span class="text-10 font-bold italic">
                {{ rightS.slot?.name }}(+{{ rightS.slot?.enhance }})
              </span>
            </button>
            <button
              v-else
              class="diamond w-20 h-13"
            >
              <span class="text-10 font-bold italic">
                {{ SLOT_NAME[rightS.no] }}
                <span class="text-8">
                  (Trống)
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
