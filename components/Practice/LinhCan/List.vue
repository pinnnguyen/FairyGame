<script setup lang="ts">
import { LINH_CAN_RULE } from '~/config'

const { linhCan } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const currentLC = computed(() => {
  if (!linhCan.value?.kind)
    return null

  return LINH_CAN_RULE[linhCan.value?.kind]
})
</script>

<template>
  <div flex="~ " justify="between" align="items-center">
    <div
      v-for="lc in LINH_CAN_RULE"
      :key="lc.name"
      class="relative w-10"
    >
      <div
        :style="{ border: lc.name === currentLC?.name ? `1px solid ${currentLC?.color}` : false }"
        class="diamond rotate-45 transform absolute" w="8" h="8"
      />
      <div
        text="white center"
        w="8"
        h="4"
        pos="absolute"
        opacity="40"
        top="2"
        :class="{ '!opacity-100': lc.name === currentLC?.name }"
        :style="{ color: lc.name === currentLC?.name ? currentLC?.color : 'white' }"
      >
        {{ lc.name }}
      </div>
    </div>
  </div>
</template>
