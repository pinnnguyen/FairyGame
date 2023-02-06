<script setup lang="ts">
import { Snackbar } from '@varlet/ui'
import { set } from '@vueuse/core'
import { sendMessage, useBattleRoundStore, usePlayerStore, useSoundRewardEvent } from '#imports'
import { BATTLE_KIND, TARGET_TYPE, tips } from '~/constants'
import type { BattleResponse } from '~/types'
import { randomNumber, sleep } from '~/common'

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

const isLoadBattle = ref(false)
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

const resultRefresh = async () => {
  // await sleep(2000)
  startPve(false)
  console.log('resultRefresh')
}

const handleStartBattle = async (war: BattleResponse) => {
  set(isLoadBattle, false)
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

watch(battleRequest, async (request) => {
  set(isLoadBattle, true)
  onStopBattle()
  await sleep(2000)
  // set(loading, true)
  $io.emit('battle:join:boss', {
    kind: request.target,
    player: {
      userId: playerInfo.value?.userId,
    },
    target: {
      type: request.target,
      id: request.id,
    },
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
      display="flex"
      justify="around"
      position="relative"
      w="full"
      h="full"
      :class="{ 'bg-[#163334]': (!inRefresh && !isPve && battleWarResult || isLoadBattle) }"
    >
      <nuxt-img
        v-if="isLoadBattle"
        format="webp"
        src="/battle/loading.png"
        w="35" h="35"
        position="absolute"
        class="transform-center"
        object="cover"
      />
      <div
        v-if="!isLoadBattle"
        display="flex"
        position="absolute"
        align="items-center"
        justify="around"
        w="full"
        class="top-[30%]"
      >
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
        top="0"
        text="primary"
        position="absolute"
        :refresh-time="refreshTime"
        @refresh-finished="onRefresh"
      />
    </div>
    <div
      h="10"
      position="absolute"
      bottom="11"
      w="full"
      display="flex"
      align="items-enter"
      justify="end"
      font="italic"
    >
      <button
        v-show="speed === 1"
        text="8"
        m="x-2"
        h="6"
        w="6"
        font="italic semibold"
        class="border-full-box bg-button-menu"
        @click="speed = 1.5"
      >
        Tăng tốc
      </button>
      <button
        v-show="speed === 1.5"
        text="8"
        m="x-2"
        h="6"
        w="6"
        font="italic semibold"
        class="border-full-box"
        @click="speed = 1"
      >
        Giảm tốc
      </button>
      <button
        v-if="roundNum > 3"
        text="8"
        m="x-2"
        h="6"
        w="6"
        font="italic semibold"
        class="border-full-box"
        @click.stop="onSkip()"
      >
        Bỏ qua
      </button>
    </div>
    <div
      :class="{ 'bg-[#540905]': !inRefresh }"
      transition="~ colors duration-800"
      h="10"
      position="absolute"
      bottom="0"
      w="full"
      display="flex"
      align="items-center"
      justify="between"
      text="gray-100"
      font="italic"
      bg="base"
    >
      <var-loading size="mini" color="#ffffff" :loading="!battleWarResult?.enemy?.name">
        <div class="text-12 ml-2">
          Mục tiêu: {{ battleWarResult?.enemy?.name }}
        </div>
      </var-loading>
      <var-loading v-if="isPve" size="mini" color="#ffffff" :loading="!playerInfo?.midId">
        <div
          text="12"
          display="flex"
          align="items-center"
        >
          <span
            m="x-2"
          >
            Hiện tại: thứ {{ playerInfo?.midId }} Ải
          </span>
          <button
            h="6"
            p="x-2"
            m="l-1 x-2"
            border="rounded"
            text="10 white"
            font="semibold italic"
            class="bg-[#841919]"
            @click.stop="changeBattle"
          >
            Khiêu chiến
          </button>
        </div>
      </var-loading>
    </div>
  </var-loading>
</template>
