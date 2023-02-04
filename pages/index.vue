<script setup lang="ts">
import { usePlayerStore, useSoundHomeEvent } from '#imports'
import { ROLE_IMG } from '~/constants'

const { $io } = useNuxtApp()
const { playerInfo, loadPlayer } = usePlayerStore()

const toggleAuction = useState('toggleAuction')
const toggleUpgrade = useState('toggleUpgrade')

const toggleUpStar = useState('toggleUpStar')
const toggleUpRank = useState('toggleUpRank')

const toggleUpGem = useState('toggleUpGem')
const togglePlayerInfo = useState('togglePlayerInfo')
const toggleBoss = useState('toggleBoss')

// activeSound.play()
definePageMeta({
  middleware: ['game'],
  auth: false,
})

$io.on('fetch:player:response', (data) => {
  console.log('data', data)
  loadPlayer(data)
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
</script>

<template>
  <TheRight />
  <var-popup v-model:show="toggleBoss" position="center">
    <Boss />
  </var-popup>
  <var-popup v-model:show="togglePlayerInfo" position="center">
    <PlayerInfomation />
  </var-popup>
  <var-popup v-model:show="toggleUpgrade" position="center">
    <Upgrade v-if="toggleUpgrade" />
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
      <div class="relative h-full border-b border-white/10">
        <Battle />
      </div>
    </div>
    <div class="absolute bottom-0 w-full h-[60%]">
      <div class="relative h-full">
        <PageBottom />
      </div>
    </div>
    <Chat />
  </PageSection>
</template>
