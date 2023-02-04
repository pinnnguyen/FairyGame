<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Snackbar } from '@varlet/ui'
import { sendMessage, useBattleRoundStore, usePlayerStore, useSoundBattleEvent, useSoundRewardEvent } from '#imports'
import { BATTLE_KIND, BATTLE_TURN, TARGET_TYPE, WINNER } from '~/constants'
import type { BattleResponse } from '~/types'

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
} = storeToRefs(useBattleRoundStore())

const { $io } = useNuxtApp()
const { startBattle, onStop } = useBattleRoundStore()
const { playerInfo } = storeToRefs(usePlayerStore())

const { loadPlayer } = usePlayerStore()
const warResult = ref()

onMounted(() => {
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
    await startBattle(war, async () => {
      // $io.emit('fetch:player', playerInfo.value?.sid)
      playerInfo.value.gold += reward.value?.base.gold ?? 0
      playerInfo.value.exp += reward.value?.base.exp ?? 0

      Snackbar.allowMultiple(true)
      sendMessage(`Nhận Tiền Tiên x${reward.value?.base.gold}`, 3000, 'top')
      sendMessage(`Nhận Tu Vi x${reward.value?.base.exp}`, 3000, 'top')
      useSoundRewardEvent()

      $io.emit('battle:refresh', {
        skip: false,
      })
    })
  })
})

onUnmounted(async () => {
  $io.off('battle:start')
})

// const isWinner = computed(() => warResult.value?.winner === WINNER.youwin)
const refreshFinished = () => {
  console.log('refreshFinished')
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

    onStop()
    loadPlayer(player)
    loading.value = false
    $io.emit('battle:refresh', {
      skip: true,
    })
    sendMessage('Qua ải thành công', 2000)
  }
  catch (e) {
    sendMessage('Hãy vượt ải trước đó để tiếp tục', 2000)
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
  <var-loading :loading="loading" class="h-full" description="Đang tải trận chiến" color="#f5f5f5">
    <!--    <div class="bg-[#41466e] text-center py-2 text-base font-semibold flex items-center justify-center absolute w-full"> -->
    <!--      <div v-if="isWinner" class="absolute right-4 bg-white w-6 h-6 rounded-full"> -->
    <!--        <icon name="material-symbols:next-plan-rounded" size="25" @click="nextMid" /> -->
    <!--      </div> -->
    <!--      <span class="text-white rounded text-12"> -->
    <!--        [{{ state?.enemy?.name }} Map {{ playerInfo?.midId }}] -->
    <!--      </span> -->
    <!--    </div> -->
    <div class="flex justify-around absolute transform-center bottom-0 w-full top-[60%]">
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

      <BattleRevice
        v-if="inRefresh"
        class="absolute bottom-0 text-primary"
        :refresh-time="refreshTime"
        @refresh-finished="refreshFinished"
      />
    </div>
    <div class="h-10 absolute bottom-11 w-full flex items-center justify-end italic">
      <button v-show="speed === 1" class="mx-2 h-8 w-8 shadow rounded text-10 italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu" @click="speed = 1.5">
        Tăng tốc
      </button>
      <button v-show="speed === 1.5" class="mx-2 h-8 w-8 shadow rounded text-10 italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu" @click="speed = 1">
        Giảm tốc
      </button>
    </div>
    <div class="h-10 absolute bottom-0 bg-black w-full flex items-center justify-end italic">
      <div class="text-[#f5f5f5] text-12 flex items-center">
        <span class="mx-2">Hiện tại: thứ {{ playerInfo?.midId }} Ải</span>
        <button
          class="h-6 px-2 ml-1 shadow rounded mx-2 text-10 font-semibold text-white bg-[#841919] shadow italic"
          @click.stop="nextMid"
        >
          Khiêu chiến
        </button>
      </div>
    </div>
  </var-loading>
</template>
