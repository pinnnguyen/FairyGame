<script setup lang="ts">
import { BATTLE_TURN } from '~/constants'
defineProps<{
  battleRounds: any
}>()
</script>

<template>
  <div class="p-4 h-[200px] bg-white w-full overflow-scroll">
    <div v-for="(round, index) in battleRounds" :key="index" class="mb-2 border-b border-gray-300 duration-500">
      <h3 class="text-10">
        [Lượt {{ round.roundNum }}]
      </h3>
      <strong>
        {{ round.turn === BATTLE_TURN.PLAYER ? 'Bạn' : 'Muc Tiêu' }}
      </strong> gây
      <strong class="text-red-600">
        {{ round.damage }}
      </strong>
      sát thương lên
      <strong>{{ round.turn === BATTLE_TURN.PLAYER ? 'Mục tiêu' : 'Bạn' }}</strong>
    </div>
  </div>
</template>
