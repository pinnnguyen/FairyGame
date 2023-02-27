<script setup lang="ts">
import type { TabItem } from '~/types'

const props = defineProps<{
  default?: string
  tabItems: TabItem[]
}>()

const emits = defineEmits(['onSelected'])
const tab = ref(props.default)

watch(tab, (t) => {
  emits('onSelected', t)
})
</script>

<template>
  <button
    v-for="tabItem in tabItems"
    :key="tabItem.key"
    :class="{
      '!opacity-100 !text-[#4add3b]': tab === tabItem.key,
    }"
    transition="~ opacity duration-800"
    m="x-2"
    h="8"
    font="leading-3 italic bold"
    border="1 white/40 rounded"
    text="primary space-nowrap 10"
    opacity="40"
    @click.stop="tab = tabItem.key"
  >
    {{ tabItem.name }}
  </button>
</template>
