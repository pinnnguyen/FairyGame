<script lang="ts" setup>
import { usePlayerStore } from '~/composables/player'
const { playerInfo } = usePlayerStore()
</script>

<template>
  <div style="background: url('/common/bj_tongyong_2.png'); background-size: cover">
    <div class="flex items-center justify-between">
      <span class="text-[#eee4a7] font-bold ml-2">
        {{ playerInfo.level }} Cấp
      </span>
      <div>
        <span class="text-white font-bold">
        {{ playerInfo.gold }} Linh thạch
      </span>
        <span class="text-white font-bold">
        {{ playerInfo.coin }} Tiên ngọc
      </span>
      </div>
    </div>
  </div>
</template>
