<script setup lang="ts">
import { randomNumber, sleep } from '~/common'
import { tips } from '~/constants'

const { data: listBoss, pending, refresh } = useFetch('/api/boss/frameTime')
const beforeWar = async () => {
  await sleep(3000)
  refresh()
}
</script>

<template>
  <var-loading
    :description="tips[Math.round(randomNumber(0, tips.length))]"
    size="mini"
    color="#ffffff"
    type="circle"
    :loading="pending"
  >
    <div v-if="pending" h="50" w="100" />
    <lazy-boss-frame-time-item
      v-for="boss in listBoss"
      v-else
      :key="boss._id"
      :boss="boss"
      @war="beforeWar"
    />
  </var-loading>
</template>
