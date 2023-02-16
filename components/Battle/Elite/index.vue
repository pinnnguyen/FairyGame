<script setup lang="ts">
import { set } from '@vueuse/core'
import { useBattleEvents, useBattleRoundStore, usePlayerStore, useSoundRewardEvent } from '#imports'
import { BATTLE_KIND, tips } from '~/constants'
import type { BattleResponse } from '~/types'
import { randomNumber, sleep } from '~/common'

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

const {
  useEventElite,
} = useBattleEvents()

const battleCurrently = ref()
const shouldLoading = ref(true)
const isWin = computed<boolean>(() => battleCurrently.value?.winner === playerInfo.value?._id)
const shouldBattleResult = ref(false)

const handleStartBattle = async (battleRes: BattleResponse) => {
  set(shouldBattleResult, false)
  set(shouldLoading, false)
  set(battleCurrently, battleRes)

  await fn.startBattle(battleRes, async () => {
    await useSoundRewardEvent()
    set(shouldBattleResult, true)
  })
}

const onEventRefresh = () => {
  // TODO: Quay lại map thường
  fn.stopBattle()
  useEventElite()
}

const onBack = () => {
  set(useState('arena'), BATTLE_KIND.NORMAL)
}
const skipListener = () => {
  fn.stopBattle()
  set(shouldBattleResult, true)
}

onMounted(() => {
  useEventElite()
  $io.on('battle:start:elite', async (war: any) => {
    await sleep(1000)
    set(battleCurrently, war)
    set(shouldLoading, false)
    await handleStartBattle(war)
  })
})

onUnmounted(async () => {
  $io.off('battle:start:elite')
})
</script>

<template>
  <battle-result
    v-if="shouldBattleResult && !refresh?.inRefresh"
    :reward="stateRunning.reward"
    :is-win="isWin"
    :damage-list="battleCurrently.damageList"
    @on-refresh="onEventRefresh"
  />
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
        v-if="shouldLoading"
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
      <battle-revice
        v-if="refresh?.inRefresh"
        top="0"
        text="primary"
        pos="absolute"
        :refresh-time="refresh?.refreshTime"
        @refresh-finished="onEventRefresh"
      />
    </div>
    <battle-controls
      :back="true"
      @on-back="onBack"
      @on-skip="skipListener"
    />
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
