<script setup lang="ts">
import { LazyPracticeClass, LazyPracticeLinhCan, LazyPracticeMindDharma } from '#components'
import type { TabItem } from '~/types'

const tab = ref('mindDharma')
const tabItems = [
  {
    key: 'mindDharma',
    name: 'Tâm pháp',
  },
  {
    key: 'class',
    name: 'Huyết mạnh',
  },
  {
    key: 'linh_can',
    name: 'Linh căn',
  },
  {
    key: '1',
    name: 'Thần thông',
  },
]

const components = computed(() => {
  switch (tab.value) {
    case 'mindDharma':
      return LazyPracticeMindDharma
    case 'class':
      return LazyPracticeClass
    case 'linh_can':
      return LazyPracticeLinhCan
  }
})

const tabSelected = (t: TabItem) => {
  set(tab, t)
}
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
      <common-tab
        :default="tab"
        :tab-items="tabItems"
        @onSelected="tabSelected"
      />
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
