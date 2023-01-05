<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBattleRoundStore, usePlayerStore, useSocket } from '#imports'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'
import type { BattleResponse } from '~/types'
import { formatCash } from '~/common'

const {
  loading,
  state,
  receiver,
  playerEffect,
  realTime,
  battleRounds,
  battleResult,
  reward,
  refreshTime,
  inRefresh,
  rankDMG,
} = storeToRefs(useBattleRoundStore())

const { playerInfo } = storeToRefs(usePlayerStore())
const { _socket } = useSocket()
const route = useRoute()

definePageMeta({
  middleware: ['game'],
})

const { startBattle } = useBattleRoundStore()
const hasBossDaily = computed(() => route.query.target === 'boss-daily')
const queryTarget = computed(() => (route.query.target as string))
const queryTargetId = computed(() => (route.query.id as string))

const showPlayerInfo = ref(false)
const showEnemyInfo = ref(false)

onMounted(() => {
  _socket.emit('battle:join', `${playerInfo.value?._id}-battle-boss-daily`, {
    kind: queryTarget.value ? BATTLE_KIND.BOSS_FRAME_TIME : BATTLE_KIND.BOSS_DAILY,
    player: {
      userId: playerInfo.value?.userId,
    },
    target: {
      type: queryTarget.value ?? TARGET_TYPE.MONSTER,
      id: queryTargetId.value,
    },
  })

  _socket.on('battle:start', async (war: BattleResponse) => {
    console.log('war', war)
    await startBattle(war)
  })
})

onUnmounted(() => {
  console.log('battle:leave')
  _socket.emit('battle:leave')
})

// const refreshFinished = () => {
//   onRefreshFinished()
// }

const doCloseBattleR = () => {
  battleResult.value.show = false
  return navigateTo('/')
}

const retry = () => {
  console.log('retry')
  battleResult.value.show = false
  _socket.emit('battle:refresh')
}

const refreshFinished = () => {
  console.log('refreshFinished')
  _socket.emit('battle:refresh')
}
</script>

<template>
  <ClientOnly>
    <LazyPopupBattleResult
      v-if="battleResult.show"
      :battle-result="battleResult"
      :reward="reward"
      @close="doCloseBattleR"
      @retry="retry"
    />
    <loadingScreen v-if="loading" />
    <div v-else class="h-screen bg-white">
      <div class="h-[60%]  bg-bg_pve bg-cover">
        <div v-if="!hasBossDaily" class="text-center pt-2 text-base font-semibold flex items-center justify-center">
          [{{ state.enemy?.name }}]
        </div>
        <div class="flex justify-between p-2 pt-2">
          <div>
            <div class="flex items-center justify-start">
              <div class="flex items-center" @click="showPlayerInfo = !showPlayerInfo">
                <NuxtImg format="webp" class="h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full" src="/pve/player-avatar.png" />
              </div>
            </div>
            <BattleInfo
              v-if="showPlayerInfo"
              :name="state.player?.name"
              :hp="state.player?.hp"
              :damage="state.player?.damage"
              :def="state.player?.def"
              @close="showPlayerInfo = false"
            />
          </div>
          <div>
            <div class="flex items-center justify-end">
              <div class="flex justify-end" @click="showEnemyInfo = !showEnemyInfo">
                <NuxtImg format="webp" class="h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full" src="/pve/monter-avatar.png" />
              </div>
            </div>
            <BattleInfo
              v-if="showEnemyInfo"
              :name="state.enemy?.name"
              :hp="state.enemy?.hp"
              :damage="state.enemy?.damage"
              :def="state.enemy?.def"
              @close="showEnemyInfo = false"
            />
          </div>
        </div>
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
      <div class="flex items-end justify-end">
        <div class="h-[170px] overflow-auto w-[48%] bg-[#6879a3] mt-2 mx-2 rounded float-left">
          <p class="text-center text-base font-semibold">
            Lịch sử
          </p>
          <BattleHistory :battle-rounds="battleRounds" />
        </div>
        <div class="w-[80%] h-[170px] overflow-auto float-right bg-[#6879a3] mt-2 mx-2 rounded">
          <p class="text-center text-base font-semibold">
            Hạng sát thương
          </p>
          <div class="p-2 text-white">
            <div v-for="rank in rankDMG" :key="rank._id" class="flex justify-between mx-1 my-1">
              <span>(1) {{ rank._id }}</span> <span>{{ formatCash(rank.totalDamage) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center flex-col justify-center fixed w-full bottom-2">
        <LazyPopupRefreshMid
          v-if="inRefresh"
          :refresh-time="refreshTime"
          @refresh-finished="refreshFinished"
        />
        <div class="flex items-center">
          <ButtonCancel class="mx-2" class-name="h-[23px]" @click.stop="navigateTo('/')">
            <span class="z-9 text-10">
              Về thành
            </span>
          </ButtonCancel>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
