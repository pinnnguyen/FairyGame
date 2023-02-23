<script setup lang="ts">
import { playerTitle, qualityPalette } from '~/common'
import { attributeToName, qualityToName } from '~/constants'

const { spiritualRoot, currentSpiritualRoot } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()
</script>

<template>
  <div
    v-if="currentSpiritualRoot"
    font="leading-5"
  >
    <div>
      Cấp độ: {{ playerTitle(spiritualRoot.level).levelTitle }} {{ playerTitle(spiritualRoot.level).floor }}
    </div>
    <div
      grid="~ cols-2"
    >
      <div
        v-for="(s, key) in currentSpiritualRoot.values"
        :key="key"
        flex="~ "
        justify="between"
        m="r-2"
        text="8"
      >
        <div class="line-clamp-1">
          {{ attributeToName[key] }}
        </div>
        <div>
          {{ Math.round(parseFloat(`1.${spiritualRoot.quality}`) * s * (spiritualRoot.level ?? 1) * 100) / 100 }}
          <span text="green-500">(+{{ Math.round(s * parseFloat(`1.${spiritualRoot.quality}`) * 100) / 100 }})</span>
        </div>
      </div>
    </div>
    <practice-spiritual-root-resource />
  </div>
</template>
