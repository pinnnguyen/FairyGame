<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import type { PlayerEquipment } from '~/types'
import { EQUIPMENT_SLOT } from '~/constants'
import { usePlayerSlot } from '~/composables/usePlayerSlot'

interface Prop {
  item: PlayerEquipment
}

const props = defineProps<Prop>()
const emits = defineEmits(['close'])
const { getSlotEquipUpgrade } = usePlayerSlot()
const loading = ref(false)

const target = ref(null)
onClickOutside(target, event => emits('close'))
</script>

<template>
  <Blocker class="z-9999">
    <div ref="target" class="relative text-xs leading-6 text-white bg-[#1d160e] rounded shadow-md p-0 border !border-[#795548] w-[320px]">
      <div class="p-3 text-12">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center justify-center">
            <ItemRank class="w-[55px] h-[55px]" :quantity="0" :preview="item.preview" :rank="item.rank" />
          </div>
          <div class="mx-2">
            <div>
              {{ item.name }} (+{{ getSlotEquipUpgrade(item.slot).upgradeLevel }})
            </div>
            <div>
              Vị trí: {{ EQUIPMENT_SLOT[item.slot] }}
            </div>
            <div>
              Đẳng cấp: {{ item.level }}
            </div>
          </div>
        </div>
        <div class="flex items-center justify-start">
          <div class="mx-2">
            <div class="flex justify-between">
              <span>
                Công kích: {{ item.damage }}
              </span>
            </div>
            <div class="flex justify-between">
              <span>Phòng ngự: {{ item.def }}</span>
            </div>
            <div class="flex justify-between">
              <span>Khí huyết: {{ item.hp ?? 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span>Bạo kích: {{ item.critical ?? 0 }}%</span>
            </div>
            <div class="flex justify-between">
              <span>Hút máu: {{ item.bloodsucking ?? 0 }}%</span>
            </div>
          </div>
        </div>
        <div class="flex justify-center mb-2" />
      </div>
    </div>
  </Blocker>
</template>
