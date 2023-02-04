<script setup lang="ts">
import { randomNumber } from '~/common'
const props = defineProps<{
  realTime: any
  state: any
  receiver: any
}>()
</script>

<template>
  <!--  :style="{ -->
  <!--  transform: realTime.enemy.sureDamage ? 'translate(20%)' : '', -->
  <!--  }" -->
  <div
    class="relative duration-500 transition-transform border-1 border-white/40 rounded-md px-1 h-14"
  >
    <div class="w-30 italic relative">
      <div class="flex justify-start items-end">
        <span class="text-12 ml-1 text-[#6ce8d4] line-clamp-1">{{ state?.player?.name ?? '...' }}</span>
      </div>
      <BattleInfo
        :name="state?.player?.name"
        :state="state"
        :receiver="receiver"
        :is-enemy="false"
      />
      <img
        v-show="realTime.player.sureDamage"
        class="h-20 transform-center absolute"
        :src="`/battle/enemy_gif.gif?v=${randomNumber(1, 1000)}`"
      >
    </div>
    <span
      class="battle-action-bloodsucking whitespace-nowrap"
      :class="{ show: realTime.enemy?.bloodsucking > 0 && realTime.enemy.sureDamage }"
    >
      (+{{ realTime.enemy?.bloodsucking }})
    </span>
    <span
      :class="{ show: realTime.player?.counterDamage > 0 && realTime.enemy.sureDamage }"
      class="battle-damage whitespace-nowrap"
    >
      Phản đòn -{{ realTime.player.counterDamage }}
    </span>

    <span
      class="battle-action whitespace-nowrap"
      :class="{ show: realTime.player?.avoid && realTime.player.sureDamage }"
    >
      Né tránh
    </span>

    <span
      class="battle-damage"
      :class="{ show: realTime.player.sureDamage && !realTime.player?.avoid }"
    >
      <span v-if="realTime?.player?.critical" class="whitespace-nowrap">
        Bạo kích -{{ realTime.player.dmg }}
      </span>
      <span v-else>-{{ realTime.player.dmg }}</span>
    </span>
    <!--    <nuxt-img -->
    <!--      :class="{ -->
    <!--        'filter grayscale': realTime.player.sureDamage, -->
    <!--      }" format="webp" class="h-[120px]" -->
    <!--      src="/pve/player.png" -->
    <!--    /> -->
  </div>
</template>
