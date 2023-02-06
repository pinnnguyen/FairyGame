<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { set } from '@vueuse/core'
import { sendMessage, usePlayerStore } from '#imports'
import type { Boss, PlayerEquipment } from '~/types'
import { qualityPalette } from '~/common'
import { ITEMS_NAME, ITEMS_QUALITY, TARGET_TYPE } from '~/constants'

defineProps<{
  boss: Boss
}>()

const emits = defineEmits(['war'])
const { playerInfo } = storeToRefs(usePlayerStore())
const battleRequest = useState('battleRequest')

const options = reactive({
  showReward: false,
  showEquipment: false,
  showItem: false,
})

const selected = reactive({
  equipment: {},
  item: {},
})

const selectedEquipment = (equipment: PlayerEquipment) => {
  selected.equipment = equipment
  options.showEquipment = true
}

const startWar = (boss: Boss) => {
  if (playerInfo.value!.level < boss.level) {
    sendMessage('Chưa đạt cấp độ')
    return
  }

  if (boss.numberOfTurn! <= 0) {
    sendMessage('Lượt khiêu chiến trong ngày đã hết')
    return
  }

  set(battleRequest, {
    id: boss.id,
    target: TARGET_TYPE.BOSS_DAILY,
  })

  emits('war')
}
</script>

<template>
  <var-popup v-if="options.showEquipment" v-model:show="options.showEquipment">
    <bag-equipment-detail :item="selected.equipment" />
  </var-popup>
  <var-popup v-if="options.showReward" v-model:show="options.showReward">
    <div class="w-[90%] bg-primary m-auto p-2 rounded border border-white/20">
      <Line class="mb-2 text-10">
        Phần thưởng
      </Line>
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="(value, key) in boss.reward?.base"
          :key="key"
          class="underline pl-1 border border-white/40 p-1"
          :style="{
            color: qualityPalette(ITEMS_QUALITY[key]),
          }"
        >
          {{ ITEMS_NAME[key] }} x{{ value }}
        </div>
        <template v-if="boss.reward.equipments.length > 0">
          <div
            v-for="(equipment, key) in boss.reward?.equipments"
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
      <div class="text-center text-primary underline" @click.stop="options.showReward = false">
        Đã hiểu
      </div>
    </div>
  </var-popup>
  <div class="relative flex border border-white/40 rounded p-2 m-2">
    <div class="p-1">
      <div class="text-12 font-bold" :style="{ color: qualityPalette(boss.quality) }">
        {{ boss.name }}
      </div>
      <div>
        HP boss: 100%
      </div>
      <div class="flex max-w-[calc(100vw_-_40px)]">
        Thưởng:
        <div class="whitespace-nowrap overflow-auto">
          <span
            v-for="(value, key) in boss.reward.base"
            :key="key"
            class="underline pl-1"
            :style="{
              color: qualityPalette(ITEMS_QUALITY[key]),
            }"
          >
            {{ ITEMS_NAME[key] }} x{{ value }}
          </span>
          <template v-if="boss.reward.equipments.length > 0">
            <span
              v-for="(equipment, key) in boss.reward.equipments"
              :key="key"
              class="underline pl-1"
              :style="{
                color: qualityPalette(equipment.quality),
              }"
              @click.stop="selectedEquipment(equipment)"
            >
              {{ equipment.name }}
            </span>
          </template>
        </div>
      </div>
    </div>
    <div class="absolute top-1 right-2 text-8">
      Lượt tiêu diệt {{ boss.numberOfTurn }}
    </div>
    <div class="mt-2 absolute top-[20%] right-2">
      <i class="underline text-[#afc671] mr-2" @click.stop="options.showReward = true">Xem thưởng</i>
      <var-button
        class="!text-[#333] font-semibold italic !bg-[#ffffff]"
        size="mini"
        @click.stop="startWar(boss)"
      >
        Diệt tận
      </var-button>
    </div>
  </div>
</template>
