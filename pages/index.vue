<script setup lang="ts">
import { usePlayerStore } from '#imports'

const { $io } = useNuxtApp()
const { loadPlayer } = usePlayerStore()
const isArena = useState('isArena', () => false)

definePageMeta({
  middleware: ['game'],
  auth: false,
})

$io.on('fetch:player:response', (data: any) => {
  loadPlayer(data)
})

watch(isArena, (arena) => {
  console.log('arena', arena)
})
</script>

<template>
  <menus />
  <page-section
    flex="~ 1"
    position="relative"
    justify="center"
    align="items-center"
    z="9"
  >
    <div
      w="full"
      pos="absolute"
      class="top-[40px] h-[34%]"
    >
      <div
        pos="relative"
        h="full"
        border="b white/10"
        bg="primary"
      >
        <battle v-if="!isArena" />
        <arena v-else />
      </div>
    </div>
    <div
      pos="absolute"
      bottom="0"
      w="full"
      class="h-[60%]"
    >
      <div
        pos="relative"
        h="full"
      >
        <page-bottom />
      </div>
    </div>
    <exchange />
  </page-section>
</template>
