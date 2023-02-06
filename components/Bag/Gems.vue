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
  <var-loading
    :loading="pending"
    :description="tips[Math.round(randomNumber(0, tips.length))]"
    size="mini"
    color="#ffffff"
  >
    <div
      grid="~ cols-6"
      gap="2"
    >
      <div
        v-for="gem in gems" :key="gem._id"
        @click="pickGemItem(gem)"
      >
        <div
          position="relative"
          w="12"
          h="12"
        >
          <nuxt-img
            position="absolute"
            top="0"
            class="absolute top-0"
            :src="`/quality_bg/iconbg_${gem.quality}.png`"
          />
          <nuxt-img
            position="absolute"
            border="rounded-full"
            object="cover"
            class=" w-[80%] h-[80%] transform-center"
            format="webp"
            :src="`/gem/${gem.gemId}.png`"
          />
          <div
            border="rounded-2xl"
            position="absolute"
            text="8 yellow-300"
            bg="black/60"
            font="bold"
            bottom="1"
            right="1"
            p="x-1"
          >
            {{ gem.sum }}
          </div>
        </div>
        <p
          text="10"
          font="semibold"
          class="line-clamp-1"
          :style="{
            color: qualityPalette(gem.quality),
          }"
        >
          {{ gem.name }}
        </p>
      </div>
    </div>
  </var-loading>
</template>
