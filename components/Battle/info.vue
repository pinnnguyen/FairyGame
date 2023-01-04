<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

defineProps<{
  name: string
  hp: number
  damage: number
  def: number
}>()

const emits = defineEmits(['close'])
const target = ref(null)
onClickOutside(target, () => emits('close'))
</script>

<template>
  <Blocker>
    <div ref="target" class="flex justify-start flex-col mt-2 text-10">
      <div class="text-white bg-[#3f51b5] p-4">
        <span class="pb-[2px] font-medium">{{ name }}</span>
        <p>
          Sinh lực: {{ hp }}
        </p>
        <p>
          Công kích {{ damage }}
        </p>
        <p>
          Phòng ngự {{ def }}
        </p>
      </div>
    </div>
  </Blocker>
</template>
