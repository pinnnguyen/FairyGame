<script setup lang="ts">
import { convertMillisecondsToSeconds, qualityPalette } from '~/common'
import { WINNER } from '~/constants/war'
import type { BaseReward, BasicItem, PlayerEquipment } from '~/types'
import { ITEMS_NAME, ITEMS_QUALITY } from '~/constants'

interface Props {
  battleResult: {
    show: boolean
    win: string
  }
  reward?: {
    base: BaseReward
    items: BasicItem[]
    equipments?: PlayerEquipment[]
  }
}

const props = defineProps<Props>()

const emits = defineEmits(['close', 'onRefresh'])

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

const endTime = ref(6000)
const onRefresh = () => {
  // emits('close')
  emits('onRefresh')
}

const close = () => {
  emits('onRefresh')
}

const battleResult = computed(() => props.battleResult)
const time = setInterval(() => {
  endTime.value = endTime.value - 1000
  if (endTime.value <= 0) {
    onRefresh()
    clearInterval(time)
  }
}, 1000)
</script>

<template>
  <var-popup v-model:show="options.showEquipment">
    <bag-equip-detail :item="selected.equipment" />
  </var-popup>
  <var-popup v-model:show="battleResult.show">
    <div class="bg-primary m-auto p-2 rounded border border-white/20 w-[90%] m-auto">
      <Line class="mb-2 text-12 text-white whitespace-nowrap">
        Phần thưởng
      </Line>
      <div class="grid grid-cols-4 gap-4 text-10">
        <div v-for="(value, key) in reward.base" :key="key">
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
          v-for="(value, key) in reward.items"
          :key="key"
          class="underline pl-1 border border-white/40 p-2"
          :style="{ color: qualityPalette(value.quality) }"
        >
          {{ value.name }}
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 text-10 mt-2">
        <div
          v-for="(value, key) in reward.equipments"
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
        Đóng({{ convertMillisecondsToSeconds(endTime) }})
      </div>
    </div>
  </var-popup>
</template>
