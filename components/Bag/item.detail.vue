<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import type { Item } from '~/types'
import { EQUIPMENT_SLOT } from '~/constants'
import { usePlayerStore } from '~/composables/usePlayer'

interface Prop {
  info: string
  name: string
  rank: number
  preview: string
}

const props = defineProps<Prop>()
const emits = defineEmits(['close'])

const target = ref(null)
onClickOutside(target, () => {
  emits('close')
})
</script>

<template>
  <Blocker class="z-99">
    <div ref="target" class="relative text-xs leading-6 text-white bg-[#31384f] p-0 w-[320px]">
      <div class="p-3">
        <div class="flex flex-col items-center justify-between mb-4">
          <div class="flex items-center justify-center">
            <ItemRank class="w-15" :quantity="0" :rank="rank" :preview="preview" />
          </div>
          <div class="text-12 mt-4 bg-[#464545] p-4 rounded max-w-[270px]">
            {{ info }}
          </div>
        </div>
      </div>
    </div>
  </Blocker>
</template>
