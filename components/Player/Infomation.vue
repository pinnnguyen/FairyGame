<script setup>
const { leftSlots, rightSlots } = storeToRefs(usePlayerSlot())
const { playerInfo } = storeToRefs(usePlayerStore())
const currentTab = ref('attribute')

const tabs = ref([
  {
    key: 'equipment',
    name: 'Trang Bị',
  },
  {
    key: 'attribute',
    name: 'Thuộc Tính',
  },
  // {
  //   key: 'tupo',
  //   name: 'Đột phá',
  // },
])
</script>

<template>
  <div class="bg-primary border-box h-[80%] w-[calc(100vw_-_30px)] h-120 relative overflow-hidden max-w-[60vh]">
    <div class="h-full absolute top-0 w-full">
      <div
        class="m-1 rounded-md text-10 font-semibold h-[calc(100%_-_60px)]"
      >
        <player-attribute-tab v-if="currentTab === 'attribute'" />
        <player-equip-tab
          v-if="currentTab === 'equipment'"
          :name="playerInfo.name"
          :level="playerInfo.level"
          :level-title="playerInfo.levelTitle"
          :floor="playerInfo.floor"
          :class-role="playerInfo.class"
          :exp="playerInfo.exp"
          :knb="playerInfo.knb"
          :gold="playerInfo.gold"
          :left-slots="leftSlots"
          :right-slots="rightSlots"
        />
      </div>
      <div class="flex-center w-full absolute bottom-4">
        <button
          v-for="t in tabs"
          :key="t.key"
          class="transition text-12 px-2 opacity-40 duration-800 transition-opacity mx-2 h-8 leading-3 italic shadow rounded font-bold border-1 text-primary border-white/40"
          :class="{ '!opacity-100': currentTab === t.key }" @click="currentTab = t.key"
        >
          {{ t.name }}
        </button>
      </div>
    </div>
  </div>
</template>
