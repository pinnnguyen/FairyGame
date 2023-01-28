<script setup lang="ts">
import { randomNumber } from '~/common'
import { ROLE_IMG } from '~/constants'

const props = defineProps<{
  realTime: any
  state: any
  receiver: any
}>()

const enemyClassIMG = computed(() => {
  return ROLE_IMG[props.state?.enemy?.class]
})
</script>

<template>
  <div
    class="relative duration-800 transition-transform flex flex-col items-center justify-center"
    :style="{
      transform: realTime.player.trueDamage ? 'translate(-15%)' : '',
    }"
  >
    <span
      class="text-[#22ae28] font-semibold battle-damage whitespace-nowrap"
      :class="{ show: realTime.player?.bloodsucking > 0 && realTime.player.trueDamage }"
    >
      Hút (+{{ realTime.player?.bloodsucking }})
    </span>
    <span
      class="text-xl duration-800 font-semibold text-red-500 battle-damage"
      :class="{ show: realTime.enemy.trueDamage }"
    >
      <span v-if="realTime?.enemy?.critical" class="whitespace-nowrap font-bold">
        Chí mạng -{{ realTime.enemy.dmg }}
      </span>
      <span v-else>-{{ realTime.enemy.dmg }}</span>
    </span>
    <nuxt-img
      v-if="enemyClassIMG"
      format="webp" class="h-[100px]"
      :class="{
        'filter grayscale': realTime.enemy.trueDamage,
      }"
      :src="enemyClassIMG"
    />
    <img
      v-if="realTime.enemy.trueDamage"
      class="w-[105px] h-[105px] absolute" :src="`/battle/player_gif.gif?v=${randomNumber(1, 1000)}`"
    >
    <BattleStatusBar
      :receiver-hp="receiver?.enemy?.hp"
      :hp="state?.enemy?.hp"
      :receiver-mp="receiver?.enemy?.mp"
      :mp="state?.enemy?.mp"
    />
  </div>
</template>
