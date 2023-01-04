<script setup>
import { onClickOutside } from '@vueuse/core'
const emits = defineEmits(['close'])

const target = ref(null)
onClickOutside(target, event => emits('close'))

const currentTab = ref('daily')

const { data: dataResponse, refresh } = await useAsyncData('boss', () => $fetch('/api/boss', {
  params: {
    kind: currentTab.value,
  },
}))

console.log('bossDaily', dataResponse.value)

watch(currentTab, (value) => {
  console.log('value', value)
  refresh()
})
</script>

<template>
  <Teleport to="body">
    <PopupEquipInfo v-if="equipShow" :item="equipSelected" @close="equipShow = false" />
  </Teleport>
  <Blocker class="z-99">
    <div ref="target" class="flex items-center justify-center w-full h-[calc(100vh_-_30px)]">
      <div class="w-[90%] h-[70%] absolute top-[calc(50%_-_35vh)]">
        <div class="w-full h-full relative">
          <span class="font-semibold absolute w-[40px] left-[calc(50%_-_15px)] top-[-1px] text-[#656f99]">BOSS</span>
          <NuxtImg class="w-full h-full" src="/common/bj_tongyong_1.png" />
          <div class="absolute top-[30px] grid grid-cols-1 gap-1 items-center justify-center w-[92%] left-[calc(10%_-_10px)] max-h-[380px] overflow-scroll">
            <template v-if="currentTab === 'daily' ">
              <LazyBossListDaily v-for="bossNe in dataResponse.bossNe" :key="bossNe.id" :boss="bossNe" />
            </template>

            <template v-if="currentTab === 'frameTime' ">
              <LazyBossListFrameTime v-for="bossNe in dataResponse.bossNe" :key="bossNe.id" :boss="bossNe" />
            </template>
          </div>
          <div class="absolute bottom-[20px] left-10 text-10">
            <button :class="{ '!opacity-100': currentTab === 'daily' }" class="opacity-50 bg-[#f8d89b] h-[30px] text-[#9d521a] px-2 rounded mx-1" @click="currentTab = 'daily'">
              Hằng ngày
            </button>
            <button :class="{ '!opacity-100': currentTab === 'frameTime' }" class="opacity-50 bg-[#f8d89b] h-[30px] text-[#9d521a] px-2 rounded mx-1" @click="currentTab = 'frameTime'">
              Khung giờ
            </button>
          </div>
          <!-- <div class="flex absolute bottom-[-55px] left-[10px]">
            <button>
              hehe
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </Blocker>
</template>
