<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, useBattleRoundStore, usePlayerStore, useSocket } from '#imports'
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
} = storeToRefs(useBattleRoundStore())

const { startBattle } = useBattleRoundStore()
const { playerInfo } = storeToRefs(usePlayerStore())
const { loadPlayer } = usePlayerStore()
const { _socket } = useSocket()

const showPlayerInfo = ref(false)
const showEnemyInfo = ref(false)

definePageMeta({
  middleware: ['game'],
})

onMounted(() => {
  console.log('battle mounted')
  _socket.emit('battle:join', `${playerInfo.value?._id}-battle-pve`, {
    kind: BATTLE_KIND.PVE,
    player: {
      userId: playerInfo.value?.userId,
    },
    target: {
      type: TARGET_TYPE.MONSTER,
      id: playerInfo.value?.mid?.current?.monsterId,
    },
  })

  _socket.on('battle:start', async (war: BattleResponse) => {
    await startBattle(war)
  })
})

const refreshFinished = () => {
  _socket.emit('battle:refresh')
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
    <loadingScreen v-if="loading" />
    <div v-else class="h-screen bg-white">
      <div class="h-[40%] bg-bg_pve bg-cover">
        <div class="text-center pt-2 text-base font-semibold flex items-center justify-center">
          [{{ playerInfo?.mid?.current?.name }}]
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
                <NuxtImg format="webp" class="h-[35px] bg-black border border-[#d0d0d0] bg-[#d0d0d0] rounded-full" src="/pve/monter-avatar.png" />
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
      <div class="relative h-full">
        <NuxtImg class="h-full w-full object-cover absolute" format="webp" src="/index/bg_bottom.png" />
        <div class="p-4 h-[25%] overflow-scroll">
          <BattleHistory :battle-rounds="battleRounds" />
        </div>
        <div class="flex items-center flex-col justify-center w-full fixed bottom-2">
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
            <ButtonConfirm class="mx-2" @click="nextMid">
              <span class="z-9 text-10">
                Ải tiếp
              </span>
            </ButtonConfirm>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
