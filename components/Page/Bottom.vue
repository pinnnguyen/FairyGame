<script lang="ts" setup>
import { useIntervalFn, useLocalStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerStore, useSoundClickEvent } from '#imports'

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
const needTimeResource = ref(0)
const doReFetch = ref(false)

onMounted(() => {
  useIntervalFn(() => {
    if (doReFetch.value)
      doReFetch.value = false
    needTimeResource.value += 1
    if (needTimeResource.value >= 100) {
      doReFetch.value = true
      needTimeResource.value = 0
    }
  }, 800)
})

watch(doReFetch, async (value) => {
  if (value) {
    try {
      const resources = await $fetch('/api/reward/training', {
        headers: (useRequestHeaders(['cookie']) as any),
      })

      sendMessage(`+${resources.exp} XP`)
      sendMessage(`+${resources.gold} VÀNG`)

      if (playerInfo.value) {
        playerInfo.value.exp += resources.exp
        playerInfo.value.gold += resources.gold
      }
    }
    catch (e: any) {
      sendMessage(e.statusMessage)
    }
  }
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
  upgradeOptions.value = true
  useSoundClickEvent()
}

const onToggleAuction = () => {
  toggleAuction.value = true
  useSoundClickEvent()
}

// const onstartBattle = () => {
//   startBattle.value = true
//   useSoundClickEvent()
// }

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
    fn: onToggleUpgrade,
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
    name: 'Săn Boss',
    fn: ontoggleBoss,
  },
]
</script>

<template>
  <var-popup v-model:show="upgradeOptions" position="center">
    <div class="w-[85vw] bg-[#252c47] flex flex-col justify-center items-center p-5 rounded border border-white/40">
      <div class="bg-white rounded-[150px] flex items-center justify-center w-[70%] h-[40px] p-1 relative m-3" @click="onToggleUpgrade">
        <icon name="game-icons:sword-in-stone" size="25" class="absolute left-5" />
        <span class="font-bold">
          Cường hoá
        </span>
      </div>
      <div class="bg-white rounded-[150px] flex items-center justify-center w-[70%] h-[40px] p-1 mt-2 relative m-3" @click="onToggleUpStar">
        <icon name="fluent:star-add-24-filled" size="25" class="absolute left-5" />
        <span class="font-bold">
          Nâng sao
        </span>
      </div>
      <div class="bg-white rounded-[150px] flex items-center justify-center w-[70%] h-[40px] p-1 mt-2 relative m-3" @click="onToggleUpRank">
        <icon name="mingcute:transfer-3-fill" size="25" class="absolute left-5" />
        <span class="font-bold">
          Tăng bậc
        </span>
      </div>
      <div class="bg-white rounded-[150px] flex items-center justify-center w-[70%] h-[40px] p-1 mt-2 relative m-3" @click="onToggleUpGem">
        <icon name="fontisto:ruby" size="25" class="absolute left-5" />
        <span class="font-bold">
          Đá hồn
        </span>
      </div>
    </div>
  </var-popup>
  <div class="h-full">
    <!--    <nuxt-img class="h-full object-cover" format="webp" src="/index/bg_bottom.png" /> -->
    <div class="flex justify-around w-full absolute top-[10px] pl-1 text-white">
      <button
        v-for="menu in menuItems"
        :key="menu.key"
        class="mx-2 h-10 w-10 shadow rounded text-12 italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu"
        @click.stop="menu.fn()"
      >
        <span
          :class="{
            'text-[#4add3b]': tab === menu.key,
          }"
          @click.stop="tab = menu.key"
        >
          {{ menu.name }}
        </span>
      </button>
    </div>
    <div class="absolute bottom-0 text-center w-full flex justify-center flex-col items-center text-white">
      <Chat />
    </div>
    <div class="absolute top-16 text-10 h-full text-[#eaeced] italic w-full">
      <template v-if="tab === 'character'">
        <Line class="mb-4">
          Thuộc tính nhân vật
        </Line>
        <div class="flex">
          <PlayerShortView />
          <PlayerTupo />
        </div>
        <Line class="mt-4">
          Thiết lập trang bị
        </Line>
        <PlayerEquipmentDefault />
      </template>
      <template v-if="tab === 'bag'">
        <Bag />
      </template>
    </div>
  </div>
</template>
