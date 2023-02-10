<script setup lang="ts">
import { Snackbar } from '@varlet/ui'
import { set } from '@vueuse/core'
import { sendMessage, useBattleEvents, useBattleRoundStore, usePlayerStore, useSoundRewardEvent } from '#imports'
import { TARGET_TYPE, WINNER, tips } from '~/constants'
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
const { loadPlayer } = usePlayerStore()

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
const isWin = computed(() => battleCurrently.value?.winner === WINNER.youwin)
const isEliteBoss = computed(() => battleCurrently.value?.kind === TARGET_TYPE.BOSS_ELITE)

// const showBattleResult = computed({
//   get() {
//     return battleResult.value.show && !isPve.value
//   },
//   set(boo: boolean) {
//     battleResult.value.show = boo
//   },
// })

const handleStartBattle = async (war: BattleResponse) => {
  set(shouldNextBattle, false)
  set(battleCurrently, war)

  await fn.startBattle(war, async () => {
    if (playerInfo.value) {
      playerInfo.value.gold += stateRunning.value.reward?.base.gold ?? 0
      playerInfo.value.exp += stateRunning.value.reward?.base.exp ?? 0
    }

    if (isPve.value) {
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
  $io.on('battle:start:pve', async (war: BattleResponse) => {
    await handleStartBattle(war)
  })
}

const onEventRefresh = () => {
  // set(showBattleResult, false)
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

$io.on('battle:start:pve', async (war: BattleResponse) => {
  await handleStartBattle(war)
})

watch(battleRequest, async (request) => {
  set(shouldNextBattle, true)
  offAllEvent()
  fn.stopBattle()

  switch (request.target) {
    case 'boss_daily':
      setTimeout(() => {
        useEventDaily()
        $io.on('battle:start:daily', async (war: BattleResponse) => {
          console.log('war', war)
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
})

onUnmounted(async () => {
  $io.off('battle:start')
  offAllEvent()
})

const changeBattle = async () => {
  try {
    set(loading, true)
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
    })

    fn.stopBattle()
    loadPlayer(player)
    startEventPve(true)
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
  <!--  <BattleResult -->
  <!--    v-if="showBattleResult" -->
  <!--    :reward="reward" -->
  <!--    :battle-result="battleResult" -->
  <!--    @on-refresh="onEventRefresh" -->
  <!--  /> -->
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
          <battle-player-realtime
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
    <battle-controls @on-back="startEventPve" />
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
      <var-loading v-if="isPve" size="mini" color="#ffffff" :loading="!playerInfo?.midId">
        <div
          text="10"
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
