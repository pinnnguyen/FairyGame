<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatCash } from '~/common'
import { usePlayerStore } from '~/composables/usePlayer'

const { attribute, playerInfo } = storeToRefs(usePlayerStore())
const togglePlayerInfo = useState('togglePlayerInfo')
</script>

<template>
  <div
    text="10"
    flex="~ "
    p="r-2"
    border="r-2 white/10"
    w="[45%]"
  >
    <div>
      <button
        m="x-2"
        w="9"
        p="y-2"
        font="leading-3 semibold"
        border="rounded 1 white/40"
        @click.stop="togglePlayerInfo = true"
      >
        Chi tiết nhân vật
      </button>
    </div>
    <div>
      <div>Tiên lực: <span text="8">{{ formatCash(playerInfo.power) }}</span></div>
      <div>Công kích: <span text="8">{{ attribute?.damage }}</span></div>
      <div>HP: <span text="8">{{ attribute?.hp }}</span></div>
      <div>Thủ: <span text="8">{{ attribute?.def }}</span></div>
    </div>
  </div>
</template>
