<script setup lang="ts">
import type { PlayerGem } from '~~/types'
import { qualityPalette } from '~/common'

defineProps<{
  gem: PlayerGem
}>()

const emit = defineEmits<{
  (event: 'onSelected', d: PlayerGem): void
}>()
</script>

<template>
  <div>
    <div
      position="relative"
      w="12"
      h="12"
      @click.stop="emit('onSelected', gem)"
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
        color: qualityPalette(gem.quality!),
      }"
    >
      {{ gem.name }}
    </p>
  </div>
</template>
