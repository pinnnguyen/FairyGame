<script setup lang="ts">
import { playerTitle } from '~/common'

const props = defineProps<{
  realTime: any
  receiver: any
  match: any
  pos: number
  round: number
  buff: any
}>()

const extend = computed(() => props.match.extends)
const attribute = computed(() => props.match.attribute)
const showATime = ref(true)

const cPlayerTitle = computed(() => {
  return playerTitle(extend.value?.level, extend.value?.level + 1)
})

const kabbalahInBattleProp = computed(() => {
  return props.realTime[extend.value._id]?.kabbalahProps.find((k: any) => k.focus === 'in_battle')
})

setTimeout(() => {
  showATime.value = false
}, 1000)
</script>

<template>
  <span
    transition="~ opacity duration-1000"
    pos="absolute"
    left="2"
    w="2"
    text="space-normal white 10"
    z="9"
    opacity="0"
    :class="{ 'left-4': pos === 1, 'right-4': pos === 2, '!opacity-100': kabbalahInBattleProp }"
  >
    {{ kabbalahInBattleProp?.name }}
  </span>
  <div
    pos="relative"
    transition="~ duration-1000 transform"
    h="12"
    class="border-box"
    :style="{
      transform: realTime[extend._id]?.doAction ? `${pos === 1 ? 'translate(10%)' : 'translate(-10%)'}` : '',
    }"
  >
    <div
      w="28"
      :class="{ 'grayscale filter': receiver[extend._id]?.hp <= 0 }"
    >
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
      :class="{ show: realTime[extend._id]?.bloodsucking > 0 && realTime[extend._id]?.doAction }"
    >
      (+{{ realTime[extend?._id]?.bloodsucking }})
    </span>
    <span
      :class="{ show: realTime[extend._id]?.defenderCounterAttack > 0 && realTime[extend._id].doAction }"
      class="battle-damage whitespace-nowrap"
    >
      Ph???n ????n -{{ realTime[extend?._id]?.defenderCounterAttack }}
    </span>
    <span
      class="battle-action whitespace-nowrap text-green-300"
      :class="{ show: realTime[extend._id]?.defenderAvoid && realTime[extend._id].doAction }"
    >
      N?? tr??nh
    </span>
    <span
      class="battle-damage"
      :class="{
        show: receiver[extend._id]?.receiveDamage
          && round > 0
          && !realTime[extend._id]?.avoid,
      }"
    >
      <span>{{ receiver[extend?._id]?.receiveDamage }}</span>
    </span>
  </div>
</template>
