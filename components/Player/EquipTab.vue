<script setup lang="ts">
import { ROLE_NAME } from '~/constants'
import { formatCash } from '~/common'

const props = defineProps<{
  name: string
  level: number
  classRole: number
  levelTitle: string
  floor: string
  exp: number
  knb?: number
  gold?: number
  rightSlots?: []
  leftSlots: []
}>()

const { playerInfo } = usePlayerStore()
const classTitle = computed(() => ROLE_NAME[props.classRole])
</script>

<template>
  <Line
    p="y-2"
  >
    <div
      text="10"
    >
      Nhân vật
    </div>
  </Line>
  <div
    justify="between"
    flex="~ "
    align="items-start"
    m="x-4"
  >
    <div
      text="space-normal"
      w="5"
    >
      Tên {{ name }}
    </div>
    <div
      text="space-normal"
      w="5"
    >
      Cảnh giới {{ levelTitle }} {{ floor }}
    </div>
    <div
      text="space-normal"
      w="5"
    >
      Đẳng cấp {{ level }}
    </div>
    <div
      text="space-normal"
      w="5"
    >
      Hệ <span>{{ classTitle }}</span>
    </div>
    <div
      text="space-normal"
      w="5"
    >
      Tu vị {{ formatCash((exp)) }}
    </div>
    <!--    <span class=""> -->
    <!--      Tiên ngọc: {{ Math.round(playerInfo.coin) }} -->
    <!--    </span> -->
    <div
      v-if="knb"
      text="space-normal"
      w="5"
    >
      Tiên duyên {{ Math.round(knb) ?? 0 }}
    </div>
    <div
      v-if="gold"
      text="space-normal"
      w="5"
    >
      Tiền tiên {{ formatCash(gold) }}
    </div>
  </div>
  <Line
    p="y-2 t-4"
  >
    <div
      text="10"
    >
      Trang bị
    </div>
  </Line>
  <player-equipment-default
    :left-slots="leftSlots"
    :right-slots="rightSlots"
    w-class="!grid-cols-3"
  />
</template>
