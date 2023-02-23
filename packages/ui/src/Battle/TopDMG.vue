<script setup lang="ts">
import { formatCash } from '~/common'
const { useBattleRequest } = useRequest()

const { $io } = useNuxtApp()
const topDMG = ref()

onMounted(() => {
  $io.emit('battle:log', useBattleRequest.value.id)
  $io.on('send-battle:log', (topDMGResponse) => {
    topDMG.value = topDMGResponse
  })
})

const getExtent = (sid: string, match: any) => {
  for (const m in match) {
    if (match[m].extends.sid === sid)
      return match[m].extends
  }
}
</script>

<template>
  <div
    bg="[black]"
    h="[50vh]"
    border="t-1 white/40"
  >
    <p class="text-center text-white text-12 font-semibold">
      Hạng sát thương
    </p>
    <div class="p-2 text-white text-12">
      <div v-for="(dmg, index) in topDMG" :key="dmg._id" class="flex justify-between mx-1 my-1">
        <span>({{ index + 1 }}) {{ getExtent(dmg.sid, dmg.match).name }}</span> <span>{{ formatCash(dmg.totalDamage) }}</span>
      </div>
    </div>
  </div>
</template>
