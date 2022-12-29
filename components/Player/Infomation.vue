<script setup>
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'
import { usePlayerStore } from '~/composables/player'
import { useAppStore } from '~/composables/app'

const { playerInfoComponent } = storeToRefs(useAppStore())
const { playerInfo, attribute } = storeToRefs(usePlayerStore())

const playerRef = ref(null)
const currentTab = ref('attribute')
onClickOutside(playerRef, event => playerInfoComponent.value = false)

const tabs = ref([
  {
    key: 'equipment',
    name: 'Trang bị',
  },
  {
    key: 'attribute',
    name: 'Thuộc tính',
  },
])

const classToTitle = {
  1: 'Tu tiên',
  2: 'Tu yêu',
  3: 'Tu ma',
  4: 'Nhân tộc',
}

const classTitle = computed(() => classToTitle[playerInfo.value.class])
</script>

<template>
  <div ref="playerRef" class="bg-[#1b345d] text-white w-full z-99 duration-500 absolute bottom-0 h-[70%]">
    <div class="h-full">
      <div class="absolute top-[-25px] flex items-center justify-center w-full">
        <div
          v-for="t in tabs"
          :key="t.key"
          class="bg-[#455875] m-2 p-1"
          :class="{ 'bg-[#375c99]': currentTab === t.key }" @click="currentTab = t.key"
        >
          {{ t.name }}
        </div>
      </div>
      <div
        class="m-3 rounded-md pt-2"
        style="background-image: linear-gradient(to bottom right, #314b76, #455776, #4c5b74); height: calc(100% - 60px);"
      >
        <div v-if="currentTab === 'attribute'">
          <div class="h-[60px] justify-between flex items-center mx-3">
            <div class="flex items-center">
              <img class="h-[50px] mr-2" src="pve/player-avatar.png">
              <div>
                <div>
                  Tên: {{ playerInfo?.name }}
                </div>
                <div>
                  Cảnh giới: {{ playerInfo?.levelTitle }} {{ playerInfo?.floor }}
                </div>
                <div>
                  Đẳng cấp: {{ playerInfo?.level }}
                </div>
              </div>
            </div>
            <!--          <a style="background: radial-gradient(black, transparent);" class="text-white giftcode" href="?cmd=Yc2x1pkhPpWR1aWh1YW4mc2lkPTQ3MTRjMmE2NDNmOTQwMTY3NWE5YjY0OTFhZDJiOGQ4">Giftcode</a> -->
          </div>
          <div class="m-3">
            <div class="  my-1 px-2">
              Hệ: {{ classTitle }}
            </div>
            <div class="  my-1 px-2">
              Tiên ngọc: {{ playerInfo?.coin }}
            </div>
            <div class="  my-1 px-2">
              Linh thạch: {{ playerInfo?.gold }}
            </div>

            <div class="   my-1 px-2">
              Tu vị: {{ playerInfo?.exp }}/{{ playerInfo?.expLimited }}
            </div>
            <div class="   my-1 px-2">
              Tốc độ: {{ attribute?.speed ?? 0 }}
            </div>
            <div class="   my-1 px-2">
              Khí huyết: {{ attribute?.hp ?? 0 }}
            </div>
            <div class="   my-1 px-2">
              Công Kích: {{ attribute?.damage ?? 0 }}
            </div>
            <div class="   my-1 px-2">
              Phòng Ngự: {{ attribute?.def ?? 0 }}
            </div>
            <div class="   my-1 px-2">
              Bạo kích: {{ attribute?.critical ?? 0 }}%
            </div>
            <div class="   my-1 px-2">
              Sát thương bạo kích: 150%
            </div>
            <div class="   my-1 px-2">
              Hút máu: {{ attribute?.suckHp ?? 0 }}%
            </div>
            <div />
          </div>
        </div>
        <div v-if="currentTab === 'equipment'" class="h-full flex items-end justify-center">
          <div class="grid grid-cols-4 gap-2 mb-2">
            <div class="relative">
              <img class="w-[60px] h-[55px]" src="equipment/vukhi.png">
            </div>
            <div class="relative">
              <img class="w-[60px] h-[55px]" src="equipment/ngocboi.png">
            </div>
            <div class="relative">
              <img class="w-[60px] h-[55px]" src="equipment/giap.png">
            </div>
            <div class="relative">
              <img class="w-[60px] h-[55px]" src="equipment/baotay.png">
            </div>
            <div class="relative">
              <img class="w-[60px] h-[55px]" src="equipment/rinh.png">
            </div>
            <div class="relative">
              <img class="w-[60px] h-[55px]" src="equipment/giay.png">
            </div>
            <div class="relative">
              <img class="w-[60px] h-[55px]" src="equipment/ngoc.png">
            </div>
            <div class="relative">
              <img class="w-[60px] h-[55px]" src="equipment/mu.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
