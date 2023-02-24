<script setup lang="ts">
import { SPIRITUAL_ROOT_RULE } from '@game/config'

const { spiritualRoot, currentSpiritualRoot } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()
</script>

<template>
  <div flex="~ " justify="around" align="items-center">
    <div
      v-for="lc in SPIRITUAL_ROOT_RULE"
      :key="lc.name"
      class="relative w-8"
    >
      <div
        :style="{ border: lc.name === currentSpiritualRoot?.name ? `1px solid ${currentSpiritualRoot?.color}` : false }"
        class="diamond rotate-45 transform absolute" w="8" h="8"
      />
      <div
        text="white center"
        w="8"
        h="4"
        pos="absolute"
        opacity="40"
        top="2"
        :class="{ '!opacity-100': lc.name === currentSpiritualRoot?.name }"
        :style="{ color: lc.name === currentSpiritualRoot?.name ? currentSpiritualRoot?.color : 'white' }"
      >
        {{ lc.name }}
      </div>
    </div>
  </div>
</template>
