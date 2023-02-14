<script lang="ts" setup>
import { set } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { usePlayerSlot, usePlayerStore, useSoundClickEvent } from '#imports'

const { playerInfo, attribute } = storeToRefs(usePlayerStore())
const { leftSlots, rightSlots } = storeToRefs(usePlayerSlot())

const togglePlayerInfo = useState('togglePlayerInfo')
const toggleAuction = useState('toggleAuction')
const toggleStore = useState('toggleStore')
const toggleBag = useState('toggleBag')
const toggleUpgrade = useState('toggleUpgrade')
const toggleUpStar = useState('toggleUpStar')
const toggleUpRank = useState('toggleUpRank')
const toggleUpGem = useState('toggleUpGem')
const toggleBoss = useState('toggleBoss')
// const toggleSetting = useState('toggleSetting')
// const upgradeOptions = ref(false)

const toggleOptions = reactive({
  showUpgrade: false,
})

const onToggleUpgrade = () => {
  toggleUpgrade.value = true
  useSoundClickEvent()
}

const ontoggleBoss = () => {
  toggleBoss.value = true
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

const onToggleAuction = () => {
  toggleAuction.value = true
  useSoundClickEvent()
}

const ontoggleStore = () => {
  toggleStore.value = true
  useSoundClickEvent()
}

const ontoggleBag = () => {
  toggleBag.value = true
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
    name: 'Nhân vât',
    fn: onPlayerInfo,
  },
  {
    key: 'upgrade',
    name: 'Nâng Cấp',
    fn: onUpgradeOptions,
  },
  {
    key: 'bag',
    name: 'Túi',
    fn: ontoggleBag,
  },
  {
    key: 'market',
    name: 'Chợ',
    fn: onToggleAuction,
  },
  {
    key: 'store',
    name: 'Cửa Hàng',
    fn: ontoggleStore,
  },
  {
    key: 'activity',
    name: 'Hoạt động',
    fn: ontoggleStore,
  },
  {
    key: 'boss',
    name: 'Boss',
    fn: ontoggleBoss,
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

const tabMarket = computed(() => tab.value === 'market')
const tabStore = computed(() => tab.value === 'store')
const tabCharacter = computed(() => tab.value === 'character')
const tabBag = computed(() => tab.value === 'bag')
const tabBoss = computed(() => tab.value === 'boss')

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
    <div class="flex justify-around w-full absolute top-[10px] pl-1 text-white">
      <button
        v-for="menu in menuItems"
        :key="menu.key"
        transition="~ colors duration-800"
        m="x-2"
        w="10"
        h="10"
        text="12 primary"
        font="italic semibold"
        border="rounded-full 1 white/40"
        class="bg-button-menu"
        @click.stop="setTab(menu.key)"
      >
        <span
          :class="{
            'text-[#4add3b]': tab === menu.key,
          }"
        >
          {{ menu.name }}
        </span>
      </button>
    </div>
    <div class="absolute top-16 text-10 text-[#eaeced] italic w-full h-[calc(100%_-_115px)]">
      <store v-if="tabStore" />
      <market v-if="tabMarket" />
      <template v-if="tabCharacter">
        <Line class="mb-4">
          Thuộc tính nhân vật
        </Line>
        <div class="flex-center">
          <div class="flex w-full justify-around">
            <player-short-view />
            <div>
              <player-tupo />
            </div>
          </div>
        </div>
        <Line class="mt-4">
          Thiết lập trang bị
        </Line>
        <player-equipment-default
          :left-slots="leftSlots"
          :right-slots="rightSlots"
        />
      </template>
      <template v-if="tabBag">
        <bag />
      </template>
      <template v-if="tabBoss">
        <boss />
      </template>
    </div>
  </div>
</template>
