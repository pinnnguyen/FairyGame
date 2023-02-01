<script setup lang="ts">
import { usePlayerStore, useSoundHomeEvent } from '#imports'
import { ROLE_IMG } from '~/constants'

const { $io } = useNuxtApp()
const { playerInfo } = usePlayerStore()

const toggleAuction = useState('toggleAuction')
const toggleStore = useState('toggleStore')

const toggleBag = useState('toggleBag')
const toggleUpgrade = useState('toggleUpgrade')

const toggleUpStar = useState('toggleUpStar')
const toggleUpRank = useState('toggleUpRank')

const toggleUpGem = useState('toggleUpGem')
const togglePlayerInfo = useState('togglePlayerInfo')
const toggleBoss = useState('toggleBoss')

const startBattle = useState('startBattle')
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
  setTimeout(async () => {
    await useSoundHomeEvent().play()
  }, 10000)
  // shouldTupo({
  //   level: playerInfo.value?.level,
  //   floor: playerInfo.value?.floor,
  //   levelTitle: playerInfo.value?.levelTitle,
  // })
})
const playerClassIMG = computed(() => {
  if (!playerInfo?.class)
    return ''

  return ROLE_IMG[playerInfo.class]
})
</script>

<template>
  <TheRight />
  <var-popup v-model:show="toggleBoss" position="center">
    <Boss />
  </var-popup>
  <var-popup v-model:show="togglePlayerInfo" position="center">
    <PlayerInfomation />
  </var-popup>
  <var-popup v-model:show="startBattle" position="center">
    <Battle />
  </var-popup>
  <var-popup v-model:show="toggleUpgrade" position="center">
    <Upgrade v-if="toggleUpgrade" />
  </var-popup>
  <var-popup v-model:show="toggleAuction" position="center">
    <Market />
  </var-popup>
  <var-popup v-model:show="toggleBag" position="center">
    <Bag />
  </var-popup>
  <var-popup v-model:show="toggleStore" position="center">
    <Store />
  </var-popup>
  <var-popup v-model:show="toggleUpStar" position="center">
    <UpgradeUpStar />
  </var-popup>
  <var-popup v-model:show="toggleUpRank" position="center">
    <UpgradeUpRank />
  </var-popup>
  <var-popup v-model:show="toggleUpGem" position="center">
    <UpgradeGem />
  </var-popup>

  <PageSection class="flex-1 flex items-center relative justify-center z-9">
    <div class="w-full absolute top-0 h-[40%]">
      <div class="relative h-full">
        <nuxt-img format="webp" class="h-full object-cover" src="/index/bg.png" />
        <nuxt-img
          class="absolute bottom-7 left-[calc(50%_-_75px)] w-[150px]"
          format="webp"
          :src="playerClassIMG"
        />
      </div>
    </div>
    <div class="absolute bottom-0 w-full h-[60%]">
      <div class="relative h-full">
        <PageBottom />
      </div>
    </div>
  </PageSection>
</template>
