<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBattleRoundStore, usePlayerStore } from '#imports'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'
import type { BattleResponse, TopDMG } from '~/types'

const {
  loading,
  state,
  receiver,
  realTime,
  battleRounds,
  battleResult,
  reward,
  refreshTime,
  inRefresh,
  SPEED,
} = storeToRefs(useBattleRoundStore())

const { playerInfo } = storeToRefs(usePlayerStore())
const { $io } = useNuxtApp()
const route = useRoute()

definePageMeta({
  middleware: ['game'],
})

const { startBattle } = useBattleRoundStore()

const queryTarget = computed(() => (route.query.target as string))
const queryTargetId = computed(() => (route.query.id as string))
const topDMG = ref<TopDMG[]>([])

let kind = ''

if (route.query.target === TARGET_TYPE.BOSS_DAILY)
  kind = BATTLE_KIND.BOSS_DAILY

if (route.query.target === TARGET_TYPE.BOSS_FRAME_TIME)
  kind = BATTLE_KIND.BOSS_FRAME_TIME

if (route.query.target === TARGET_TYPE.BOSS_ELITE)
  kind = BATTLE_KIND.BOSS_ELITE

$io.emit('battle:join', {
  kind,
  player: {
    userId: playerInfo.value?.userId,
  },
  target: {
    type: queryTarget.value,
    id: queryTargetId.value,
  },
})

$io.on('battle:start', async (war: BattleResponse) => {
  console.log('war', war)
  await startBattle(war)
})

$io.emit('battle:log', queryTargetId.value)
$io.on('send-battle:log', (topDMGResponse) => {
  topDMG.value = topDMGResponse
  console.log('send-battle:log', topDMGResponse)
})

onUnmounted(() => {
  $io.off('battle:start')
  $io.off('send-battle:log')
})

const doCloseBattleR = () => {
  battleResult.value.show = false
  return navigateTo('/')
}

const retry = () => {
  console.log('retry')
  battleResult.value.show = false
  $io.emit('battle:refresh')
}

const refreshFinished = () => {
  console.log('refreshFinished')
  $io.emit('battle:refresh')
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
  <LoadingScreen v-if="loading" />
  <div class="h-screen bg-white">
    <div class="h-[54%] bg-bg_pve bg-cover relative">
      <div class="bg-[#41466e] text-center py-2 text-base font-semibold flex items-center justify-center">
        <span class="text-white rounded text-12">
          [{{ state?.enemy?.name }} Map {{ playerInfo?.midId }}]
        </span>
      </div>
      <BattleAttributeInfo :state="state" />
      <div class="flex justify-around mt-8">
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
      <div class="absolute bottom-0 right-0 py-2">
        <var-button v-show="SPEED === 1" outline size="small" class="rounded mr-2 text-base font-semibold" @click="SPEED = 2">
          X1
        </var-button>
        <var-button v-show="SPEED === 2" outline size="small" class="rounded mr-2 text-base font-semibold" @click="SPEED = 1">
          X2
        </var-button>
      </div>
    </div>
    <div class="relative h-full">
      <nuxt-img class="h-full w-full object-cover absolute" format="webp" src="/index/bg_bottom.png" />
      <BattleHistory :battle-rounds="battleRounds" />
      <BattleTopDMG :top-d-m-g="topDMG" />
      <div class="flex items-center flex-col justify-center w-full fixed bottom-2">
        <BattleRevice
          v-if="inRefresh"
          :refresh-time="refreshTime"
          @refresh-finished="refreshFinished"
        />
        <div class="flex items-center gap-2">
          <var-button class="w-[80px] uppercase font-medium" size="small" type="default" @click.stop="navigateTo('/')">
            Về thành
          </var-button>
        </div>
      </div>
    </div>
  </div>
</template>
