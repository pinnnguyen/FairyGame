<script setup lang="ts">
import { formatCash, qualityPalette } from '~/common'
import type { BaseReward, BasicItem, PlayerEquipment } from '~/types'
import { ItemToName, ItemToQuality } from '~/constants'

const props = defineProps<{
  isWin: boolean
  damageList: {}
  reward?: {
    base: BaseReward
    items: BasicItem[]
    equipments?: PlayerEquipment[]
  }
}>()

const emits = defineEmits(['close', 'onRefresh'])
const isYouWin = computed(() => props.isWin)
const isYouLose = computed(() => !props.isWin)

const selected = reactive({
  equipment: {},
  item: {},
})

const options = reactive({
  showReward: false,
  showEquipment: false,
  showItem: false,
})
const selectedEquipment = (equipment: PlayerEquipment) => {
  selected.equipment = equipment
  options.showEquipment = true
}
const onRefresh = () => {
  emits('onRefresh')
}
const close = () => {
  emits('onRefresh')
}
</script>

<template>
  <var-popup v-model:show="options.showEquipment">
    <equipment-detail :equipment="selected.equipment" />
  </var-popup>
  <var-popup v-model:show="isYouLose" @close="close">
    <div
      bg="primary"
      m="auto"
      p="2"
      border="1 rounded white/20"
      w="90%"
    >
      <Line
        m="b-2"
        text="12 white space-nowrap"
      >
        Khiêu chiến thất bại
      </Line>

      <div text="center white">
        Sát thương gây ra {{ formatCash(damageList?.self) }}
      </div>
      <div
        class="text-center text-primary underline text-10 mt-4"
        @click.stop="close"
      >
        Đã hiểu
      </div>
    </div>
  </var-popup>
  <var-popup v-model:show="isYouWin" :overlay="true">
    <div
      bg="primary"
      m="auto"
      p="2"
      border="1 rounded white/20"
      class="w-[90%]"
    >
      <Line
        m="b-2"
        text="12 white space-nowrap"
      >
        Phần thưởng
      </Line>
      <div class="grid grid-cols-4 gap-4 text-10">
        <div v-for="(value, key) in reward?.base" :key="key">
          <div
            class="border border-white/40 p-2 "
            :style="{ color: qualityPalette(ItemToQuality[key]) }"
          >
            {{ ItemToName[key] }} x{{ value }}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 text-10 mt-2">
        <div
          v-for="(value, key) in reward?.items"
          :key="key"
          class="underline pl-1 border border-white/40 p-2"
          :style="{ color: qualityPalette(value.quality) }"
        >
          {{ value.name }}
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 text-10 mt-2">
        <div
          v-for="(value, key) in reward?.equipments"
          :key="key"
          class="underline pl-1 border border-white/40 p-2"
          :style="{ color: qualityPalette(value.quality) }"
          @click.stop="selectedEquipment(value)"
        >
          {{ value.name }}
        </div>
      </div>

      <div
        class="text-center text-primary underline text-10 mt-4"
        @click.stop="close"
      >
        Đã hiểu
      </div>
    </div>
  </var-popup>
</template>
