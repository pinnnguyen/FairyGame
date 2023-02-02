<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Snackbar } from '@varlet/ui'
import { sendMessage, useBattleRoundStore, usePlayerStore, useSoundBattleEvent } from '#imports'
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
const { startBattle, setSKIP } = useBattleRoundStore()
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
    await startBattle(war, () => {
      Snackbar.allowMultiple(true)
      sendMessage(`Nhận Tiền Tiên x${reward.value?.base.gold}`, 2000, 'top')
      sendMessage(`Nhận Tu Vi x${reward.value?.base.exp}`, 200, 'top')
      $io.emit('battle:refresh', {
        skip: false,
      })
    })
  })
})

onUnmounted(async () => {
  $io.off('battle:start')
})

const isWinner = computed(() => warResult.value?.winner === WINNER.youwin)
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
        <span>Hiện tại: thứ {{ playerInfo?.midId }} Ải</span>
        <button class="h-6 px-2 ml-1 shadow rounded mr-2 text-10 font-semibold text-white border-2 border-[#040404] bg-[#841919]">
          Khiêu chiến
        </button>
      </div>
    </div>
    <!--    <div -->
    <!--      class="relative h-[40%] bg-[#f3ebdb]" -->
    <!--    > -->
    <!--      <nuxt-img src="/pve/alert.png" format="webp" class="absolute top-0 w-full h-full object-fill" /> -->
    <!--      &lt;!&ndash;        <div class="p-4 h-full w-full absolute top-0 overflow-scroll scrollbar-hide"> &ndash;&gt; -->
    <!--      &lt;!&ndash;          <BattleHistory :battle-rounds="battleRounds" /> &ndash;&gt; -->
    <!--      &lt;!&ndash;        </div> &ndash;&gt; -->
    <!--      <div class="flex items-center flex-col justify-center w-full absolute bottom-2"> -->
    <!--        <BattleRevice -->
    <!--          v-if="inRefresh" -->
    <!--          :refresh-time="refreshTime" -->
    <!--          @refresh-finished="refreshFinished" -->
    <!--        /> -->
    <!--        &lt;!&ndash;          <div class="flex items-center gap-2"> &ndash;&gt; -->
    <!--        &lt;!&ndash;            <button v-if="roundNum > 5" class="px-2 py-[2px] shadow rounded mr-2 text-10 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]" @click="setSKIP(true)"> &ndash;&gt; -->
    <!--        &lt;!&ndash;              Bỏ qua &ndash;&gt; -->
    <!--        &lt;!&ndash;            </button> &ndash;&gt; -->
    <!--        &lt;!&ndash;            <div class="py-2"> &ndash;&gt; -->
    <!--        &lt;!&ndash;              <button v-show="speed === 1" class="px-2 py-[2px] shadow rounded mr-2 text-10 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]" @click="speed = 2"> &ndash;&gt; -->
    <!--        &lt;!&ndash;                Tăng tốc &ndash;&gt; -->
    <!--        &lt;!&ndash;              </button> &ndash;&gt; -->
    <!--        &lt;!&ndash;              <button v-show="speed === 2" class="px-2 py-[2px] shadow rounded mr-2 text-10 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]" @click="speed = 1"> &ndash;&gt; -->
    <!--        &lt;!&ndash;                Giảm tốc &ndash;&gt; -->
    <!--        &lt;!&ndash;              </button> &ndash;&gt; -->
    <!--        &lt;!&ndash;            </div> &ndash;&gt; -->
    <!--        &lt;!&ndash;          </div> &ndash;&gt; -->
    <!--      </div> -->
    <!--    </div> -->
  </var-loading>
</template>
