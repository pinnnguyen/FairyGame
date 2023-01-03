<script setup lang="ts">
import { set } from '@vueuse/core'
import { useFetch } from '#app'
import { usePlayerStore } from '~/composables/usePlayer'
import type { Bag, PlayerEquipment } from '~/types'

const emits = defineEmits(['close'])

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
  emits('close')
}
</script>

<template>
  <Teleport to="body">
    <BagDetail v-if="toggleDetail" :item="itemSelected" @close="toggleDetail = false" />
  </Teleport>
  <div class="flex items-center justify-center w-full h-[calc(100vh_-_30px)] bg-bg_5 bg-cover fixed top-[28px] w-full h-full z-99">
    <div class="w-full h-[80%] absolute top-10">
      <div class="w-full h-full relative">
        <span class="font-semibold absolute w-[40px] left-[calc(50%_-_10px)] top-[-1px] text-[#656f99]">TÚI</span>
        <NuxtImg class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
        <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full">
          <div class="grid grid-cols-5 gap-2 h-[465px] overflow-scroll">
            <LazyItemRank
              v-for="equipment in bagDataResponse.equipments"
              :key="equipment.id"
              @click.stop="pickItem(equipment)"
              :preview="equipment.preview"
              :rank="equipment.rank"
              class="w-15"
            >
                            <p class="text-10 text-[#7c4ea2] font-semibold line-clamp-2">
                              {{ equipment?.name }}
                            </p>
            </LazyItemRank>
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
