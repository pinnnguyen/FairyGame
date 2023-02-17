<script lang="ts" setup>
import { set } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { usePlayerStore, useSoundClickEvent } from '#imports'
import { LazyActivity, LazyBag, LazyBoss, LazyCharacter, LazyMarket, LazyPractice, LazyStore } from '#components'

const { playerInfo, attribute } = storeToRefs(usePlayerStore())

const togglePlayerInfo = useState('togglePlayerInfo')
const toggleUpgrade = useState('toggleUpgrade')
const toggleUpStar = useState('toggleUpStar')
const toggleUpRank = useState('toggleUpRank')
const toggleUpGem = useState('toggleUpGem')

const toggleOptions = reactive({
  showUpgrade: false,
})

const onToggleUpgrade = () => {
  toggleUpgrade.value = true
  useSoundClickEvent()
}
const onToggleUpStar = () => {
  toggleUpStar.value = true
  useSoundClickEvent()
}

const onToggleUpRank = () => {
  toggleUpRank.value = true
  useSoundClickEvent()
}

const onToggleUpGem = () => {
  toggleUpGem.value = true
  useSoundClickEvent()
}

const onUpgradeOptions = () => {
  toggleOptions.showUpgrade = true
  useSoundClickEvent()
}

const onPlayerInfo = () => {
  togglePlayerInfo.value = true
  useSoundClickEvent()
}

const tab = ref('character')
const menuItems = [
  {
    key: 'character',
    name: 'Nhân vật',
    fn: onPlayerInfo,
  },
  {
    key: 'practice',
    name: 'Tu luyện',
  },
  {
    key: 'upgrade',
    name: 'Nâng Cấp',
    fn: onUpgradeOptions,
  },
  {
    key: 'bag',
    name: 'Túi',
  },
  {
    key: 'market',
    name: 'Chợ',
  },
  {
    key: 'store',
    name: 'Cửa Hàng',
  },
  {
    key: 'activity',
    name: 'Hoạt động',
  },
  {
    key: 'boss',
    name: 'Boss',
  },
]

const upgradeTabOptions = [
  {
    name: 'Cường hoá',
    fn: onToggleUpgrade,
  },
  {
    name: 'Nâng sao',
    fn: onToggleUpStar,
  },
  {
    name: 'Tăng bậc',
    fn: onToggleUpRank,
  },
  {
    name: 'Đá hồn',
    fn: onToggleUpGem,
  },
]

const dynamicComponent = computed(() => {
  switch (tab.value) {
    case 'market':
      return LazyMarket

    case 'store':
      return LazyStore

    case 'character':
      return LazyCharacter

    case 'bag':
      return LazyBag

    case 'boss':
      return LazyBoss

    case 'activity':
      return LazyActivity

    case 'practice':
      return LazyPractice
  }
})

const setTab = (t: string) => {
  if (['upgrade'].includes(t)) {
    onUpgradeOptions()
    return
  }

  set(tab, t)
}
</script>

<template>
  <var-popup v-model:show="toggleOptions.showUpgrade">
    <div
      w="[90vw]"
      max-w="[60vh]"
      bg="primary"
      grid="~ cols-2"
      gap="4"
      p="5"
      border="rounded 1 white/40"
    >
      <div
        v-for="upgradeTab in upgradeTabOptions"
        :key="upgradeTab.name"
        text="center italic 10 primary"
        m="x-2"
        p="x-2 y-2"
        transition="~ opacity"
        border="rounded 1 white/40"
        font="bold"
        @click="upgradeTab.fn"
      >
        {{ upgradeTab.name }}
      </div>
    </div>
  </var-popup>
  <div class="h-full">
    <div
      flex="~"
      justify="around"
      w="full"
      pos="absolute"
      top="[10px]"
      p="l-1"
      text="white"
    >
      <button
        v-for="menu in menuItems"
        :key="menu.key"
        transition="~ colors duration-800"
        m="x-2"
        w="8"
        h="8"
        text="12 primary"
        font="italic semibold"
        border="rounded-full 1 white/40"
        class="bg-button-menu"
        @click.stop="setTab(menu.key)"
      >
        <div
          w="8"
          :class="{
            'text-[#4add3b]': tab === menu.key,
          }"
        >
          {{ menu.name }}
        </div>
      </button>
    </div>
    <div class="absolute top-16 text-10 text-[#eaeced] italic w-full h-[calc(100%_-_115px)]">
      <component :is="dynamicComponent" />
    </div>
  </div>
</template>
