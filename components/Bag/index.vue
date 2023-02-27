<script setup lang="ts">
import { BagEquipment, BagGem, BagItem } from '#components'
const tab = ref('item')
const tabItems = [
  {
    key: 'item',
    name: 'Vật Phẩm',
  },
  {
    key: 'equip',
    name: 'Trang Bị',
  },
  {
    key: 'gem',
    name: 'Đá Hồn',
  },
]

const components = computed(() => {
  switch (tab.value) {
    case 'item':
      return BagItem
    case 'equip':
      return BagEquipment
    case 'gem':
      return BagGem
    default:
      return BagEquipment
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
          '!opacity-100 !text-[#4add3b]': tab === tabItem.key,
        }"
        transition="~ opacity duration-800"
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
      top="10"
      w="full"
      flex="~ col"
      align="items-center"
      p="4"
      overflow="auto"
      class="h-[calc(100%_-_47px)]"
    >
      <component :is="components" />
    </div>
  </section>
</template>
