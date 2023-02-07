<script setup lang="ts">
import { Snackbar } from '@varlet/ui'
import { set } from '@vueuse/core'
import { sendMessage, useBattleRoundStore, usePlayerStore, useSoundRewardEvent } from '#imports'
import { BATTLE_KIND, TARGET_TYPE, tips } from '~/constants'
import type { BattleResponse } from '~/types'
import { randomNumber } from '~/common'

const {
  loading,
  state,
  receiver,
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

const showBattleResult = computed({
  get() {
    return battleResult.value.show && !isPve.value
  },
  set(boo: boolean) {
    battleResult.value.show = boo
  },
})

$io.emit('battle:join:pve', {
  skip: false,
  kind: BATTLE_KIND.PVE,
  player: {
    userId: playerInfo.value?.userId,
  },
  target: {
    type: TARGET_TYPE.MONSTER,
    id: playerInfo.value?.mid?.current?.monsterId,
  },
})

const onRefresh = () => {
  console.log('battleRequest', battleRequest.value)
  $io.emit('battle:join:pve', {
    skip: false,
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

  $io.off('battle:start:pve')
  $io.on('battle:start:pve', async (war: BattleResponse) => {
    await handleStartBattle(war)
  })
}

const resultRefresh = async () => {
  set(loading, true)
  showBattleResult.value = false
  startPve(false)
}

$io.on('battle:start:pve', async (war: BattleResponse) => {
  await handleStartBattle(war)
})

watch(battleRequest, async (request) => {
  $io.off('battle:start:pve')
  $io.off('battle:start:daily')
  $io.off('battle:start:elite')

  console.log('request', request)
  set(isLoadBattle, true)
  // set(loading, true)

  const warRequest = {
    kind: request.target,
    player: {
      userId: playerInfo.value?.userId,
    },
    target: {
      type: request.target,
      id: request.id,
    },
  }

  onStopBattle()
  switch (request.target) {
    case 'boss_daily':
      setTimeout(() => {
        $io.emit('battle:join:daily', warRequest)
        $io.on('battle:start:daily', async (war: BattleResponse) => {
          console.log('war', war)
          await handleStartBattle(war)
        })
      }, 1000)

      break

    case 'boss_elite':
      setTimeout(() => {
        $io.emit('battle:join:elite', warRequest)
        $io.on('battle:start:elite', async (war: BattleResponse) => {
          console.log('war', war)
          await handleStartBattle(war)
        })
      }, 1000)

      break
  }
})

onUnmounted(async () => {
  $io.off('battle:start')
})

const changeBattle = async () => {
  try {
    set(loading, true)
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
    })

    onStopBattle()
    loadPlayer(player)
    startPve(true)
    set(loading, false)
    sendMessage('Qua ải thành công', 2000)
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
      flex="~ "
      justify="around"
      pos="relative"
      w="full"
      h="full"
      :class="{ 'bg-[#163334]': (!inRefresh && !isPve || isLoadBattle) }"
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
        flex="~ "
        pos="absolute"
        align="items-center"
        justify="around"
        w="full"
        class="top-[30%]"
      >
        <BattlePlayerRealtime
          :state="state"
          :receiver="receiver"
          :real-time="realTime"
        />
        <BattleEnemyRealtime
          :state="state"
          :receiver="receiver"
          :real-time="realTime"
        />
      </div>
      <BattleRevice
        v-if="inRefresh"
        top="0"
        text="primary"
        pos="absolute"
        :refresh-time="refreshTime"
        @refresh-finished="onRefresh"
      />
    </div>
    <div
      h="10"
      pos="absolute"
      bottom="11"
      w="full"
      flex="~ "
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
        class="border-full-box bg-button-menu"
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
        class="border-full-box bg-button-menu"
        @click.stop="onSkip"
      >
        Bỏ qua
      </button>
    </div>
    <div
      :class="{ '!bg-[#540905]': !inRefresh }"
      transition="~ colors duration-800"
      h="10"
      pos="absolute"
      bottom="0"
      w="full"
      flex="~ "
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
          flex="~ "
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
