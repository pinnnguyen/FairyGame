<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, useBattleRoundStore, usePlayerStore } from '#imports'
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

const showPlayerInfo = ref(false)
const showEnemyInfo = ref(false)

definePageMeta({
  middleware: ['game'],
})

onMounted(() => {
  console.log('battle mounted')
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

const refreshFinished = () => {
  $io.emit('battle:refresh')
}

const nextMid = async () => {
  console.log('next mid')
  try {
    loading.value = true
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
    })

    loadPlayer(player)
    loading.value = false
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
  <ClientOnly>
    <LazyPopupBattleResult
      v-if="battleResult.show"
      :battle-result="battleResult"
      :reward="reward"
      @close="doCloseBattleR"
    />
    <var-loading class="w-[calc(100vw_-_20px)]" description="Đang tải" type="circle" :loading="loading">
      <div class="h-[85vh] bg-white overflow-hidden">
        <div class="bg-bg_pve bg-cover relative h-full">
          <div class="text-center pt-2 text-base font-semibold flex items-center justify-center">
            <span class="bg-[#009688] text-white p-1 rounded text-12">
              [{{ playerInfo?.mid?.current?.name }}]
            </span>
          </div>
          <div class="flex justify-between p-2 pt-2">
            <div>
              <div class="flex items-center justify-start">
                <div class="flex items-center" @click="showPlayerInfo = !showPlayerInfo">
                  <NuxtImg format="webp" class="h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full" src="/pve/player-avatar.png" />
                </div>
              </div>
              <BattleInfo
                :name="state.player?.name"
                :hp="state.player?.hp"
                :damage="state.player?.damage"
                :def="state.player?.def"
              />
            </div>
            <div>
              <div class="flex items-center justify-end">
                <div class="flex justify-end" @click="showEnemyInfo = !showEnemyInfo">
                  <NuxtImg format="webp" class="h-[35px] bg-black border border-[#d0d0d0] bg-[#d0d0d0] rounded-full" src="/pve/monter-avatar.png" />
                </div>
              </div>
              <BattleInfo
                :name="state.enemy?.name"
                :hp="state.enemy?.hp"
                :damage="state.enemy?.damage"
                :def="state.enemy?.def"
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
          <!--
          <LazyPopupRefreshMid
            v-if="inRefresh"
            :refresh-time="refreshTime"
            @refresh-finished="refreshFinished"
          /> -->
        </div>
        <div class="relative">
          <!-- <NuxtImg class="h-full w-full object-cover absolute" format="webp" src="/index/bg_bottom.png" /> -->
          <!-- <div class="p-4 h-[25%] overflow-scroll">
            <BattleHistory :battle-rounds="battleRounds" />
          </div> -->
          <div class="flex items-center flex-col justify-center w-full absolute bottom-0">
            <LazyPopupRefreshMid
              v-if="inRefresh"
              :refresh-time="refreshTime"
              @refresh-finished="refreshFinished"
            />
            <div class="flex items-center gap-2">
              <!-- <var-button class="w-[80px] uppercase font-medium" size="small" type="default" @click="nextMid" @click.stop="navigateTo('/')">
                Về thành
              </var-button> -->
              <var-button class="w-[80px] uppercase font-medium" size="small" type="default" @click="nextMid">
                Ải tiếp
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
  </ClientOnly>
</template>
