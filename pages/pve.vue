<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBattleRoundStore, usePlayerStore } from '#imports'

const { mySelf, enemy, rounds, currentRound } = storeToRefs(useBattleRoundStore())
const { playerInfo } = usePlayerStore()

definePageMeta({
  middleware: ['game'],
})

const { data: war } = await useAsyncData('war', () => $fetch('/api/war', {
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
}))

console.log('data', war.value)
</script>

<template>
  <div class="h-screen bg-white">
    <div class="text-center pt-4 font-semibold">
      [Bắt đầu chiến đấu] {{ enemy }} 1
    </div>
    <div class="h-[60%]" style="background: url('/pve/bg-pve.jpg'); background-size: cover">
      <div class="flex justify-between p-2 pt-2">
        <div>
          <div class="flex items-center h-[100px] w-[120px]">
            <NuxtImg format="webp" class="h-[40px]" src="/pve/player-avatar.png" />
            <span class="pb-[2px] font-medium">{{ mySelf.name }} [lv:{{ mySelf?.level }}]</span>
          </div>
          <div class="mt-2">
            <div class="flex items-center justify-start">
              <span class="pr-2">
                HP
              </span>
              <div class="h-3 w-24 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-2 w-20 rounded-full bg-red-600" :style="{
                    width: `${mySelf?.attribute?.hp}px`,
                  }"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-start">
            Công kích:({{ mySelf?.attribute?.damage }})<br>
            Phòng ngự:({{ mySelf?.attribute?.def }})<br>
          </div>
        </div>
        <div>
          <div class="flex items-center h-[100px] w-[120px]">
            <span class="pb-[2px] font-medium">Ma hóa chi kiếm ma [lv:{{ enemy?.level }}]</span>
            <NuxtImg format="webp" class="h-[40px]" src="/pve/monter-avatar.png" />
          </div>
          <div class="mt-2">
            <div class="flex items-center justify-end">
              <div class="h-3 w-24 rounded-full bg-[#212121] flex items-center p-[2px]">
                <div
                  class="h-2 w-12 rounded-full bg-red-600" :style="{
                    width: `${enemy?.hp}px`,
                  }"
                />
              </div>
              <span class="pl-2">
                HP
              </span>
            </div>
          </div>
          <div class="flex justify-end">
            Công kích:({{ enemy?.damage }})<br>
            Phòng ngự:({{ enemy?.def }})<br>
          </div>
        </div>
      </div>
      <div class="flex justify-around mt-3">
        <div class="relative">
          <span class="absolute top-0 right-0 font-semibold text-2xl text-red-500">
            {{ currentRound?.receiveDamage }}
          </span>
          <NuxtImg format="webp" class="h-[200px]" src="/pve/player.png" />
        </div>
        <div class="relative">
          <span class="absolute top-0 right-0 font-semibold text-2xl text-red-500">
            {{ currentRound?.inflictDamage }}
          </span>
          <NuxtImg format="webp" class="h-[200px]" src="/pve/monter.png" />
        </div>
      </div>
    </div>
    <div class="p-4 h-[35%] overflow-scroll">
      <div v-for="(round, index) in rounds" :key="index" class="mb-2 border-b border-gray-300">
        <h3 class="font-semibold">
          [Lượt {{ index + 1 }}]
        </h3>
        <strong>{{ mySelf?.name }}</strong> gây <strong class="text-red-600">{{ round.self.inflictDamage }}</strong> sát thương lên <strong>{{ enemy?.name }}</strong>
        <div>
          <strong>{{ enemy?.name }}</strong> gây <strong class="text-red-600">{{ round.self.receiveDamage }}</strong> sát thương lên <strong>{{ mySelf?.name }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
