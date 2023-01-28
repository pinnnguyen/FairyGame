<script setup lang="ts">
import type { PlayerGem } from '~/types'
import { QUALITY_TITLE } from '~/constants'
import { qualityPalette } from '~/common'

const props = defineProps<{
  gem: PlayerGem
}>()
</script>

<template>
  <div class="flex items-center relative">
    <div
      class="w-10 h-10 relative"
    >
      <nuxt-img class="absolute top-0" format="webp" :src="`/quality_bg/iconbg_${gem.quality}.png`" />
      <nuxt-img class="absolute transform-center w-[80%] h-[80%] rounded-full" format="webp" :src="`/gem/${gem.gemId}.png`" />
      <div class="absolute bg-black/60 text-8 font-bold text-white bottom-0 right-0 px-1 rounded-2xl text-yellow-300">
        {{ gem.sum }}
      </div>
    </div>
    <div class="w-[65%]">
      <span
        class="ml-2 text-white text-10 line-clamp-1" :style="{
          color: qualityPalette(gem.quality),
        }"
      >
        {{ QUALITY_TITLE[gem.quality] }} - {{ gem.name }}
      </span>
      <div class="flex flex-col text-10">
        <span
          v-for="(g, i) in gem.values" :key="i" class="ml-2" :style="{
            color: qualityPalette(gem.quality),
          }"
        >
          <span v-if="gem.quality > 1">
            {{ g.name }} {{ Math.round(g.value * (gem.quality * gem.rateOnLevel)) }}
          </span>
          <span v-else>
            {{ g.name }} {{ g.value }}
          </span>
        </span>
      </div>
    </div>
    <slot />
  </div>
</template>
