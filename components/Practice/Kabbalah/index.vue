<script setup lang="ts">
import { qualityToName } from '~/constants'
import { qualityPalette } from '~/common'

const {
  spiritualRoot,
  currentSpiritualRoot,
  currentKabbalah,
} = storeToRefs(usePlayerStore())
</script>

<template>
  <section
    w="full"
    flex="~ col"
    pos="relative"
  >
    <Line
      m="b-4"
      :style="{ color: qualityPalette(spiritualRoot.quality) }"
    >
      {{ qualityToName[spiritualRoot.quality] }} {{ currentSpiritualRoot.name }} Linh Căn
    </Line>
    <practice-spiritual-root-list />
    <div
      class="h-[calc(100%_-_220px)]"
      overflow="scroll"
      m="t-12"
    >
      <div v-if="currentKabbalah">
        <practice-kabbalah-item
          v-for="kabbalah in currentKabbalah"
          :key="kabbalah.sign"
          p="2"
          border="1 white/40 rounded"
          m="y-2"
          :kabbalah="kabbalah"
        />
      </div>
    </div>
  </section>
</template>
