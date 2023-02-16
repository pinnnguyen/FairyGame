<script setup lang="ts">
import { Snackbar } from '@varlet/ui'
import { set } from '@vueuse/core'
import { sendMessage, useBattleEvents, useBattleRoundStore, usePlayerStore, useSoundRewardEvent } from '#imports'
import { tips } from '~/constants'
import type { BattleResponse } from '~/types'
import { randomNumber } from '~/common'

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
  useEventPve,
} = useBattleEvents()

const battleCurrently = ref()
const handleStartBattle = async (battleRes: BattleResponse) => {
  set(battleCurrently, battleRes)

  await fn.startBattle(battleRes, async () => {
    await useSoundRewardEvent()

    if (playerInfo.value) {
      playerInfo.value.gold += stateRunning.value.reward?.base.gold ?? 0
      playerInfo.value.exp += stateRunning.value.reward?.base.exp ?? 0
    }

    if (stateRunning.value) {
      Snackbar.allowMultiple(true)
      sendMessage(`Nhận Tiền Tiên x${stateRunning.value.reward?.base.gold}`, 3000, 'top')
      sendMessage(`Nhận Tu Vi x${stateRunning.value.reward?.base.exp}`, 3000, 'top')
    }

    if (stateRunning.value.reward?.items && stateRunning.value.reward?.items.length > 0) {
      for (const item of stateRunning.value.reward?.items)
        sendMessage(`${item.name} x${item.quantity}`, 3000, 'top')
    }

    useEventPve()
  })
}

const startEventPve = (skip: boolean) => {
  console.log('skip', skip)
  useEventPve(skip)
}

const onEventRefresh = () => {
  startEventPve(false)
}

onMounted(() => {
  useEventPve()
  $io.on('battle:start:pve', async (war: BattleResponse) => {
    await handleStartBattle(war)
  })
})

onUnmounted(async () => {
  $io.off('battle:start:pve')
})
</script>

<template>
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
    >
      <div
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
    <battle-controls />
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
      <battle-bottom-bar
        :is-pve="true"
        :mid-id="playerInfo.midId"
        @change-battle="startEventPve(true)"
      />
    </div>
  </var-loading>
</template>
