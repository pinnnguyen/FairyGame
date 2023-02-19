<script setup lang="ts">
import { qualityToName } from '../../../constants'
import { qualityPalette } from '~/common'
import { KABBALAH_RULE } from '~/config'

const { spiritualRoot, currentSpiritualRoot } = storeToRefs(usePlayerStore())
const currentKabbalahs = computed(() => {
  if (!spiritualRoot.value?.kind)
    return null

  return KABBALAH_RULE[spiritualRoot.value.kind]
})
</script>

<template>
  <section
    m="y-2"
    p="3"
    w="full"
    flex="~ col"
  >
    <practice-spiritual-root-list />
    <div
      class="h-[calc(100%_-_40px)]"
      overflow="scroll"
      p="t-12"
    >
      <Line
        m="b-2"
        :style="{ color: qualityPalette(spiritualRoot.quality) }"
      >
        {{ qualityToName[spiritualRoot.quality] }} {{ currentSpiritualRoot.name }} Linh Căn
      </Line>
      <div v-if="currentKabbalahs">
        <practice-kabbalah-item
          v-for="kabbalah in currentKabbalahs"
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
