<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, useBattleRoundStore, usePlayerStore, useSoundBattleEvent } from '#imports'
import { BATTLE_KIND, BATTLE_TURN, TARGET_TYPE } from '~/constants'
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
} = storeToRefs(useBattleRoundStore())

const { startBattle } = useBattleRoundStore()
const { playerInfo } = storeToRefs(usePlayerStore())
const { loadPlayer } = usePlayerStore()
const { $io } = useNuxtApp()

onMounted(() => {
  // useSoundBattleEvent().play()
  // useSoundBattleEvent().loop = true
  $io.emit('battle:join', `${playerInfo.value?._id}-battle-pve`, {
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
    await startBattle(war)
  })
})

onUnmounted(() => {
  // console.log('pause')
  // useSoundBattleEvent().pause()
})

const refreshFinished = () => {
  $io.emit('battle:refresh')
}

const nextMid = async () => {
  try {
    loading.value = true
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
    })

    loadPlayer(player)
    loading.value = false
    sendMessage('Qua ải thành công')
  }
  catch (e) {
    sendMessage('Hãy vượt ải trước đó để tiếp tục')
    loading.value = false
  }
}

const doCloseBattleR = () => {
  battleResult.value.show = false
  refreshFinished()
}
</script>

<template>
  <PopupBattleResult
    v-if="battleResult.show"
    :battle-result="battleResult"
    :reward="reward"
    @close="doCloseBattleR"
  />
  <var-loading :loading="loading" description="Đang tải trận chiến" color="#333">
    <div class="h-[75vh] bg-white overflow-hidden w-[calc(100vw_-_20px)]">
      <div class="bg-bg_pve bg-cover relative h-full">
        <div class="text-center pt-2 text-base font-semibold flex items-center justify-center">
          <span class="bg-[#009688] text-white p-1 rounded text-12">
            [{{ state?.enemy?.name }} Map {{ playerInfo?.midId }}]
          </span>
        </div>
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
            <var-button class="w-[80px] uppercase font-medium" size="small" type="default" @click="nextMid">
              QUA ẢI
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
