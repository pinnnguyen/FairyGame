<script setup lang="ts">
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
  <Auction v-if="toggleAuction" @close="toggleAuction = false" />
  <Store v-if="toggleStore" @close="toggleStore = false" />
  <Upgrade v-if="toggleUpgrade" @close="toggleUpgrade = false" />
  <Bag v-if="toggleBag" @close="toggleBag = false" />

  <PageSection class="flex-1 flex items-center relative justify-center z-9">
    <div class="w-full absolute top-0">
      <div class="relative">
        <NuxtImg format="webp" src="/index/bg.png" />
        <NuxtImg class="absolute bottom-4 left-[calc(50%_-_50px)] w-[100px]" format="webp" src="/pve/nv1.png" />
      </div>
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="relative">
        <PageBottom />
      </div>
    </div>
  </PageSection>
</template>
