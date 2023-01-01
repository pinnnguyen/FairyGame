<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'

const { playerInfo, attribute } = storeToRefs(usePlayerStore())
const classToTitle = {
  1: 'Tu tiên',
  2: 'Tu yêu',
  3: 'Tu ma',
  4: 'Nhân tộc',
}
const classTitle = computed(() => classToTitle[playerInfo.value.class])
</script>

<template>
  <div>
    <div class="h-[60px] justify-between flex items-center mx-3">
      <div class="flex items-center">
        <NuxtImg class="h-[50px] mr-2" format="webp" src="/pve/player-avatar.png" />
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
        Hút máu: {{ attribute?.bloodsucking ?? 0 }}%
      </div>
      <div />
    </div>
  </div>
</template>
