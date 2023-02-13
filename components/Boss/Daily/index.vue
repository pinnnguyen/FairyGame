<script setup lang="ts">
import { randomNumber } from '~/common'
import { tips } from '~/constants'

const { data: listBoss, pending, refresh } = useFetch('/api/boss/daily')
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
    <lazy-boss-daily-item
      v-for="boss in listBoss"
      v-else
      :key="boss._id"
      :boss="boss"
    />
  </var-loading>
</template>
