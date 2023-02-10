<script setup lang="ts">
import { Snackbar } from '@varlet/ui'
import { set } from '@vueuse/core'
import { sendMessage, useBattleEvents, useBattleRoundStore, usePlayerStore, useSoundRewardEvent } from '#imports'
import { TARGET_TYPE, tips } from '~/constants'
import type { BattleResponse } from '~/types'
import { randomNumber } from '~/common'

const {
  match,
  loading,
  refresh,
  stateRunning,
  speed,
  roundNum,
} = storeToRefs(useBattleRoundStore())

const { $io } = useNuxtApp()
const { fn } = useBattleRoundStore()
const { playerInfo } = storeToRefs(usePlayerStore())

const {
  useEventPve,
  useEventElite,
  useEventDaily,
  offAllEvent,
} = useBattleEvents()

const battleCurrently = ref()
const battleRequest = useState<{
  id: number
  target: string
}>('battleRequest')

const shouldNextBattle = ref(false)
const isPve = computed(() => battleCurrently.value?.kind === 'pve')
const isWin = computed(() => battleCurrently.value?.winner === playerInfo.value?._id)
const isEliteBoss = computed(() => battleCurrently.value?.kind === TARGET_TYPE.BOSS_ELITE)
const shouldBattleResult = ref(false)

const handleStartBattle = async (battleRes: BattleResponse) => {
  set(shouldNextBattle, false)
  set(battleCurrently, battleRes)

  await fn.startBattle(battleRes, async () => {
    console.log('end battle')
    set(shouldBattleResult, true)
    if (playerInfo.value) {
      playerInfo.value.gold += stateRunning.value.reward?.base.gold ?? 0
      playerInfo.value.exp += stateRunning.value.reward?.base.exp ?? 0
    }

    if (isPve.value) {
      set(shouldNextBattle, false)
      Snackbar.allowMultiple(true)
      sendMessage(`Nhận Tiền Tiên x${stateRunning.value.reward?.base.gold}`, 3000, 'top')
      sendMessage(`Nhận Tu Vi x${stateRunning.value.reward?.base.exp}`, 3000, 'top')

      if (stateRunning.value.reward?.items && stateRunning.value.reward?.items.length > 0) {
        for (const item of stateRunning.value.reward?.items)
          sendMessage(`${item.name} x${item.quantity}`, 3000, 'top')
      }

      useEventPve()
    }

    await useSoundRewardEvent()
  })
}

const startEventPve = (skip: boolean) => {
  fn.stopBattle()
  useEventPve(skip)
  $io.off('battle:start:pve')
  $io.on('battle:start:pve', async (battleRes: BattleResponse) => {
    await handleStartBattle(battleRes)
  })
}

const onEventRefresh = () => {
  set(shouldNextBattle, false)
  if (isWin.value) {
    startEventPve(false)
    return
  }

  switch (battleRequest.value?.target) {
    case TARGET_TYPE.BOSS_ELITE:
      set(loading, true)
      console.log('onEventRefresh')
      useEventElite()
      break

    default:
      useEventPve()
  }
}

watch(battleRequest, async (request) => {
  set(shouldBattleResult, false) // Todo: Hidden popup result
  set(shouldNextBattle, true) // Todo: loading screen battle
  offAllEvent() // Todo: Off all event pve, boss daily ...
  fn.stopBattle() // Todo: stop trận đánh nếu có đang được đánh chưa xong

  switch (request.target) {
    case 'boss_daily':
      setTimeout(() => {
        useEventDaily()
        $io.on('battle:start:daily', async (war: BattleResponse) => {
          await handleStartBattle(war)
        })
      }, 1000)

      break

    case 'boss_elite':
      setTimeout(() => {
        useEventElite()
        $io.on('battle:start:elite', async (war: BattleResponse) => {
          console.log('elite war', war)
          await handleStartBattle(war)
        })
      }, 1000)

      break
  }
})

onMounted(() => {
  useEventPve()

  $io.on('battle:start:pve', async (war: BattleResponse) => {
    await handleStartBattle(war)
  })
})

onUnmounted(async () => {
  $io.off('battle:start')
  offAllEvent()
})
</script>

<template>
  <battle-result
    v-if="shouldBattleResult && !isPve"
    :reward="stateRunning.reward"
    :is-win="isWin"
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
      :class="{ 'bg-[#163334]': (!refresh?.inRefresh && !isPve || shouldNextBattle) }"
    >
      <nuxt-img
        v-if="shouldNextBattle"
        format="webp"
        src="/battle/loading.png"
        w="35" h="35"
        pos="absolute"
        class="transform-center"
        object="cover"
      />
      <div
        v-if="!shouldNextBattle"
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
      :is-elite-boss="isEliteBoss"
      @on-back="startEventPve"
    />
    <div
      :class="{ '!bg-[#540905]': !refresh?.inRefresh }"
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
        :is-pve="isPve"
        :mid-id="playerInfo.midId"
        @chang-battle="startEventPve(true)"
      />
    </div>
  </var-loading>
</template>
