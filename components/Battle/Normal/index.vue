<script setup lang="ts">
import { Snackbar } from '@varlet/ui'
import { set } from '@vueuse/core'
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
  scripts,
} = storeToRefs(useBattleRoundStore())

const { $io } = useNuxtApp()
const { fn } = useBattleRoundStore()
const { playerInfo } = storeToRefs(usePlayerStore())

const {
  useEventPve,
} = useBattleEvents()

const battleCurrently = ref()
const warNotice = ref(false)
const showMid = ref(false)

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
      sendNotification(`Nhận Tiền Tiên x${stateRunning.value.reward?.base.gold}`, 3000, 'top')
      sendNotification(`Nhận Tu Vi x${stateRunning.value.reward?.base.exp}`, 3000, 'top')
    }

    if (stateRunning.value.reward?.items && stateRunning.value.reward?.items.length > 0) {
      for (const item of stateRunning.value.reward?.items)
        sendNotification(`${item.name} x${item.quantity}`, 3000, 'top')
    }

    useEventPve()
  })
}

const startEventPve = (skip: boolean) => {
  useEventPve(skip)
}

const onEventRefresh = () => {
  startEventPve(false)
}

onMounted(() => {
  useEventPve()
  $io.on('battle-normal:response', async (war: BattleResponse) => {
    await handleStartBattle(war)
  })
})

onUnmounted(async () => {
  $io.off('battle-normal:response')
})
</script>

<template>
  <var-popup v-model:show="showMid" position="bottom">
    <battle-normal-map @change-battle="startEventPve(true)" />
  </var-popup>
  <var-popup
    v-model:show="warNotice"
    position="bottom"
    :overlay-style="{ background: 'transparent' }"
  >
    <div
      text="[#ffffff] 10"
      h="[60vh]"
      bg="[#191b1e]"
      max-w="[70vh]"
      m="auto"
      overflow="auto"
    >
      <Line p="y-2">
        Hiệp {{ roundNum }}
      </Line>
      <div p="x-2" transition="~ all duration-800" font="italic">
        <div v-for="(script, i) in scripts" :key="i">
          <div v-for="(s, j) in script" :key="j" m="y-2">
            <div v-html="s" />
          </div>
        </div>
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
    >
      <div
        pos="absolute"
        top="6" right="4"
        text="yellow-400 8 underline"
        @click.stop="showMid = true"
      >
        Bản đồ thế giới
      </div>
      <div
        pos="absolute"
        top="2" right="4"
        text="yellow-400 8 underline"
        @click.stop="warNotice = true"
      >
        Chiến báo
      </div>

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
            :buff="stateRunning.buff"
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
        :mid="playerInfo.mid"
        @change-battle="startEventPve(true)"
      />
    </div>
  </var-loading>
</template>
