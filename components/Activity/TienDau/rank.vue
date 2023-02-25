<script setup lang="ts">
import { usePlayerStore } from '~/composables/usePlayer'

const { sid } = storeToRefs(usePlayerStore())
const { data: ranks, pending, refresh } = useFetch<any>('/api/arena/tienDau/rank')
</script>

<template>
  <Line class="bg-[#191b1e]" p="t-2">
    Xếp hạng
  </Line>
  <div class="max-w-[60vh] h-[70vh] overflow-auto bg-[#191b1e] m-auto">
    <div
      v-for="(rank, index) in ranks"
      :key="rank._id"
      pos="relative"
      border="1 white/40 rounded"
      text="primary"
      p="2"
      m="x-4 y-2"
      :class="{
        '!border-green-400': sid === rank.sid,
      }"
    >
      <activity-tien-dau-item
        :rank="rank"
        :pos="index + 1"
        :enable-rank="true"
      />
    </div>
  </div>
</template>
