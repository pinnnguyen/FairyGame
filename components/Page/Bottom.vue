<script lang="ts" setup>
import { set, useIntervalFn, useLocalStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerStore, useSoundClickEvent } from '#imports'
import Auction from '~/components/Market/Auction.vue'

const { playerInfo, attribute } = storeToRefs(usePlayerStore())
const togglePlayerInfo = useState('togglePlayerInfo')
const toggleAuction = useState('toggleAuction')
const toggleStore = useState('toggleStore')
const toggleBag = useState('toggleBag')
const toggleUpgrade = useState('toggleUpgrade')
const toggleUpStar = useState('toggleUpStar')
const toggleUpRank = useState('toggleUpRank')
const toggleUpGem = useState('toggleUpGem')
const toggleBoss = useState('toggleBoss')
const upgradeOptions = ref(false)
// const needTimeResource = ref(0)
// const doReFetch = ref(false)

// onMounted(() => {
//   useIntervalFn(() => {
//     if (doReFetch.value)
//       doReFetch.value = false
//     needTimeResource.value += 1
//     if (needTimeResource.value >= 100) {
//       doReFetch.value = true
//       needTimeResource.value = 0
//     }
//   }, 800)
// })

// watch(doReFetch, async (value) => {
//   if (value) {
//     try {
//       const resources = await $fetch('/api/reward/training', {
//         headers: (useRequestHeaders(['cookie']) as any),
//       })
//
//       sendMessage(`+${resources.exp} XP`)
//       sendMessage(`+${resources.gold} Tiền tiên`)
//
//       if (playerInfo.value) {
//         playerInfo.value.exp += resources.exp
//         playerInfo.value.gold += resources.gold
//       }
//     }
//     catch (e: any) {
//       sendMessage(e.statusMessage)
//     }
//   }
// })

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
  upgradeOptions.value = true
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
    key: 'boss',
    name: 'Boss',
    fn: ontoggleBoss,
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
  <var-popup v-model:show="upgradeOptions" position="center">
    <div class="w-[90vw] bg-[#191b1e] grid grid-cols-2 gap-4 p-5 rounded border border-white/40">
      <div
        class="transition transition-opacity text-center mx-2 px-2 py-2 italic shadow rounded font-bold border-1 text-primary border-white/40"
        @click="onToggleUpgrade"
      >
        Cường hoá
      </div>
      <div
        class="transition transition-opacity duration-800 text-center mx-2 px-2 py-2 italic shadow rounded font-bold border-1 text-primary border-white/40"
        @click="onToggleUpStar"
      >
        Nâng sao
      </div>
      <div
        class="transition transition-opacity duration-800 text-center mx-2 px-2 py-2 italic shadow rounded font-bold border-1 text-primary border-white/40"
        @click="onToggleUpRank"
      >
        Tăng bậc
      </div>
      <div
        class="transition transition-opacity duration-800 text-center mx-2 px-2 py-2 italic shadow rounded font-bold border-1 text-primary border-white/40"
        @click="onToggleUpGem"
      >
        Đá hồn
      </div>
    </div>
  </var-popup>
  <div class="h-full">
    <div class="flex justify-around w-full absolute top-[10px] pl-1 text-white">
      <button
        v-for="menu in menuItems"
        :key="menu.key"
        class="transition transition-color duration-800 mx-2 h-10 w-10 shadow rounded text-12 italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu"
      >
        <span
          :class="{
            'text-[#4add3b]': tab === menu.key,
          }"
          @click.stop="setTab(menu.key)"
        >
          {{ menu.name }}
        </span>
      </button>
    </div>
    <div class="absolute top-16 text-10 text-[#eaeced] italic w-full h-[calc(100%_-_115px)]">
      <Store v-if="tabStore" />
      <Market v-if="tabMarket" />
      <template v-if="tabCharacter">
        <Line class="mb-4">
          Thuộc tính nhân vật
        </Line>
        <div class="flex-center">
          <div class="flex w-full justify-around">
            <PlayerShortView />
            <div>
              <PlayerTupo />
            </div>
          </div>
        </div>
        <Line class="mt-4">
          Thiết lập trang bị
        </Line>
        <PlayerEquipmentDefault />
      </template>
      <template v-if="tabBag">
        <Bag />
      </template>
      <template v-if="tabBoss">
        <Boss />
      </template>
    </div>
  </div>
</template>
