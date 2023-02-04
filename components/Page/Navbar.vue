<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { formatCash } from '~/common'

const { playerInfo } = storeToRefs(usePlayerStore())
</script>

<template>
  <div class="relative text-white">
    <div class="flex items-center text-12 justify-between p-1 absolute w-full z-100 bg-black border-b border-[#303235]">
      <div class="text-white pl-4 flex">
        <div class="flex items-center pr-2">
          {{ playerInfo?.name }}
        </div>
        <div class="border-l border-[#303235] pl-2">
          <div>
            Tu vi {{ formatCash(playerInfo.exp) }}
          </div>
          <div class="flex items-center gap-1">
            <span>Tiền tiên</span>
            <span>{{ formatCash(Math.round(playerInfo?.gold)) }}</span>
          </div>
        </div>
      </div>
      <div class="pr-2">
        <span>Tiên duyên: </span>
        <span class="">{{ playerInfo?.knb }}</span>
      </div>
    </div>
  </div>
</template>
