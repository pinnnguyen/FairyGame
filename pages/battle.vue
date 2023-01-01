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
    return navigateTo('/boss-daily')
}
</script>

<template>
  <LazyPopupBattleResult
    v-if="battleResult.show"
    :battle-result="battleResult"
    :reward="reward"
    @close="doCloseBattleR"
  />
  <loadingScreen v-if="loading" />
  <div v-else class="h-screen bg-white">
    <div class="h-[60%] bg-pve bg-cover">
      <div class="text-center pt-2 font-semibold flex items-center justify-center">
        [{{ playerInfo.mid.current.name }}]
      </div>
      <div class="flex justify-between p-2 pt-2">
        <div>
          <div class="flex items-center justify-start">
            <div class="flex items-center">
              <NuxtImg format="webp" class="h-[40px]" src="/pve/player-avatar.png" />
            </div>
            <span class="pb-[2px] font-medium">{{ state?.player?.name }} [lv:{{ state?.player?.level }}]</span>
          </div>
          <div class="mt-2">
            <div class="flex items-center justify-start">
              <span class="pr-2 font-semibold">
                HP
              </span>
              <div class="h-[10px] w-28 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-[7px] w-full rounded-full bg-red-600"
                  :style="{
                    width: `${(receiver?.player?.hp / state?.player?.hp) * 100}%`,
                  }"
                />
              </div>
            </div>
            <div class="flex items-center justify-start">
              <span class="pr-2 font-semibold">
                MP
              </span>
              <div class="h-[10px] w-28 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-[7px] w-full rounded-full bg-blue-600"
                  :style="{
                    width: `${(receiver?.player?.mp / state?.player?.mp) * 100}%`,
                  }"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-start mt-2 font-semibold">
            Công kích: ({{ state?.player?.damage }})<br>
            Phòng ngự: ({{ state?.player?.def }})<br>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-start">
            <span class="pb-[2px] font-medium">{{ state?.enemy?.name }} [lv:{{ state?.enemy?.level }}]</span>
            <div class="flex justify-end">
              <NuxtImg format="webp" class="h-[40px]" src="/pve/monter-avatar.png" />
            </div>
          </div>
          <div class="mt-2">
            <div class="flex items-center justify-end">
              <div class="h-[10px] w-28 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-[7px] w-full rounded-full bg-red-600 duration-500"
                  :style="{
                    width: `${(receiver?.enemy?.hp / state?.enemy?.hp) * 100}%`,
                  }"
                />
              </div>
              <span class="pl-2 font-semibold">
                HP
              </span>
            </div>
            <div class="flex items-center justify-end">
              <div class="h-[10px] w-28 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-[7px] w-full rounded-full bg-blue-600 duration-500"
                  :style="{
                    width: `${(receiver?.enemy?.mp / state?.enemy?.mp) * 100}%`,
                  }"
                />
              </div>
              <span class="pl-2 font-semibold">
                MP
              </span>
            </div>
          </div>
          <div class="flex justify-end mt-2 font-semibold">
            Công kích: ({{ state?.enemy?.damage }})<br>
            Phòng ngự: ({{ state?.enemy?.def }})<br>
          </div>
        </div>
      </div>
      <div class="flex justify-around mt-8">
        <div
          class="relative duration-500 transition-transform" :style="{
            transform: playerEffect === BATTLE_TURN.PLAYER ? 'translate(30%)' : '',
          }"
        >
          <span class="font-semibold text-2xl text-red-500 battle-damage" :class="{ show: realTime.player.trueDamage }">
            -{{ realTime.player.dmg }}
          </span>
          <NuxtImg format="webp" class="h-[160px]" src="/pve/player.png" />
        </div>
        <div
          class="relative duration-500 transition-transform" :style="{
            transform: playerEffect === BATTLE_TURN.ENEMY ? 'translate(-30%)' : '',
          }"
        >
          <span class="font-semibold text-2xl text-red-500 battle-damage" :class="{ show: realTime.enemy.trueDamage }">
            -{{ realTime.enemy.dmg }}
          </span>
          <NuxtImg format="webp" class="h-[160px]" src="/pve/monter.png" />
        </div>
      </div>
    </div>
    <div class="p-4 h-[23%] overflow-scroll">
      <div v-for="(round, index) in battleRounds" :key="index" class="mb-2 border-b border-gray-300">
        <h3 class="font-semibold">
          [Lượt {{ round.roundNum }}]
        </h3>
        <strong>
          {{ round.turn === BATTLE_TURN.PLAYER ? 'Bạn' : 'Muc Tiêu' }}
        </strong> gây
        <strong class="text-red-600">
          {{ round.damage }}
        </strong>
        sát thương lên
        <strong>{{ round.turn === BATTLE_TURN.PLAYER ? 'Mục tiêu' : 'Bạn' }}</strong>
      </div>
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
</template>
