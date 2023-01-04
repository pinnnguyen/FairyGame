<script setup lang="ts">
import { BATTLE_TURN } from '~/constants'

defineProps<{
  playerEffect: string
  realTime: any
  state: any
  receiver: any
}>()
</script>

<template>
  <div
    class="relative duration-800 transition-transform flex flex-col items-center justify-center" :style="{
      transform: playerEffect === BATTLE_TURN.ENEMY ? 'translate(-30%)' : '',
    }"
  >
    <span class="text-[#22ae28] font-semibold battle-damage whitespace-nowrap" :class="{ show: realTime.player?.bloodsucking > 0 && realTime.enemy.trueDamage }">
      Hút (+{{ realTime.player?.bloodsucking }})
    </span>
    <span class="text-xl duration-800 font-semibold text-red-500 battle-damage" :class="{ show: realTime.enemy.trueDamage }">
      <span v-if="realTime?.enemy?.critical" class="whitespace-nowrap font-bold">
        Chí mạng -{{ realTime.enemy.dmg }}
      </span>
      <span v-else>-{{ realTime.enemy.dmg }}</span>
    </span>
    <NuxtImg format="webp" class="h-[100px]" src="/pve/nv2.png" />
    <BattleStatusBar :receiver-hp="receiver?.enemy?.hp" :hp="state?.enemy?.hp" :receiver-mp="receiver?.enemy?.mp" :mp="state?.enemy?.mp" />
  </div>
</template>
