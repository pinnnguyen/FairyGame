<script setup lang="ts">
import { set } from '@vueuse/core'
import { QUALITY_TITLE } from '~/constants'
import type { PlayerGem } from '~/types'
import { qualityPalette } from '~/common'

const { data: gems, pending, refresh: refreshGems } = await useFetch('/api/bag/gems')
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
  <var-loading :loading="pending" description="Đang tải đá hồn" color="#333">
    <div class="grid-cols-6 grid gap-1 overflow-auto max-h-[88%] scrollbar-hide">
      <var-popup v-model:show="show" position="center">
        <lazy-bag-gem-detail
          :gem="gemSelected"
          @mergegem="onmergeGems"
        />
      </var-popup>
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
