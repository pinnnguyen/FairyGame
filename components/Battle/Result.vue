<script setup lang="ts">
import { qualityPalette } from '~/common'
import type { BaseReward, BasicItem, PlayerEquipment } from '~/types'
import { ITEMS_NAME, ITEMS_QUALITY, WINNER } from '~/constants'

const props = defineProps<{
  battleResult: {
    show: boolean
    win: string
  }
  reward?: {
    base: BaseReward
    items: BasicItem[]
    equipments?: PlayerEquipment[]
  }
}>()

const emits = defineEmits(['close', 'onRefresh'])
const isYouWin = computed(() => props.battleResult.win === WINNER.youwin)
const isYouLose = computed(() => props.battleResult.win === WINNER.youlose)
console.log('props', props.battleResult)

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
  // emits('close')
  emits('onRefresh')
}
const close = () => {
  emits('onRefresh')
}
</script>

<template>
  <var-popup v-model:show="options.showEquipment">
    <bag-equipment-detail :item="selected.equipment" />
  </var-popup>
  <var-popup v-model:show="isYouLose">
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
        Phần thưởng
      </Line>

      <div text="center white">
        Khiêu chiến thất bại
      </div>
      <div
        class="text-center text-primary underline text-10 mt-4"
        @click.stop="close"
      >
        Đóng
      </div>
    </div>
  </var-popup>
  <var-popup v-model:show="isYouWin">
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
            :style="{ color: qualityPalette(ITEMS_QUALITY[key]) }"
          >
            {{ ITEMS_NAME[key] }} x{{ value }}
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 text-10 mt-2">
        <div
          v-for="(value, key) in reward?.items"
          :key="key"
          class="underline pl-1 border border-white/40 p-2"
          :style="{ color: qualityPalette(value.quality!) }"
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
        Đóng
      </div>
    </div>
  </var-popup>
</template>
