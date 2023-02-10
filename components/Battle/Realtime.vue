<script setup lang="ts">
import { playerTitle } from '~/common'

const props = defineProps<{
  realTime: any
  receiver: any
  match: any
  pos: number
  round: number
}>()

const extend = computed(() => props.match.extends)
const attribute = computed(() => props.match.attribute)

const cPlayerTitle = computed(() => {
  return playerTitle(extend.value?.level, extend.value?.level + 1)
})
</script>

<template>
  <div
    class="relative duration-800 transition-transform border-box h-12"
    :style="{
      transform: realTime[extend._id]?.effect ? `${pos === 1 ? 'translate(10%)' : 'translate(-10%)'}` : '',
    }"
  >
    <div class="w-25 italic relative">
      <div class="flex justify-start items-end">
        <span class="text-10 ml-1 text-[#6ce8d4] line-clamp-1">{{ extend?.name ?? '...' }}</span>
      </div>
      <div class="text-[#333] text-10">
        <battle-status-bar
          :receiver-hp="receiver[extend._id]?.hp"
          :hp="attribute?.hp"
        />
        <div class="h-4 text-8 text-[#d2d2d2] bg-[#00000040] relative flex items-center p-[2px] border border-white/40">
          {{ cPlayerTitle?.levelTitle }} {{ cPlayerTitle?.floor }}
        </div>
      </div>
    </div>
    <span
      class="battle-action-bloodsucking whitespace-nowrap"
      :class="{ show: realTime[extend._id]?.bloodsucking > 0 && realTime[extend._id]?.effect }"
    >
      (+{{ realTime[extend._id]?.bloodsucking }})
    </span>
    <span
      :class="{ show: realTime[extend._id]?.defenderCounterAttack > 0 && realTime[extend._id].effect }"
      class="battle-damage whitespace-nowrap"
    >
      Phản đòn -{{ realTime[extend._id]?.defenderCounterAttack }}
    </span>

    <span
      class="battle-action whitespace-nowrap text-green-300"
      :class="{ show: realTime[extend._id]?.defenderAvoid && realTime[extend._id].effect }"
    >
      Né tránh
    </span>

    <span
      class="battle-damage"
      :class="{
        show: !realTime[extend._id]?.showDamage
          && round > 0
          && !realTime[extend._id]?.avoid,
      }"
    >
      <span v-if="realTime[extend._id]?.critical" class="whitespace-nowrap">
        Bạo kích -{{ receiver[extend._id]?.damage }}
      </span>
      <span v-else>-{{ receiver[extend._id]?.damage ?? 0 }}</span>
    </span>
  </div>
</template>
