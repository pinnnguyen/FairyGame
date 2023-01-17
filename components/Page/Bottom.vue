<script lang="ts" setup>
import { useIntervalFn, useLocalStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerStore, useSoundClickEvent } from '#imports'

const { playerInfo } = storeToRefs(usePlayerStore())
const startBattle = useLocalStorage('startBattle', false)

const togglePlayerInfo = useState('togglePlayerInfo')
const toggleAuction = useState('toggleAuction')

const toggleStore = useState('toggleStore')
const toggleBag = useState('toggleBag')

const toggleUpgrade = useState('toggleUpgrade')
const toggleUpStar = useState('toggleUpStar')
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

const onToggleUpStar = () => {
  toggleUpStar.value = true
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

const onstartBattle = () => {
  startBattle.value = true
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
</script>

<template>
  <var-popup v-model:show="upgradeOptions" position="center">
    <div class="w-[85vw] bg-[#252c47] flex flex-col justify-center items-center p-5">
      <div class="bg-white rounded-[150px] flex items-center justify-center w-[70%] h-[40px] p-1 relative m-3" @click="onToggleUpgrade">
        <icon name="game-icons:sword-in-stone" size="25" class="absolute left-5" />
        <span class="font-bold">
          Cường hoá
        </span>
      </div>
      <div class="bg-white rounded-[150px] flex items-center justify-center w-[70%] h-[40px] p-1 mt-2 relative m-3" @click="onToggleUpStar">
        <icon name="material-symbols:star" size="25" class="absolute left-5" />
        <span class="font-bold">
          Nâng sao
        </span>
      </div>
    </div>
  </var-popup>
  <div class="h-full">
    <nuxt-img class="h-full object-cover" format="webp" src="/index/bg_bottom.png" />
    <div class="flex justify-around w-full absolute top-[10px] pl-1 text-white">
      <div class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">
        <nuxt-img class="w-[40px]" src="/bottom/menu/XJHomescreenButton_29.png" @click.stop="onPlayerInfo" />
        <span class="text-black/60 whitespace-nowrap text-12">Nhân vật</span>
      </div>
      <div class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">
        <nuxt-img class="w-[40px]" format="webp" src="/bottom/menu/XJDengxiandao_15.png" @click.stop="ontoggleBag" />
        <span class="text-black/60 whitespace-nowrap text-12">Túi</span>
      </div>
      <div class="items-center justify-center flex flex-col w-[50px] mb-3">
        <nuxt-img class="w-[40px]" src="/bottom/menu/XJHomescreenButton_20.png" @click.stop="ontoggleStore" />
        <span class="text-black/60 whitespace-nowrap text-12">Cửa hàng</span>
      </div>
      <nuxt-link class="flex flex-col items-center justify-center w-[50px] mb-3" @click="onstartBattle">
        <nuxt-img class="w-[40px]" src="/bottom/menu/XJHomescreenButton_15.png" />
        <span class="text-black/60 whitespace-nowrap text-12">Vượt ải</span>
      </nuxt-link>
    </div>
    <div class="absolute bottom-0 text-center w-full flex justify-center flex-col items-center text-white">
      <div class="flex items-center justify-around w-full mb-4">
        <div class="flex items-center jsutify-center flex-col">
          <div class="diamond w-[30px] h-[30px] flex items-center justify-center">
            <nuxt-img src="/bottom/menu/XJHomescreenButton_23.png" format="webp" class="transform rotate-45" />
          </div>
          <span class="whitespace-nowrap text-12 text-black/60 mt-2">Công pháp</span>
        </div>
        <div class="flex items-center jsutify-center flex-col" @click="onToggleAuction">
          <div class="diamond w-[30px] h-[30px] flex items-center justify-center">
            <nuxt-img src="/bottom/menu/XJHomescreenButton_27.png" format="webp" class="transform rotate-45" />
          </div>
          <span class="whitespace-nowrap text-12 text-black/60 mt-2">Đấu giá</span>
        </div>
        <div class="flex items-center jsutify-center flex-col">
          <div class="diamond w-[30px] h-[30px] flex items-center justify-center">
            <nuxt-img src="/bottom/menu/XJHomescreenButton_10.png" format="webp" class="transform rotate-45" />
          </div>
          <span class="whitespace-nowrap text-12 text-black/60 mt-2">Tông môn</span>
        </div>
        <div class="flex items-center jsutify-center flex-col" @click.stop="onUpgradeOptions">
          <div class="diamond w-[30px] h-[30px] flex items-center justify-center">
            <nuxt-img src="/bottom/menu/XJHomescreenButton_04.png" format="webp" class="transform rotate-45" />
          </div>
          <span class="whitespace-nowrap text-12 text-black/60 mt-2">Nâng cấp</span>
        </div>
        <div class="flex items-center jsutify-center flex-col">
          <div class="diamond w-[30px] h-[30px] flex items-center justify-center">
            <icon name="material-symbols:settings-outline" size="20" class="transform rotate-45" />
          </div>
          <span class="whitespace-nowrap text-12 text-black/60 mt-2">
            Cài đặt
          </span>
        </div>
      </div>
      <div class="h-12 w-full flex justify-around items-center bg-[#1d3a62]">
        <nuxt-img class="w-[45px]" src="/index/avatar-bottom.png" />
        <div class="w-[60%] bg-gray-200 rounded-full h-1 dark:bg-gray-700">
          <div class="bg-blue-600 h-1 rounded-full duration-700" :style="{ width: `${needTimeResource}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>
