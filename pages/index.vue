<script setup lang="ts">
import { usePlayerStore } from '#imports'

const { $io } = useNuxtApp()
const { loadPlayer } = usePlayerStore()

definePageMeta({
  middleware: ['game'],
  auth: false,
})

$io.on('fetch:player:response', (data: any) => {
  loadPlayer(data)
})
</script>

<template>
  <Menu />
  <PageSection
    display="flex"
    flex="1"
    position="relative"
    justify="center"
    align="items-center"
    z="9"
  >
    <div
      w="full"
      position="absolute"
      class="top-[40px] h-[34%]"
    >
      <div
        position="relative"
        h="full"
        border="b white/10"
        bg="primary"
      >
        <Battle />
      </div>
    </div>
    <div
      position="absolute"
      bottom="0"
      w="full"
      class="h-[60%]"
    >
      <div
        position="relative"
        h="full"
      >
        <PageBottom />
      </div>
    </div>
    <Chat />
  </PageSection>
</template>
