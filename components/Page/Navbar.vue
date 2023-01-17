<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { formatCash } from '~/common'

const { playerInfo } = storeToRefs(usePlayerStore())
</script>

<template>
  <div class="relative">
    <nuxt-img format="webp" class="h-[30px] object-cover absolute z-99" src="/common/bj_tongyong_2.png" />
    <div class="flex items-center justify-between mx-2 absolute z-100 w-full">
      <span class="text-white px-1 text-10 bg-[#454c66] rounded-xl">
        <span class="">{{ playerInfo?.levelTitle }} {{ playerInfo?.floor }}</span>
      </span>
      <div class="flex items-center pr-1">
        <div class="text-white text-10 flex items-center mr-2 bg-[#454c66] rounded-xl m-1">
          <div class="px-1 flex items-center">
            <nuxt-img class="w-[17px]" format="webp" src="/items/1_s.png" />
            <span class="text-10 pl-[1px]">{{ formatCash(Math.round(playerInfo?.knb)) }}</span>
          </div>
          <nuxt-img class="w-5 ml-1" src="/button/add_price.png" />
        </div>
        <div class="text-white text-10 flex items-center mr-2 bg-[#454c66] rounded-xl m-1">
          <div class="px-1 flex items-center">
            <nuxt-img class="w-[17px]" format="webp" src="/items/3_s.png" />
            <span class="text-10 pl-[1px]">{{ formatCash(playerInfo?.gold) }}</span>
          </div>
          <nuxt-img class="w-5 ml-1" src="/button/add_price.png" />
        </div>
      </div>
    </div>
  </div>
</template>
