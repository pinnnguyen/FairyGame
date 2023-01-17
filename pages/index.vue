<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia'
// import { useSound } from '@vueuse/sound'
import { usePlayerStore } from '~/composables/usePlayer'
// import { shouldTupo } from '~/server/common'

const { $io } = useNuxtApp()

const { playerInfo } = storeToRefs(usePlayerStore())
const toggleAuction = useState('toggleAuction')
const toggleStore = useState('toggleStore')
const toggleBag = useState('toggleBag')
const toggleUpgrade = useState('toggleUpgrade')
const { playerInfoComponent } = storeToRefs(useAppStore())
const startBattle = useLocalStorage('startBattle', false)
// console.log('bg_mu', bg_mu)
// const activeSound = useSound(bg_mu, {
//   volume: 0.5,
// })

// activeSound.play()
definePageMeta({
  middleware: ['game'],
  auth: false,
})

onMounted(async () => {
  console.log('$io', $io)
  // shouldTupo({
  //   level: playerInfo.value?.level,
  //   floor: playerInfo.value?.floor,
  //   levelTitle: playerInfo.value?.levelTitle,
  // })
})
</script>

<template>
  <TheRight />

  <var-popup v-model:show="playerInfoComponent" position="center">
    <PlayerInfomation />
  </var-popup>

  <var-popup v-model:show="startBattle" position="center">
    <Battle />
  </var-popup>

  <var-popup v-model:show="toggleUpgrade" position="center">
    <Upgrade v-if="toggleUpgrade" />
  </var-popup>
  <var-popup v-model:show="toggleAuction" position="center">
    <Auction />
  </var-popup>
  <var-popup v-model:show="toggleBag" position="center">
    <Bag />
  </var-popup>
  <var-popup v-model:show="toggleStore" position="center">
    <Store />
  </var-popup>

  <PageSection class="flex-1 flex items-center relative justify-center z-9">
    <div class="w-full absolute top-0">
      <div class="relative">
        <nuxt-img format="webp" src="/index/bg.png" />
        <nuxt-img class="absolute bottom-4 left-[calc(50%_-_50px)] w-[100px]" format="webp" src="/pve/nv1.png" />
      </div>
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="relative">
        <PageBottom />
      </div>
    </div>
  </PageSection>
</template>
