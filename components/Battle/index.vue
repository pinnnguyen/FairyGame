<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, useBattleRoundStore, usePlayerStore, useSoundBattleEvent } from '#imports'
import { BATTLE_KIND, BATTLE_TURN, TARGET_TYPE, WINNER } from '~/constants'
import type { BattleResponse } from '~/types'

const {
  loading,
  state,
  receiver,
  playerEffect,
  realTime,
  battleRounds,
  battleResult,
  inRefresh,
  refreshTime,
  reward,
  speed,
  roundNum,
} = storeToRefs(useBattleRoundStore())

const { $io } = useNuxtApp()
const { startBattle, setSKIP } = useBattleRoundStore()
const { playerInfo } = storeToRefs(usePlayerStore())

const { loadPlayer } = usePlayerStore()
const warResult = ref()

$io.emit('battle:join', {
  kind: BATTLE_KIND.PVE,
  player: {
    userId: playerInfo.value?.userId,
  },
  target: {
    type: TARGET_TYPE.MONSTER,
    id: playerInfo.value?.mid?.current?.monsterId,
  },
})

$io.on('battle:start', async (war: BattleResponse) => {
  warResult.value = war
  await startBattle(war)
})

onUnmounted(async () => {
  $io.off('battle:start')
})

const isWinner = computed(() => warResult.value?.winner === WINNER.youwin)
const refreshFinished = () => {
  $io.emit('battle:refresh', {
    skip: false,
  })
}

const nextMid = async () => {
  try {
    loading.value = true
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
    })

    loadPlayer(player)
    loading.value = false
    $io.emit('battle:refresh', {
      skip: true,
    })
    sendMessage('Qua ải thành công')
  }
  catch (e) {
    sendMessage('Hãy vượt ải trước đó để tiếp tục')
    loading.value = false
  }
}

const doCloseBattleR = () => {
  battleResult.value.show = false
  // refreshFinished()
}

const retry = () => {
  battleResult.value.show = false
  refreshFinished()
}
</script>

<template>
  <PopupBattleResult
    v-if="battleResult.show"
    :battle-result="battleResult"
    :reward="reward"
    @retry="retry"
    @close="doCloseBattleR"
  />
  <var-loading :loading="loading" description="Đang tải trận chiến" color="#333">
    <div class="h-[80vh] bg-white overflow-hidden w-[calc(100vw_-_35px)]">
      <div class="relative h-[60%] relative">
        <nuxt-img format="webp" src="/pve/bg-pve.png" class="absolute top-0 h-full w-full" />
        <div class="bg-[#41466e] text-center py-2 text-base font-semibold flex items-center justify-center absolute w-full">
          <!--          <var-button class="w-[80px] uppercase font-medium absolute left-4" size="small" @click="nextMid"> -->
          <div v-if="isWinner" class="absolute right-4 bg-white w-6 h-6 rounded-full">
            <icon name="material-symbols:next-plan-rounded" size="25" @click="nextMid" />
          </div>
          <!--          </var-button> -->
          <span class="text-white rounded text-12">
            [{{ state?.enemy?.name }} Map {{ playerInfo?.midId }}]
          </span>
        </div>
        <BattleAttributeInfo class="absolute top-10 w-full" :receiver="receiver" :state="state" />
        <div class="flex justify-around absolute transform-center bottom-0 w-full top-[70%]">
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
      </div>
      <div
        class="relative h-[40%] bg-[#f3ebdb]"
      >
        <nuxt-img src="/pve/alert.png" format="webp" class="absolute top-0 w-full h-full object-fill" />
        <div class="p-4 h-full w-full absolute top-0 overflow-scroll scrollbar-hide">
          <BattleHistory :battle-rounds="battleRounds" />
        </div>
        <div class="flex items-center flex-col justify-center w-full absolute bottom-2">
          <BattleRevice
            v-if="inRefresh"
            :refresh-time="refreshTime"
            @refresh-finished="refreshFinished"
          />
          <div class="flex items-center gap-2">
            <button v-if="roundNum > 5" class="px-2 py-[2px] shadow rounded mr-2 text-10 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]" @click="setSKIP(true)">
              Bỏ qua
            </button>
            <div class="py-2">
              <button v-show="speed === 1" class="px-2 py-[2px] shadow rounded mr-2 text-10 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]" @click="speed = 2">
                Tăng tốc
              </button>
              <button v-show="speed === 2" class="px-2 py-[2px] shadow rounded mr-2 text-10 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]" @click="speed = 1">
                Giảm tốc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </var-loading>
</template>
