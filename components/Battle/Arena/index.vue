<script setup lang="ts">
import { set } from '@vueuse/core'
import { sendNotification, useBattleRoundStore, usePlayerStore, useSoundRewardEvent } from '#imports'
import { BATTLE_KIND, ItemToName, ItemToQuality, tips } from '~/constants'
import type { BattleResponse } from '~/types'
import { qualityPalette, randomNumber, sleep } from '~/common'

const {
  match,
  loading,
  refresh,
  stateRunning,
  speed,
  roundNum,
  options,
} = storeToRefs(useBattleRoundStore())

const { $io } = useNuxtApp()
const { fn } = useBattleRoundStore()
const { playerInfo } = storeToRefs(usePlayerStore())

const shouldNextBattle = ref(true)
const battleCurrently = ref()
const warResult = ref(false)
const handleStartBattle = async (battleRes: BattleResponse) => {
  await fn.startBattle(battleRes, async () => {
    set(useState('refreshArena'), true)
    set(warResult, true)
    await useSoundRewardEvent()
  })
}

const onBack = () => {
  // TODO: Quay lại map thường
  set(useState('arena'), BATTLE_KIND.NORMAL)
}
const close = () => {
  set(warResult, false)
  onBack()
}

onMounted(async () => {
  $io.on('response:pvp:solo', async (war: any) => {
    if (war?.reachLimit) {
      sendNotification('Đã đạt đến giới hạn khiêu chiến mỗi ngày', 2000)
      onBack()
      return
    }

    await sleep(1000)
    set(battleCurrently, war)
    set(shouldNextBattle, false)
    await handleStartBattle(war)
  })
})

onUnmounted(async () => {
  $io.off('response:pvp:solo')
})
</script>

<template>
  <var-popup v-model:show="warResult">
    <div
      bg="primary"
      m="auto"
      p="2"
      border="1 rounded white/20"
      class="w-[90%]"
    >
      <Line
        m="b-2"
        text="12 white space-nowrap"
      >
        Phần thưởng
      </Line>
      <div text="primary center 10" m="y-2">
        {{ battleCurrently.youwin ? 'Thành công' : 'Thất bại' }} khiêu chiến {{ battleCurrently.defender.name }}
      </div>
      <div class="grid grid-cols-4 gap-4 text-10">
        <div v-for="(value, key) in battleCurrently.reward" :key="key">
          <div
            class="border border-white/40 p-2 "
            :style="{ color: qualityPalette(ItemToQuality[key]) }"
          >
            {{ ItemToName[key] }} x{{ value }}
          </div>
        </div>
      </div>
      <div
        class="text-center text-primary underline text-10 mt-4"
        @click.stop="close"
      >
        Đã hiểu
      </div>
    </div>
  </var-popup>

  <var-loading
    :loading="loading"
    size="mini"
    class="h-full"
    :description="tips[Math.round(randomNumber(0, tips.length))]"
    color="#f5f5f5"
  >
    <div
      flex="~ "
      justify="around"
      pos="relative"
      w="full"
      h="full"
      :class="{ 'bg-[#163334]': stateRunning }"
    >
      <nuxt-img
        v-if="shouldNextBattle"
        format="webp"
        src="/battle/loading.png"
        w="35"
        h="35"
        top="[40%]"
        pos="absolute"
        class="transform-center"
        object="cover"
      />
      <div
        v-else
        flex="~ "
        pos="absolute"
        align="items-center"
        justify="around"
        w="full"
        class="top-[30%]"
      >
        <template v-if="stateRunning">
          <battle-realtime
            v-for="(m, ind) in match"
            :key="ind"
            :match="m"
            :receiver="stateRunning?.receiver"
            :real-time="stateRunning?.realTime"
            :pos="m.extends.pos"
            :round="roundNum"
          />
        </template>
      </div>
    </div>
    <battle-controls :back="true" @on-back="onBack" />
    <div
      :class="{ '!bg-[#540905]': stateRunning }"
      transition="~ colors duration-800"
      h="10"
      pos="absolute"
      bottom="0"
      w="full"
      flex="~ "
      align="items-center"
      justify="end"
      text="gray-100"
      font="italic"
      bg="base"
    >
      <battle-bottom-bar />
    </div>
  </var-loading>
</template>
