<script setup lang="ts">
import { useBattleRoundStore } from '~/composables/useBattleRound'

defineProps<{
  isEliteBoss: boolean
}>()
const emits = defineEmits(['onBack'])
const {
  loading,
  refresh,
  speed,
  roundNum,
} = storeToRefs(useBattleRoundStore())
const { fn } = useBattleRoundStore()
</script>

<template>
  <div
    h="10"
    pos="absolute"
    bottom="11"
    w="full"
    flex="~ "
    align="items-enter"
    justify="end"
    font="italic"
  >
    <button
      v-show="speed === 1"
      text="8"
      m="x-2"
      h="6"
      w="6"
      font="italic semibold"
      class="border-full-box bg-button-menu"
      @click="speed = 1.5"
    >
      Tăng tốc
    </button>
    <button
      v-show="speed === 1.5"
      text="8"
      m="x-2"
      h="6"
      w="6"
      font="italic semibold"
      class="border-full-box bg-button-menu"
      @click="speed = 1"
    >
      Giảm tốc
    </button>
    <button
      v-if="roundNum > 3"
      text="8"
      m="x-2"
      h="6"
      w="6"
      font="italic semibold"
      class="border-full-box bg-button-menu"
      @click.stop="fn.skipBattle"
    >
      Bỏ qua
    </button>
    <button
      v-if="isEliteBoss"
      text="8"
      m="x-2"
      h="6"
      w="6"
      font="italic semibold"
      class="border-full-box bg-button-menu"
      @click.stop="emits('onBack')"
    >
      Trở về
    </button>
  </div>
</template>
