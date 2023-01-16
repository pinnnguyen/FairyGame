<script setup>
import { onClickOutside } from '@vueuse/core'
const emits = defineEmits(['close'])

const target = ref(null)
onClickOutside(target, event => emits('close'))

const currentTab = ref('elite')
const equipShow = ref(false)

const { data: dataResponse, loading, refresh } = await useAsyncData('boss', () => $fetch('/api/boss', {
  params: {
    kind: currentTab.value,
  },
}))

const bossElites = computed(() => dataResponse.value.elites)
const bossDaily = computed(() => dataResponse.value.daily)
const bossFrameTime = computed(() => dataResponse.value.frameTime)
</script>

<template>
  <var-popup v-model:show="equipShow">
    <PopupEquipInfo :item="equipSelected" @close="equipShow = false" />
  </var-popup>
  <var-loading description="LOADING" type="circle" :loading="loading">
    <Blocker class="z-99">
      <div ref="target" class="flex items-center justify-center w-full h-[calc(100vh_-_30px)]">
        <div class="w-[95%] h-[70%] absolute top-[calc(50%_-_35vh)]">
          <div class="w-full h-full relative">
            <span class="font-semibold absolute w-[40px] left-[calc(50%_-_15px)] top-[-1px] text-[#656f99]">BOSS</span>
            <NuxtImg class="w-full h-full" src="/common/bj_tongyong_1.png" />
            <div class="absolute top-[30px] grid grid-cols-1 gap-1 items-center justify-center w-[95%] left-[calc(10%_-_18px)] max-h-[380px] overflow-scroll">
              <template v-if="currentTab === 'elite'">
                <LazyBossElite
                  v-for="boss in bossElites"
                  :key="boss._id"
                  :boss="boss"
                />
              </template>
              <template v-if="currentTab === 'daily' ">
                <LazyBossDaily
                  v-for="boss in bossDaily"
                  :key="boss._id"
                  :boss="boss"
                />
              </template>
              <template v-if="currentTab === 'frameTime' ">
                <LazyBossFrameTime
                  v-for="boss in bossFrameTime"
                  :key="boss._id"
                  :boss="boss"
                />
              </template>
            </div>
            <div class="absolute bottom-[20px] left-10 text-10">
              <button
                :class="{ '!opacity-100': currentTab === 'elite' }"
                class="transition transition-opacity opacity-50 bg-[#f8d89b] h-[30px] text-[#9d521a] px-2 rounded mx-1 uppercase font-semibold"
                @click="currentTab = 'elite'"
              >
                Tam giới
              </button>
              <button
                :class="{ '!opacity-100': currentTab === 'daily' }"
                class="transition transition-opacity opacity-50 bg-[#f8d89b] h-[30px] text-[#9d521a] px-2 rounded mx-1 uppercase font-semibold"
                @click="currentTab = 'daily'"
              >
                Hằng ngày
              </button>
              <button
                :class="{ '!opacity-100': currentTab === 'frameTime' }"
                class="transition transition-opacity opacity-50 bg-[#f8d89b] h-[30px] text-[#9d521a] px-2 rounded mx-1 uppercase font-semibold"
                @click="currentTab = 'frameTime'"
              >
                Thế giới
              </button>
            </div>
          </div>
        </div>
      </div>
    </Blocker>
  </var-loading>
</template>
