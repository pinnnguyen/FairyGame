<script setup lang="ts">
import { PracticeMindDharma } from '#components'

const tab = ref('mindDharma')
const tabItems = [
  {
    key: 'mindDharma',
    name: 'Tâm pháp',
  },
  {
    key: '1',
    name: 'Thần thông',
  },
  {
    key: '2',
    name: 'Linh căn',
  },
  {
    key: '3',
    name: 'Thần thông',
  },
  {
    key: '4',
    name: 'Huyết mạnh',
  },
]

const components = computed(() => {
  switch (tab.value) {
    case 'mindDharma':
      return PracticeMindDharma
  }
})
</script>

<template>
  <section
    pos="relative"
    h="full"
    class="flex-center"
  >
    <div
      pos="absolute"
      top="0"
      flex="~ "
      align="items-center"
      w="full"
      p="2"
    >
      <button
        v-for="tabItem in tabItems"
        :key="tabItem.key"
        :class="{
          '!opacity-100': tab === tabItem.key,
        }"
        transition="~ opacity duration-700"
        m="x-2"
        w="16"
        h="8"
        font="leading-3 italic bold"
        border="1 white/40 rounded"
        text="primary"
        opacity="40"
        @click.stop="tab = tabItem.key"
      >
        {{ tabItem.name }}
      </button>
    </div>
    <div
      pos="absolute"
      top="12"
      flex="~ col"
      align="items-center"
      p="x-4"
      w="full"
      overflow="auto"
      class="h-[calc(100%_-_47px)]"
    >
      <component :is="components" />
    </div>
  </section>
</template>
