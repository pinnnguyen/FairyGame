<script setup lang="ts">
import { QUALITY_TITLE } from '~/constants'
import { colorQuality } from '~/common'

const props = defineProps<{
  gemId: number
  quality: number
}>()

const qualityTitle = computed(() => {
  return QUALITY_TITLE[props.quality!]
})
</script>

<template>
  <Line
    p="y-2"
  >
    <div
      text="space-nowrap"
    >
      Ghép Đá Hồn
    </div>
  </Line>
  <div
    m="t-2 b-2"
    display="flex"
    justify="between"
    align="items-center"
    gap="2"
  >
    <div
      display="flex"
      align="items-center"
      border="white/20 1"
      p="2"
    >
      <div
        position="relative"
        w="10"
        h="10"
        m="r-2"
      >
        <nuxt-img
          position="absolute"
          top="0"
          format="webp"
          :src="`/quality_bg/iconbg_${quality}.png`"
        />
        <nuxt-img
          position="absolute"
          border="rounded-full"
          object="cover"
          class=" transform-center w-[80%] h-[80%]"
          format="webp"
          :src="`/gem/${gemId}.png`"
        />
      </div>
      <span
        text="8"
        w="5"
        :style="colorQuality(quality!)"
      >
        {{ qualityTitle }}
        <br>
        x3
      </span>
    </div>
    <icon
      name="mdi:arrow-right-bold-outline"
      size="20"
      text="blue-300"
    />
    <div
      display="flex"
      align="items-center"
      border="white/20 1"
      p="2"
    >
      <div
        position="relative"
        w="10"
        h="10"
        m="r-2"
      >
        <nuxt-img
          position="absolute"
          top="0"
          format="webp"
          :src="`/quality_bg/iconbg_${quality}.png`"
        />
        <nuxt-img
          position="absolute"
          border="rounded-full"
          object="cover"
          class="transform-center w-[80%] h-[80%]"
          format="webp"
          :src="`/gem/${gemId}.png`"
        />
      </div>
      <span
        text="8"
        w="5"
        :style="colorQuality(quality! + 1)"
      >
        {{ QUALITY_TITLE[quality! + 1] }}
        <br>
        x3
      </span>
    </div>
    <icon name="mdi:arrow-right-bold-outline" size="20" class="text-blue-300" />
    <div
      display="flex"
      align="items-center"
      border="white/20 1"
      p="2"
    >
      <div
        position="relative"
        w="10"
        h="10"
        m="r-2"
      >
        <nuxt-img
          position="absolute"
          top="0"
          format="webp"
          :src="`/quality_bg/iconbg_${quality}.png`"
        />
        <nuxt-img
          position="absolute"
          border="rounded-full"
          object="cover"
          class="transform-center w-[80%] h-[80%]"
          format="webp"
          :src="`/gem/${gemId}.png`"
        />
      </div>
      <span
        text="8"
        w="5"
        :style="colorQuality(quality! + 2)"
      >
        {{ QUALITY_TITLE[quality! + 2] }}
        <br>
        x3
      </span>
    </div>
  </div>
</template>
