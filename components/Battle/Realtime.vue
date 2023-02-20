<script setup lang="ts">
import { attributeToName } from '../../constants'
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

const cPlayerTitle = computed(() => {
  return playerTitle(extend.value?.level, extend.value?.level + 1)
})

const kabbalahInBattleProp = computed(() => {
  return props.realTime[extend.value._id]?.kabbalahProps.find((k: any) => k.focus === 'in_battle')
})

const hasBuffOptions = computed(() => {
  if (props.buff && props.buff[extend.value._id])
    return props.buff[extend.value._id]

  return null
})

const kabbalahStartBattleProp = computed(() => {
  if (!hasBuffOptions.value)
    return null

  return hasBuffOptions.value.kabbalahProps.find((k: any) => k.focus === 'before_s_battle')
})
</script>

<template>
  <span
    transition="~ opacity duration-1000"
    pos="absolute"
    left="2"
    w="2"
    text="space-normal white 14"
    opacity="0"
    :class="{ 'left-4': pos === 1, 'right-4': pos === 2, '!opacity-100': kabbalahInBattleProp }"
  >
    {{ kabbalahInBattleProp?.name }}
  </span>
  <span
    transition="~ opacity duration-1000"
    pos="absolute"
    left="2"
    w="2"
    text="space-normal white 14"
    opacity="0"
    :class="{ 'left-4': pos === 1, 'right-4': pos === 2, '!opacity-100': hasBuffOptions && !kabbalahInBattleProp }"
  >
    {{ kabbalahStartBattleProp?.name }}
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
      (+{{ realTime[extend._id]?.bloodsucking }})
    </span>
    <span
      :class="{ show: realTime[extend._id]?.defenderCounterAttack > 0 && realTime[extend._id].doAction }"
      class="battle-damage whitespace-nowrap"
    >
      Phản đòn -{{ realTime[extend._id]?.defenderCounterAttack }}
    </span>
    <span
      class="battle-action whitespace-nowrap text-green-300"
      :class="{ show: realTime[extend._id]?.defenderAvoid && realTime[extend._id].doAction }"
    >
      Né tránh
    </span>
    <span
      class="battle-damage"
      :class="{
        show: receiver[extend._id]?.receiveDamage
          && round > 0
          && !realTime[extend._id]?.avoid,
      }"
    >
      <span>{{ receiver[extend._id]?.receiveDamage }}</span>
    </span>

    <div v-if="kabbalahStartBattleProp" text="8" w="28" m="t-1">
      <span v-for="(value, key) in kabbalahStartBattleProp.values" :key="key" text="green-500" p="x-[1px]">
        <icon name="ic:outline-keyboard-double-arrow-up" />
        {{ value }}{{ attributeToName[key] }}
      </span>
    </div>
  </div>
</template>
