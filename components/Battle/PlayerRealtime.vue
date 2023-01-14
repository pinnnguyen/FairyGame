<script setup lang="ts">
import { randomNumber } from '~/common'

defineProps<{
  playerEffect: string
  realTime: any
  state: any
  receiver: any
}>()
</script>

<template>
  <div
    class="relative duration-800 transition-transform flex flex-col items-center justify-center"
    :style="{
      transform: realTime.enemy.trueDamage ? 'translate(15%)' : '',
    }"
  >
    <span class="text-[#22ae28] font-semibold battle-damage whitespace-nowrap" :class="{ show: realTime.enemy?.bloodsucking > 0 && realTime.enemy.trueDamage }">
      Hút (+{{ realTime.enemy?.bloodsucking }})
    </span>
    <span class="duration-800 text-xl font-semibold text-red-500 battle-damage" :class="{ show: realTime.player.trueDamage }">
      <span v-if="realTime?.player?.critical" class="whitespace-nowrap font-bold">
        Chí mạng -{{ realTime.player.dmg }}
      </span>
      <span v-else>-{{ realTime.player.dmg }}</span>
    </span>
    <NuxtImg
      :class="{
        'filter grayscale': realTime.player.trueDamage,
      }" format="webp" class="h-[100px]" src="/pve/nv1.png"
    />
    <img v-if="realTime.player.trueDamage" class="w-[105px] h-[105px] absolute" :src="`/battle/enemy_gif.gif?v=${randomNumber(1, 100)}`">
    <BattleStatusBar :receiver-hp="receiver?.player?.hp" :hp="state?.player?.hp" :receiver-mp="receiver?.player?.mp" :mp="state?.player?.mp" />
  </div>
</template>
