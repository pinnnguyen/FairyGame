<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import { useBattleRoundStore, usePlayerStore } from '#imports'
import { BATTLE_TURN, TARGET_TYPE } from '~/constants'

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
  queryTarget,
} = storeToRefs(useBattleRoundStore())

const { onRefreshFinished } = useBattleRoundStore()
const { playerInfo } = storeToRefs(usePlayerStore())
const { loadPlayer } = usePlayerStore()
const toast = useToast()

definePageMeta({
  middleware: ['game'],
})

const refreshFinished = () => {
  onRefreshFinished()
}

const nextMid = async () => {
  try {
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
      headers: (useRequestHeaders(['cookie']) as any),
    })

    loadPlayer(player)
  }
  catch (e) {
    toast.info('Hãy vượt ải trước đó để tiếp tục')
  }
}
const doCloseBattleR = () => {
  battleResult.value.show = false
  if (queryTarget.value === TARGET_TYPE.BOSS_DAILY)
    return navigateTo('/')
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
      <div class="h-[60%]">
        <div class="text-center pt-2 text-base font-semibold flex items-center justify-center">
          [{{ playerInfo.mid.current.name }}]
        </div>
        <div class="flex justify-between p-2 pt-2">
          <div>
            <div class="flex items-center justify-start">
              <div class="flex items-center">
                <NuxtImg format="webp" class="h-[40px]" src="/pve/player-avatar.png" />
              </div>
            </div>
            <div class="flex justify-start flex-col mt-2 text-10">
              <span class="pb-[2px] font-medium">{{ state?.player?.name }}</span>
              <p>
                Sinh lực: {{ state?.player?.hp }}
              </p>
              <p>
                Công kích {{ state?.player?.damage }}
              </p>
              <p>
                Phòng ngự {{ state?.player?.def }}
              </p>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-end">
              <div class="flex justify-end">
                <NuxtImg format="webp" class="h-[40px]" src="/pve/monter-avatar.png" />
              </div>
            </div>
            <div class="flex justify-end mt-2 items-end flex-col text-10">
              <span class="pb-[2px] font-medium">{{ state?.enemy?.name }}</span>
              <p>
                {{ state?.enemy?.hp }} Sinh lực
              </p>
              <p>
                {{ state?.enemy?.damage }} Công kích
              </p>
              <p>
                {{ state?.enemy?.def }} Phòng ngự
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-around mt-8">
          <div
            class="relative duration-500 transition-transform" :style="{
              transform: playerEffect === BATTLE_TURN.PLAYER ? 'translate(30%)' : '',
            }"
          >
            <span class="text-10 text-2xl text-red-500 battle-damage" :class="{ show: realTime.player.trueDamage }">
              -{{ realTime.player.dmg }}
            </span>
            <NuxtImg format="webp" class="h-[100px]" src="/pve/player.png" />
            <BattleStatusBar :receiver-hp="receiver?.player?.hp" :hp="state.player.hp" :receiver-mp="receiver?.player?.mp" :mp="state.player.mp" />
          </div>
          <div
            class="relative duration-500 transition-transform" :style="{
              transform: playerEffect === BATTLE_TURN.ENEMY ? 'translate(-30%)' : '',
            }"
          >
            <span class="text-10 text-2xl text-red-500 battle-damage" :class="{ show: realTime.enemy.trueDamage }">
              -{{ realTime.enemy.dmg }}
            </span>
            <NuxtImg format="webp" class="h-[100px]" src="/pve/monter.png" />
            <BattleStatusBar :receiver-hp="receiver?.enemy?.hp" :hp="state.enemy.hp" :receiver-mp="receiver?.enemy?.mp" :mp="state.enemy.mp" />
          </div>
        </div>
      </div>
      <div class="p-4 h-[25%] overflow-scroll">
        <BattleHisrory />
      </div>
      <div class="flex items-center flex-col justify-center fixed w-full bottom-2">
        <LazyPopupRefreshMid
          v-if="inRefresh"
          :refresh-time="refreshTime"
          @refreshFinished="refreshFinished"
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
  </ClientOnly>
</template>
