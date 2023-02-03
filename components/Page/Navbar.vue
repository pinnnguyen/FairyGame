<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { formatCash } from '~/common'

const { playerInfo } = storeToRefs(usePlayerStore())
</script>

<template>
  <div class="relative">
    <!--    <nuxt-img format="webp" class="h-[30px] object-cover absolute z-99" src="/common/bj_tongyong_2.png" /> -->
    <div class="flex items-center text-12 justify-between p-1 absolute z-100 w-full bg-black">
      <span class="text-white px-4 bg-[#191b1e] rounded-xl">
        <span class="">{{ playerInfo?.name }}</span>
      </span>
      <div class="flex items-center pr-1">
        <div class="text-white text-10 flex items-center mr-2 bg-[#191b1e] rounded-xl m-1">
          <div class="px-2 flex items-center gap-1">
            <span>Tiền tiên</span>
            <span class="text-10 pl-[1px]">{{ formatCash(Math.round(playerInfo?.gold)) }}</span>
          </div>
        </div>
        <div class="text-white text-10 flex items-center mr-2 bg-[#191b1e] rounded-xl m-1">
          <div class="px-2 flex items-center gap-1">
            <span>Tiên duyên</span>
            <span class="text-10 pl-[1px]">{{ formatCash(playerInfo?.knb) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
