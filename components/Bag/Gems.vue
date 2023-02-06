<script setup lang="ts">
import { set } from '@vueuse/core'
import type { PlayerGem } from '~/types'
import { qualityPalette, randomNumber } from '~/common'
import { tips } from '~/constants'

const { data: gems, pending, refresh: refreshGems } = useFetch('/api/bag/gems')
const gemSelected = ref<PlayerGem>()
const show = ref(false)

const pickGemItem = (gem: PlayerGem) => {
  set(gemSelected, gem)
  set(show, true)
}

const onmergeGems = () => {
  refreshGems()
  set(show, false)
}
</script>

<template>
  <var-popup v-model:show="show" position="center">
    <bag-gem-detail
      :gem="gemSelected"
      :sell-action="true"
      @refresh="onmergeGems"
      @mergegem="onmergeGems"
    />
  </var-popup>
  <var-loading :loading="pending" :description="tips[Math.round(randomNumber(0, tips.length))]" size="mini" color="#ffffff">
    <div class="grid-cols-6 grid gap-2">
      <div
        v-for="gem in gems" :key="gem._id"
        @click="pickGemItem(gem)"
      >
        <div class="relative w-12 h-12">
          <nuxt-img class="absolute top-0" format="webp" :src="`/quality_bg/iconbg_${gem.quality}.png`" />
          <nuxt-img class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" format="webp" :src="`/gem/${gem.gemId}.png`" />
          <div class="absolute bg-black/60 text-8 font-bold text-white bottom-1 right-1 px-1 rounded-2xl text-yellow-300">
            {{ gem.sum }}
          </div>
        </div>
        <p
          class="text-10 font-semibold line-clamp-1" :style="{
            color: qualityPalette(gem.quality),
          }"
        >
          {{ gem.name }}
        </p>
      </div>
    </div>
  </var-loading>
</template>
