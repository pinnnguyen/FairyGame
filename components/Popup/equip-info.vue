<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import type { PlayerEquipment } from '~/types'
import { EQUIPMENT_SLOT } from '~/constants'

interface Prop {
  item: PlayerEquipment
}

const props = defineProps<Prop>()
const emits = defineEmits(['close'])
const loading = ref(false)

const target = ref(null)
onClickOutside(target, event => emits('close'))
</script>

<template>
  <Blocker class="z-9999">
    <div ref="target" class="relative text-xs leading-6 text-white bg-[#31384f] p-0 border !border-[#795548] w-[320px]">
      <div class="p-3">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center justify-center">
            <div class="bg-iconbg_3 w-15 bg-contain bg-no-repeat">
              <NuxtImg format="webp" :src="item?.preview" />
            </div>
          </div>
          <div class="mx-2">
            <div>
              {{ item.name }}
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
