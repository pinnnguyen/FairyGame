<script setup lang="ts">
import { useBattleRoundStore } from '~/composables/useBattleRound'

defineProps<{
  back?: boolean
}>()

const emits = defineEmits(['onBack', 'onSkip'])
const {
  loading,
  refresh,
  speed,
  roundNum,
} = storeToRefs(useBattleRoundStore())
const { fn } = useBattleRoundStore()

const skipBattle = () => {
  emits('onSkip')
  fn.skipBattle()
}
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
      pos="relative"
      @click="speed = 1.5"
    >
      <span
        pos="absolute"
        class="transform-center"
      >Tăng tốc
      </span>
    </button>
    <button
      v-show="speed === 1.5"
      text="8"
      m="x-2"
      h="6"
      w="6"
      font="italic semibold"
      class="border-full-box bg-button-menu"
      pos="relative"
      @click="speed = 1"
    >
      <span
        pos="absolute"
        class="transform-center"
      >
        Giảm tốc
      </span>
    </button>
    <button
      v-if="roundNum > 3"
      text="8"
      m="x-2"
      h="6"
      w="6"
      font="italic semibold"
      class="border-full-box bg-button-menu"
      pos="relative"
      @click.stop="skipBattle"
    >
      <span
        pos="absolute"
        class="transform-center"
      >
        Bỏ qua
      </span>
    </button>
    <button
      v-if="back"
      text="8"
      m="x-2"
      h="6"
      w="6"
      font="italic semibold"
      class="border-full-box bg-button-menu"
      pos="relative"
      @click.stop="emits('onBack')"
    >
      <span
        pos="absolute"
        class="transform-center"
      > Trở về</span>
    </button>
  </div>
</template>
