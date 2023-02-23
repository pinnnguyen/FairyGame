<script setup lang="ts">
import { qualityToName } from '~/constants'
import { qualityPalette } from '~/common'

const { spiritualRoot, currentSpiritualRoot } = storeToRefs(usePlayerStore())
</script>

<template>
  <section
    w="full"
    flex="~ col"
  >
    <Line
      m="b-4"
      :style="{ color: qualityPalette(spiritualRoot.quality) }"
    >
      {{ qualityToName[spiritualRoot.quality] }} {{ currentSpiritualRoot.name }} Linh Căn
    </Line>
    <practice-spiritual-root-list />
    <div p="t-12">
      <practice-spiritual-root-starter />
      <practice-spiritual-root-mine />
    </div>
  </section>
</template>
