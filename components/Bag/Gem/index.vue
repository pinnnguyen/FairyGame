<script setup lang="ts">
import type { PlayerGem } from '~/types'
import { randomNumber } from '~/common'
import { tips } from '~/constants'

const { data: gems, pending, refresh: refreshGems } = useFetch<PlayerGem[]>('/api/bag/gems')

const onmerge = () => {
  refreshGems()
}
</script>

<template>
  <var-loading
    :loading="pending"
    :description="tips[Math.round(randomNumber(0, tips.length))]"
    size="mini"
    color="#ffffff"
  >
    <div v-if="pending" h="50" w="100" />
    <div
      v-else
      grid="~ cols-6"
      gap="2"
    >
      <lazy-bag-gem-item
        v-for="gem in gems"
        :key="gem._id"
        :gem="gem"
        @onmerge="onmerge"
      />
    </div>
  </var-loading>
</template>
