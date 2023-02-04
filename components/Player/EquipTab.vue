<script setup lang="ts">
import { ROLE_NAME } from '~/constants'
import { formatCash } from '~/common'

const { playerInfo } = usePlayerStore()
const classTitle = computed(() => ROLE_NAME[playerInfo!.class])
</script>

<template>
  <Line class="py-2">
    <div>Nhân vật</div>
  </Line>
  <div class="justify-between flex items-start mx-4">
    <div class="whitespace-normal w-5">
      Tên {{ playerInfo?.name }}
    </div>
    <div class="whitespace-normal w-5">
      Cảnh giới {{ playerInfo?.levelTitle }} {{ playerInfo?.floor }}
    </div>
    <div class="whitespace-normal w-5">
      Đẳng cấp {{ playerInfo?.level }}
    </div>
    <div class="whitespace-normal w-5">
      Hệ <span :class="`bg-[${classColor}]`">{{ classTitle }}</span>
    </div>
    <div class="whitespace-normal w-5">
      Tu vị {{ formatCash((playerInfo?.exp)) }}
    </div>
    <!--    <span class=""> -->
    <!--      Tiên ngọc: {{ Math.round(playerInfo.coin) }} -->
    <!--    </span> -->
    <div class="whitespace-normal w-5">
      Tiên duyên {{ Math.round(playerInfo.knb) ?? 0 }}
    </div>
    <div class="whitespace-normal w-5">
      Tiền tiên {{ formatCash(playerInfo.gold) }}
    </div>
  </div>
  <Line class="py-2 pt-4">
    <div class="text-10">
      Trang bị
    </div>
  </Line>
  <PlayerEquipmentDefault w-class="!grid-cols-3" />
</template>
