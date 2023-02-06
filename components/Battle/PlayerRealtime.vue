<script setup lang="ts">
defineProps<{
  realTime: any
  state: any
  receiver: any
}>()
</script>

<template>
  <div
    class="relative duration-800 transition-transform border-box h-12"
    :style="{
      transform: realTime.enemy.sureDamage ? 'translate(10%)' : '',
    }"
  >
    <div class="w-25 italic relative">
      <div class="flex justify-start items-end">
        <span class="text-10 ml-1 text-[#6ce8d4] line-clamp-1">{{ state?.player?.name ?? '...' }}</span>
      </div>
      <BattleInfo
        :name="state?.player?.name"
        :state="state"
        :receiver="receiver"
        :is-enemy="false"
      />
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
      class="battle-action whitespace-nowrap text-green-300"
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
  </div>
</template>
