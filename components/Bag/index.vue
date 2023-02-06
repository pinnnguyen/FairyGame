<script setup lang="ts">
const tab = ref<string>('item')
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
</script>

<template>
  <div
    position="relative"
    h="full"
    class="flex-center"
  >
    <div
      position="absolute"
      top="0"
      display="flex"
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
      position="absolute"
      top="10"
      w="full"
      display="flex"
      flex="col"
      align="items-center"
      p="4"
      overflow="auto"
      class="h-[calc(100%_-_47px)]"
    >
      <BagEquipment
        v-if="tab === 'equip' "
      />
      <BagItem
        v-if="tab === 'item' "
      />
      <BagGem
        v-if="tab === 'gem' "
      />
    </div>
  </div>
</template>
