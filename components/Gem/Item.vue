<script setup lang="ts">
import type { PlayerGem } from '~/types'
import { qualityPalette } from '~/common'

const props = defineProps<{
  gem: PlayerGem
  bgClass?: string
}>()
</script>

<template>
  <div class="flex items-center relative w-full">
    <div
      :class="bgClass"
      class="w-12 h-12 relative"
    >
      <nuxt-img class="absolute top-0" format="webp" :src="`/quality_bg/iconbg_${gem.quality}.png`" />
      <nuxt-img class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" format="webp" :src="`/gem/${gem.gemId}.png`" />
      <div class="absolute bg-black/60 text-8 font-bold text-white bottom-0 right-0 px-1 rounded-2xl text-yellow-300">
        {{ gem.sum }}
      </div>
    </div>
    <div class="w-[65%]">
      <span
        class="ml-1 text-white text-10 line-clamp-1" :style="{
          color: qualityPalette(gem.quality),
        }"
      >
        {{ gem.name }}
      </span>
      <div class="flex flex-col text-8 leading-4 ml-1">
        <gem-values :gem="gem" />
      </div>
    </div>
    <slot />
  </div>
</template>
