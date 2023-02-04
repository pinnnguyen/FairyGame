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
  <!--    :style="{ -->
  <!--      transform: realTime.player.sureDamage ? 'translate(-20%)' : '', -->
  <!--    }" -->
  <div
    class="relative duration-500 transition-transform border-1 border-white/40 rounded-md px-1 h-14"
  >
    <div class="w-30 italic relative">
      <div class="flex justify-start items-end">
        <span class="text-12 ml-1 text-[#34a830] line-clamp-1">{{ state?.enemy?.name ?? '...' }}</span>
      </div>
      <BattleInfo
        :name="state?.enemy?.name"
        :state="state"
        :receiver="receiver"
        :is-enemy="true"
      />
      <img
        v-show="realTime.enemy.sureDamage"
        class="h-20 transform-center absolute" :src="`/battle/player_gif.gif?v=${randomNumber(1, 1000)}`"
      >
    </div>
    <span
      class="battle-action-bloodsucking whitespace-nowrap"
      :class="{ show: realTime.player?.bloodsucking > 0 && realTime.player.sureDamage }"
    >
      (+{{ realTime.player?.bloodsucking }})
    </span>
    <span
      :class="{ show: realTime.enemy?.counterDamage > 0 && realTime.player.sureDamage }"
      class="battle-damage whitespace-nowrap"
    >
      Phản đòn -{{ realTime.enemy.counterDamage }}
    </span>

    <span
      class="battle-action whitespace-nowrap"
      :class="{ show: realTime.enemy?.avoid && realTime.enemy.sureDamage }"
    >
      Né tránh
    </span>

    <span
      class="battle-damage"
      :class="{ show: realTime.enemy.sureDamage && !realTime.enemy?.avoid }"
    >
      <span v-if="realTime?.enemy?.critical" class="whitespace-nowrap font-bold !opacity-100">
        Bạo kích -{{ realTime.enemy.dmg }}
      </span>
      <span v-else>-{{ realTime.enemy.dmg }}</span>
    </span>
  </div>
</template>
