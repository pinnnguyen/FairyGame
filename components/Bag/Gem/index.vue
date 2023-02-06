<script setup lang="ts">
import { set } from '@vueuse/core'
import type { PlayerGem } from '~/types'
import { randomNumber } from '~/common'
import { tips } from '~/constants'

const { data: gems, pending, refresh: refreshGems } = useFetch<PlayerGem[]>('/api/bag/gems')
const gemSelected = ref<PlayerGem>()
const show = ref(false)

const onSelected = (gem: PlayerGem) => {
  set(gemSelected, gem)
  set(show, true)
}

const onmergeGems = () => {
  refreshGems()
  set(show, false)
}
</script>

<template>
  <var-popup v-if="show" v-model:show="show" position="center">
    <bag-gem-detail
      :gem="gemSelected"
      :sell-action="true"
      @refresh="onmergeGems"
      @mergegem="onmergeGems"
    />
  </var-popup>
  <var-loading
    :loading="pending"
    :description="tips[Math.round(randomNumber(0, tips.length))]"
    size="mini"
    color="#ffffff"
  >
    <div v-if="pending" h="50" w="50" />
    <div
      grid="~ cols-6"
      gap="2"
    >
      <LazyBagGemItem
        v-for="gem in gems"
        :key="gem._id"
        :gem="gem"
        @on-selected="onSelected(gem)"
      />
    </div>
  </var-loading>
</template>
