<script setup lang="ts">
import { set } from '@vueuse/core'
import { useFetch } from '#app'
import { usePlayerStore } from '~/composables/player'
import type { Bag, PlayerEquipment } from '~/types'

definePageMeta({
  middleware: ['game'],
})

const toggleDetail = ref(false)
const itemSelected = ref<PlayerEquipment>()
const { hasEquip } = usePlayerStore()

const { data: bagDataResponse } = await useFetch<Bag>('/api/bag', {
  headers: (useRequestHeaders(['cookie']) as any),
})

const pickItem = (item: PlayerEquipment) => {
  set(itemSelected, item)
  set(toggleDetail, true)
}

const goToHome = () => {
  navigateTo('/')
}
</script>

<template>
  <Teleport to="body">
    <BagDetail v-if="toggleDetail" :item="itemSelected" @close="toggleDetail = false" />
  </Teleport>
  <div class="flex items-center justify-center w-full h-[calc(100vh_-_30px)]" style="background: url('/common/bg_5.jpg'); background-size: cover">
    <!--    <NuxtImg src="/common/bg_5.jpg"></NuxtImg> -->
    <div class="w-full h-[80%] absolute top-10">
      <div class="w-full h-full relative">
        <span class="font-semibold absolute w-[40px] left-[calc(50%_-_10px)] top-[-1px] text-[#656f99]">TÚI</span>
        <NuxtImg class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
        <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full">
          <div class="grid grid-cols-5 gap-2 h-[465px] overflow-scroll">
            <div
              v-for="equipment in bagDataResponse.equipments"
              :key="equipment.id"
              class="bg-iconbg_3 w-15 bg-contain bg-no-repeat relative"
              @click.stop="pickItem(equipment)"
            >
              <span v-if="hasEquip(equipment.slot, equipment._id)" class="bg-gray-100 text-gray-500 text-xxs right-0 transform rotate-45 rounded absolute top-[10px]" style="font-size: 7px">Trang bị</span>
              <NuxtImg format="webp" src="items/23.png" />
              <p class="text-xxs text-[#7c4ea2] font-semibold line-clamp-2">
                {{ equipment.name }}
              </p>
            </div>
          </div>
        </div>
        <!--        <div class="flex"> -->
        <!--          <button> -->
        <!--            <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_active.png" /> -->
        <!--          </button> -->
        <!--          <button> -->
        <!--            <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_deactive.png" /> -->
        <!--          </button> -->
        <!--        </div> -->
      </div>
    </div>
    <div class="absolute bottom-0 w-full h-[65px]">
      <div class="w-full h-full relative">
        <NuxtImg class="w-full h-full" src="/common/bg1_common.png" />
      </div>
    </div>
    <div class="absolute bottom-0 flex justify-end w-full h-[65px]" @click="goToHome">
      <NuxtImg class="h-full" src="/bottom/bottom_back.png" />
    </div>
  </div>
</template>
