<script setup lang="ts">
import { qualityPalette } from '~/common'
import { ItemToName, ItemToQuality } from '~/constants'
import type { RewardList } from '~~/types'

defineProps<{
  reward: RewardList
}>()
</script>

<template>
  <div
    w="11/12"
    bg="primary"
    m="auto"
    p="2"
    border="rounded 1 white/20"
  >
    <Line
      m="b-2"
      text="10"
    >
      Tip
    </Line>
    <div
      font="leading-5"
    >
      <div text="left">
        Phải gây ít nhất 2% sát thương lên boss mới được nhận thưởng
      </div>
      <div>
        Đạo hữu nhận được sẽ là Tiên duyên
      </div>
      <div>
        Phần thưởng sẽ trao sau khi boss bị tiêu diệt
      </div>
      <div display="flex" text="left">
        <i text="underline space-nowrap" m="r-1">Quỹ boss:</i>
        Phần thưởng chia đều theo sát thương gây ra
      </div>
      <div display="flex" text="left">
        <i text="underline space-nowrap" m="r-1">Tiêu diệt:</i>
        Phần thưởng dành cho người kết liễu boss.
      </div>
      <div display="flex" text="left">
        <i text="underline space-nowrap" m="r-1">ST cao nhât:</i>
        Phần thưởng dành cho người có lượng sát thương cao nhất.
      </div>
    </div>
    <Line m="y-2" text="10">
      Phần thưởng
    </Line>
    <div
      grid="~ cols-4"
      gap="4"
    >
      <div
        v-for="(value, key) in reward.base"
        :key="key"
        text="underline"
        p="l-1 1"
        border="1 white/40"
        :style="{
          color: qualityPalette(ItemToQuality[key]),
        }"
      >
        {{ ItemToName[key] }} x{{ value }}
      </div>
    </div>
    <div
      text="center primary underline"
    >
      Đã hiểu
    </div>
  </div>
</template>
