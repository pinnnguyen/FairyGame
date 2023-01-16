<script setup lang="ts">
import { formatCash } from '~/common'
import type { TopDMG } from '~/types'

defineProps<{
  topDMG: TopDMG
}>()
</script>

<template>
  <div class="w-[50%] h-[170px] absolute top-0 overflow-auto bg-[#6879a3] mt-2 mx-2 rounded">
    <p class="text-center text-white text-12 font-semibold">
      Hạng sát thương
    </p>
    <div class="p-2 text-white text-12">
      <div v-for="(dmg, index) in topDMG" :key="dmg._id" class="flex justify-between mx-1 my-1">
        <span>({{ index + 1 }}) {{ dmg?.name }}</span> <span>{{ formatCash(dmg.totalDamage) }}</span>
      </div>
    </div>
  </div>
</template>
