<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/player'
const { playerInfo } = storeToRefs(usePlayerStore())
</script>

<template>
  <div style="background: url('/common/bj_tongyong_2.png'); background-size: cover">
    <div class="flex items-center justify-between mx-2">
      <span class="text-white ml-2">
        <span class="">{{ playerInfo.levelTitle }} {{ playerInfo.floor }}</span>
      </span>
      <div class="flex items-center">
        <span class="text-white text-xs flex items-center">
          <NuxtImg class="w-[20px]" format="webp" src="bag/00578.png" /> {{ playerInfo?.gold }} Linh thạch
        </span>
        <span class="text-white text-xs flex items-center">
          <NuxtImg class="w-[22px]" format="webp" src="/items/41.png" />{{ playerInfo?.coin }} Tiên ngọc
        </span>
      </div>
    </div>
  </div>
</template>
