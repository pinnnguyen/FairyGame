<script setup lang="ts">
import { Snackbar } from '@varlet/ui'
import { set } from '@vueuse/core'
import { sendMessage, useBattleRoundStore, usePlayerStore, useSoundRewardEvent } from '#imports'
import { BATTLE_KIND, ITEMS_NAME, ITEMS_QUALITY, TARGET_TYPE, tips } from '~/constants'
import type { BattleResponse } from '~/types'
import { randomNumber } from '~/common'

const {
  loading,
  state,
  receiver,
  playerEffect,
  realTime,
  battleResult,
  inRefresh,
  refreshTime,
  reward,
  speed,
  roundNum,
} = storeToRefs(useBattleRoundStore())

const { $io } = useNuxtApp()
const { startBattle, onStopBattle, onSkip } = useBattleRoundStore()
const { playerInfo } = storeToRefs(usePlayerStore())

const { loadPlayer } = usePlayerStore()
const battleWarResult = ref()
const battleRequest = useState<{
  id: number
  target: string
}>('battleRequest')

const isPve = computed(() => battleWarResult.value?.kind === 'pve')
const showBattleResult = computed(() => battleResult.value.show && !isPve.value)
const startPve = (skip: boolean) => {
  $io.emit('battle:join:pve', {
    skip,
    kind: BATTLE_KIND.PVE,
    player: {
      userId: playerInfo.value?.userId,
    },
    target: {
      type: TARGET_TYPE.MONSTER,
      id: playerInfo.value?.mid?.current?.monsterId,
    },
  })
}

const onRefresh = () => {
  startPve(false)
}

const resultRefresh = () => {
  startPve(false)
  console.log('resultRefresh')
}

const handleStartBattle = async (war: BattleResponse) => {
  console.log('war', war)
  set(battleWarResult, war)
  await startBattle(war, async () => {
    if (playerInfo.value) {
      playerInfo.value.gold += reward.value?.base.gold ?? 0
      playerInfo.value.exp += reward.value?.base.exp ?? 0
    }

    if (isPve.value) {
      Snackbar.allowMultiple(true)
      sendMessage(`Nhận Tiền Tiên x${reward.value?.base.gold}`, 3000, 'top')
      sendMessage(`Nhận Tu Vi x${reward.value?.base.exp}`, 3000, 'top')

      if (reward.value?.items && reward.value?.items.length > 0) {
        for (const item of reward.value?.items)
          sendMessage(`${item.name} x${item.quantity}`, 3000, 'top')
      }

      onRefresh()
    }

    await useSoundRewardEvent()
  })
}

startPve(false)
$io.on('battle:start:pve', async (war: BattleResponse) => {
  await handleStartBattle(war)
})

$io.on('battle:start:boss', async (war: BattleResponse) => {
  await handleStartBattle(war)
})

watch(battleRequest, (request) => {
  onStopBattle()
  set(loading, true)
  setTimeout(() => {
    $io.emit('battle:join:boss', {
      kind: request.target,
      player: {
        userId: playerInfo.value?.userId,
      },
      target: {
        type: request.target,
        id: request.id,
      },
    }, 2000)
  })
})

onUnmounted(async () => {
  $io.off('battle:start')
})

// const isWinner = computed(() => warResult.value?.winner === WINNER.youwin)
const changeBattle = async () => {
  try {
    set(loading, true)
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
    })

    onStopBattle()
    loadPlayer(player)
    set(loading, false)
    sendMessage('Qua ải thành công', 2000)
    startPve(true)
  }
  catch (e) {
    sendMessage('Hãy vượt ải trước đó để tiếp tục', 2000)
    set(loading, false)
  }
}
</script>

<template>
  <BattleResult
    v-if="showBattleResult"
    :reward="reward"
    :battle-result="battleResult"
    @on-refresh="resultRefresh"
  />
  <var-loading
    :loading="loading"
    size="mini"
    class="h-full"
    :description="tips[Math.round(randomNumber(0, tips.length))]"
    color="#f5f5f5"
  >
    <div
      class="flex justify-around relative w-full h-full duration-800 transition transition-color"
      :class="{ 'bg-[#053034]': !inRefresh && !isPve && battleWarResult }"
    >
      <div class="flex absolute top-[30%] items-center justify-around w-full">
        <BattlePlayerRealtime
          :player-effect="playerEffect"
          :state="state"
          :receiver="receiver"
          :real-time="realTime"
        />
        <BattleEnemyRealtime
          :player-effect="playerEffect"
          :state="state"
          :receiver="receiver"
          :real-time="realTime"
        />
      </div>
      <BattleRevice
        v-if="inRefresh"
        class="absolute top-0 text-primary"
        :refresh-time="refreshTime"
        @refresh-finished="onRefresh"
      />
    </div>
    <div class="h-10 absolute bottom-11 w-full flex items-center justify-end italic">
      <button v-show="speed === 1" class="text-8 mx-2 h-6 w-6 rounded italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu" @click="speed = 1.5">
        Tăng tốc
      </button>
      <button v-show="speed === 1.5" class="text-8 mx-2 h-6 w-6 rounded italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu" @click="speed = 1">
        Giảm tốc
      </button>
      <button
        v-if="roundNum > 3"
        class="mx-2 text-8 h-6 w-6 rounded italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu"
        @click.stop="onSkip"
      >
        Bỏ qua
      </button>
    </div>
    <div
      :class="{ 'bg-[#540905]': !inRefresh }"
      class="transition transition-color duration-800 h-10 absolute text-[#f5f5f5] bottom-0 bg-[#000000] w-full flex items-center justify-between italic"
    >
      <var-loading size="mini" color="#ffffff" :loading="!battleWarResult?.enemy?.name">
        <div class="text-12 ml-2">
          Mục tiêu: {{ battleWarResult?.enemy?.name }}
        </div>
      </var-loading>
      <var-loading v-if="isPve" size="mini" color="#ffffff" :loading="!playerInfo?.midId">
        <div class="text-12 flex items-center">
          <span class="mx-2">Hiện tại: thứ {{ playerInfo?.midId }} Ải</span>
          <button
            class="h-6 px-2 ml-1 shadow rounded mx-2 text-10 font-semibold text-white bg-[#841919] shadow italic"
            @click.stop="changeBattle"
          >
            Khiêu chiến
          </button>
        </div>
      </var-loading>
    </div>
  </var-loading>
</template>
