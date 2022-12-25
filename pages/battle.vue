<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBattleRoundStore } from '#imports'
import { BATTLE_TURN } from '~/constants/war'

const {
  loading,
  state,
  receiver,
  playerEffect,
  realTime,
  battleRounds,
} = storeToRefs(useBattleRoundStore())

definePageMeta({
  middleware: ['game'],
})
</script>

<template>
  <loadingScreen v-if="loading" />
  <div v-else class="h-screen bg-white">
    <div class="text-center pt-2 font-semibold">
      [Bắt đầu chiến đấu]
    </div>

    <div class="h-[60%]">
      <div class="flex justify-between p-2 pt-2">
        <div>
          <div>
            <span class="pb-[2px] font-medium">{{ state?.player?.name }} [lv:{{ state?.player?.level }}]</span>
            <div class="flex items-center">
              <NuxtImg format="webp" class="h-[40px]" src="/pve/player-avatar.png" />
            </div>
          </div>

          <div class="mt-2">
            <div class="flex items-center justify-start">
              <span class="pr-2">
                HP
              </span>
              <div class="h-3 w-28 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-2 w-full rounded-full bg-red-600"
                  :style="{
                    width: `${(receiver?.player?.hp * state?.player?.hp) / 100}%`,
                  }"
                />
              </div>
            </div>
            <div class="flex items-center justify-start">
              <span class="pr-2">
                MP
              </span>
              <div class="h-3 w-28 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-2 w-full rounded-full bg-blue-600"
                  :style="{
                    width: `${(receiver?.player?.mp * state?.player?.mp) / 100}%`,
                  }"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-start mt-2">
            Công kích:({{ state?.player?.damage }})<br>
            Phòng ngự:({{ state?.player?.def }})<br>
          </div>
        </div>
        <div>
          <div>
            <span class="pb-[2px] font-medium">{{ state?.enemy?.name }} [lv:{{ state?.enemy?.level }}]</span>

            <div class="flex justify-end">
              <NuxtImg format="webp" class="h-[40px]" src="/pve/monter-avatar.png" />
            </div>
          </div>

          <div class="mt-2">
            <div class="flex items-center justify-end">
              <div class="h-3 w-28 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-2 w-full rounded-full bg-red-600 duration-500"
                  :style="{
                    width: `${(receiver?.enemy?.hp * state?.enemy?.hp) / 100}%`,
                  }"
                />
              </div>
              <span class="pl-2">
                HP
              </span>
            </div>
            <div class="flex items-center justify-end">
              <div class="h-3 w-28 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-2 w-full rounded-full bg-blue-600 duration-500"
                  :style="{
                    width: `${(receiver?.enemy?.mp * state?.enemy?.mp) / 100}%`,
                  }"
                />
              </div>
              <span class="pl-2">
                MP
              </span>
            </div>
          </div>
          <div class="flex justify-end mt-2">
            Công kích:({{ state?.enemy?.damage }})<br>
            Phòng ngự:({{ state?.enemy?.def }})<br>
          </div>
        </div>
      </div>
      <div class="flex justify-around mt-8">
        <div
          class="relative duration-500 transition-transform" :style="{
            transform: playerEffect === BATTLE_TURN.PLAYER ? 'translate(50%)' : '',
          }"
        >
          <span class="font-semibold text-2xl text-red-500 battle-damage" :class="{ show: realTime.player.trueDamage }">
            -{{ realTime.player.dmg }}
          </span>
          <NuxtImg format="webp" class="h-[160px]" src="/pve/player.png" />
        </div>
        <div
          class="relative duration-500 transition-transform" :style="{
            transform: playerEffect === BATTLE_TURN.ENEMY ? 'translate(-50%)' : '',
          }"
        >
          <span class="font-semibold text-2xl text-red-500 battle-damage" :class="{ show: realTime.enemy.trueDamage }">
            -{{ realTime.enemy.dmg }}
          </span>
          <NuxtImg format="webp" class="h-[160px]" src="/pve/monter.png" />
        </div>
      </div>
    </div>
    <div class="p-4 h-[35%] overflow-scroll">
      <h2 class="text-center font-semibold text-xl pb-2">
        Chiến đấu
      </h2>
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
  </div>
</template>
