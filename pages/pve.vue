<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '#imports'
import { TURN } from '~/constants/war'
import type { BaseProperties, WarResponse } from '~/types/war'
import { sleep } from '~/common'

const { playerInfo } = storeToRefs(usePlayerStore())

definePageMeta({
  middleware: ['game'],
})

const state = ref<{
  player?: BaseProperties
  enemy?: BaseProperties
  receiver?: {
    player: {
      hp: number
      mp: number
    }
    enemy: {
      hp: number
      mp: number
    }
  }
}>({})

const receiver = ref<
    {
      player: {
        hp: number
        mp: number
      }
      enemy: {
        hp: number
        mp: number
      }
    }>()

const { data: war } = await useAsyncData<WarResponse>('war', () => $fetch('/api/war', {
  method: 'POST',
  body: {
    kind: 'solo',
    player: {
      userId: playerInfo.value.userId,
    },
    target: {
      type: 'monster',
      id: playerInfo.value?.mid?.current?.monsterId,
    },
  },
}), {
  server: false,
})

if (war.value) {
  state.value.player = war.value.player
  state.value.enemy = war.value.enemy

  receiver.value = {
    player: {
      hp: state.value.player?.hp,
      mp: state.value.player?.mp,
    },
    enemy: {
      hp: state.value.enemy?.hp,
      mp: state.value.enemy?.mp,
    },
  }

  for (const emulator of war.value.emulators) {
    await sleep(2000)
    if (war.value?.firstTurn === TURN.PLAYER) {
      if (emulator.player.action === 'attack') {
        const DMG = emulator.player?.state?.damage
        console.log('PLAYER DMG', DMG)
        receiver.value.enemy.hp -= DMG
      }

      if (emulator.enemy.action === 'attack') {
        const DMG = emulator.enemy?.state?.damage
        console.log('ENEMY DMG', DMG)
        receiver.value.player.hp -= DMG
      }
    }
  }
}
</script>

<template>
  <div class="h-screen bg-white">
    <div class="text-center pt-4 font-semibold">
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
          <div class="flex justify-start">
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
                  class="h-2 w-full rounded-full bg-red-600"
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
                  class="h-2 w-full rounded-full bg-blue-600"
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
          <div class="flex justify-end">
            Công kích:({{ state?.enemy?.damage }})<br>
            Phòng ngự:({{ state?.enemy?.def }})<br>
          </div>
        </div>
      </div>
      <div class="flex justify-around mt-3">
        <div class="relative">
          <span class="absolute top-0 right-0 font-semibold text-2xl text-red-500">
            222
          </span>
          <NuxtImg format="webp" class="h-[200px]" src="/pve/player.png" />
        </div>
        <div class="relative">
          <span class="absolute top-0 right-0 font-semibold text-2xl text-red-500">
            121212
          </span>
          <NuxtImg format="webp" class="h-[200px]" src="/pve/monter.png" />
        </div>
      </div>
    </div>
    <!--    <div class="p-4 h-[35%] overflow-scroll"> -->
    <!--      <div v-for="(round, index) in rounds" :key="index" class="mb-2 border-b border-gray-300"> -->
    <!--        <h3 class="font-semibold"> -->
    <!--          [Lượt {{ index + 1 }}] -->
    <!--        </h3> -->
    <!--        <strong>{{ mySelf?.name }}</strong> gây <strong class="text-red-600">{{ round.self.inflictDamage }}</strong> sát thương lên <strong>{{ enemy?.name }}</strong> -->
    <!--        <div> -->
    <!--          <strong>{{ enemy?.name }}</strong> gây <strong class="text-red-600">{{ round.self.receiveDamage }}</strong> sát thương lên <strong>{{ mySelf?.name }}</strong> -->
    <!--        </div> -->
    <!--      </div> -->
    <!--    </div> -->
  </div>
</template>
