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
      transform: realTime.player.sureDamage ? 'translate(-15%)' : '',
    }"
  >
    <span
      class="text-[#22ae28] font-semibold battle-damage whitespace-nowrap"
      :class="{ show: realTime.player?.bloodsucking > 0 && realTime.player.sureDamage }"
    >
      Hút sinh lực (+{{ realTime.player?.bloodsucking }})
    </span>
    <span
      :class="{ show: realTime.enemy?.counterDamage > 0 && realTime.player.sureDamage }"
      class="text-red-500 font-semibold battle-damage whitespace-nowrap"
    >
      Phản đòn -{{ realTime.enemy.counterDamage }}
    </span>

    <span
      class="text-blue-300 font-semibold battle-damage whitespace-nowrap"
      :class="{ show: realTime.enemy?.avoid && realTime.enemy.sureDamage }"
    >
      Né tránh
    </span>

    <span
      class="text-xl duration-800 font-semibold text-red-500 battle-damage"
      :class="{ show: realTime.enemy.sureDamage && !realTime.enemy?.avoid }"
    >
      <span v-if="realTime?.enemy?.critical" class="whitespace-nowrap font-bold">
        Bạo kích -{{ realTime.enemy.dmg }}
      </span>
      <span v-else>-{{ realTime.enemy.dmg }}</span>
    </span>
    <nuxt-img
      v-if="enemyClassIMG"
      format="webp" class="h-[100px]"
      :class="{
        'filter grayscale': realTime.enemy.sureDamage,
      }"
      :src="enemyClassIMG"
    />
    <img
      v-if="realTime.enemy.sureDamage"
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
