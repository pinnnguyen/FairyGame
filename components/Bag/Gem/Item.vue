<script setup lang="ts">
import { set } from '@vueuse/core'
import type { PlayerGem } from '~~/types'
import { qualityPalette } from '~/common'

defineProps<{
  gem: PlayerGem
}>()

const emit = defineEmits(['onmerge'])

const show = ref(false)
const onmergeGems = () => {
  set(show, false)
  emit('onmerge')
}

const onSelected = (gem: PlayerGem) => {
  set(show, true)
}
</script>

<template>
  <var-popup v-if="show" v-model:show="show" position="center">
    <gem-detail
      :gem="gem"
      :sell-action="true"
      @refresh="onmergeGems"
      @mergegem="onmergeGems"
    />
  </var-popup>
  <div>
    <div
      pos="relative"
      w="12"
      h="12"
      @click.stop="onSelected"
    >
      <nuxt-img
        pos="absolute"
        top="0"
        :src="`/quality_bg/iconbg_${gem.quality}.png`"
      />
      <nuxt-img
        pos="absolute"
        border="rounded-full"
        object="cover"
        class="w-[80%] h-[80%] transform-center"
        format="webp"
        :src="`/gem/${gem.gemId}.png`"
      />
      <div
        border="rounded-2xl"
        pos="absolute"
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
      text="8"
      font="semibold"
      class="line-clamp-1"
      :style="{
        color: qualityPalette(gem.quality),
      }"
    >
      {{ gem.name }}
    </p>
  </div>
</template>
