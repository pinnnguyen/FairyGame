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
const battleHistory = ref(false)
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
  <var-popup v-model:show="battleHistory" position="bottom">
    <BattleHistory :battle-rounds="battleRounds" />
  </var-popup>
  <var-loading :loading="loading" description="Đang tải trận chiến" color="#333">
    <div class="h-[75vh] bg-white overflow-hidden w-[calc(100vw_-_35px)]">
      <div class="bg-white/70 relative h-full">
        <div class="bg-[#41466e] text-center py-2 text-base font-semibold flex items-center justify-center">
          <div class="absolute left-4 w-6 h-6 bg-white rounded-full flex items-center justify-center" @click="battleHistory = true">
            <icon name="ion:bar-chart" />
          </div>
          <!--          <var-button class="w-[80px] uppercase font-medium absolute left-4" size="small" @click="nextMid"> -->
          <div v-if="isWinner" class="absolute right-4 bg-white w-6 h-6 rounded-full">
            <icon name="material-symbols:next-plan-rounded" size="25" @click="nextMid" />
          </div>
          <!--          </var-button> -->
          <span class="text-white rounded text-12">
            [{{ state?.enemy?.name }} Map {{ playerInfo?.midId }}]
          </span>
        </div>
        <p v-if="roundNum > 0" class="py-2 text-center">
          Lượt {{ roundNum }}
        </p>
        <p v-else class="py-2 text-center">
          ...
        </p>
        <BattleAttributeInfo :state="state" />
        <div class="flex justify-around mt-8">
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
      <div class="relative">
        <!-- <nuxt-img class="h-full w-full object-cover absolute" format="webp" src="/index/bg_bottom.png" /> -->
        <!-- <div class="p-4 h-[25%] overflow-scroll">
            <BattleHistory :battle-rounds="battleRounds" />
          </div> -->
        <div class="flex items-center flex-col justify-center w-full absolute bottom-0">
          <BattleRevice
            v-if="inRefresh"
            :refresh-time="refreshTime"
            @refresh-finished="refreshFinished"
          />
          <div class="flex items-center gap-2">
            <var-button v-if="roundNum > 5" size="small" class="rounded mr-2 text-base font-semibold" @click="setSKIP(true)">
              Bỏ qua
            </var-button>
            <div class="py-2">
              <var-button v-show="speed === 1" size="small" class="rounded mr-2 text-base font-semibold" @click="speed = 2">
                X1
              </var-button>
              <var-button v-show="speed === 2" size="small" class="rounded mr-2 text-base font-semibold" @click="speed = 1">
                X2
              </var-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </var-loading>
</template>
