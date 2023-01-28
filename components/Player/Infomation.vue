<script setup>
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'
import { useAppStore } from '~/composables/app'

const togglePlayerInfo = useState('togglePlayerInfo')
const currentTab = ref('attribute')
const target = ref(null)
onClickOutside(target, () => togglePlayerInfo.value = false)

const tabs = ref([
  {
    key: 'equipment',
    name: 'Trang bị',
  },
  {
    key: 'attribute',
    name: 'Thuộc tính',
  },
  {
    key: 'tupo',
    name: 'Đột phá',
  },
])
</script>

<template>
  <div class="rounded shadow-md text-black w-full h-[80%] w-[calc(100vw_-_30px)] h-[500px] relative">
    <span class="font-semibold absolute top-[-1px] left-[calc(50%_-_26px)] z-9">Nhân vật</span>
    <nuxt-img class="w-full h-full absolute top-0" format="webp" src="/common/bj_tongyong_1.png" />
    <div class="h-full absolute top-0 w-full">
      <div
        class="m-1 rounded-md pt-4 text-10 font-semibold h-[calc(100%_-_60px)]"
      >
        <PlayerAttributeTab v-if="currentTab === 'attribute'" />
        <PlayerEquipTab v-if="currentTab === 'equipment'" />
        <PlayerTupo v-if="currentTab === 'tupo'" />
      </div>

      <div class="flex items-center justify-center w-full absolute bottom-4">
        <div
          v-for="t in tabs"
          :key="t.key"
          class="transition transition-opacity bg-[#41466e] text-white px-2 opacity-40 m-2 p-1 text-12"
          :class="{ '!opacity-100': currentTab === t.key }" @click="currentTab = t.key"
        >
          {{ t.name }}
        </div>
      </div>
    </div>
  </div>
</template>
