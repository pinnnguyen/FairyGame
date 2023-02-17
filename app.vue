<script setup lang="ts">
import {
  StyleProvider,
} from '@varlet/ui'
import '@varlet/ui/es/snackbar/style/index'
import '@varlet/ui/es/dialog/style/index'

import { usePlayerStore } from '~/composables/usePlayer'
const { loadPlayer } = usePlayerStore()

StyleProvider({
  '--snackbar-content-padding': '6px 16px',
  '--snackbar-background': 'transparent',
  '--snackbar-border-radius': '0px',
  '--snackbar-width': '200px',
  '--popup-content-background-color': '1',
  '--dialog-message-color': 'white',
  '--dialog-background': '#191b1e',
  '--dialog-cancel-button-color': '#d2d2d2',
  '--input-placeholder-size': '12px',
  '--snackbar-margin': '1px 24px',
  '--snackbar-font-size': '10px',
})

const { $io } = useNuxtApp()
const chatSystem = ref('')

onMounted(() => {
  $io.on('fetch:player:response', (data: any) => {
    console.log('data', data)
    loadPlayer(data)
  })

  setInterval(() => {
    $io.emit('get:marquee-text')
  }, 30000)
})

$io.emit('get:marquee-text')
$io.on('response:marquee-text', (c) => {
  setTimeout(() => {
    chatSystem.value = c
  }, 1000)
})
const onLoopComplete = () => {
  setTimeout(() => {
    $io.emit('get:marquee-text', chatSystem.value._id)
    chatSystem.value = null
  }, 500)
}
</script>

<template>
  <Marquee v-if="chatSystem" :duration="8" @on-loop-complete="onLoopComplete">
    {{ chatSystem.content }}
  </Marquee>
  <Body
    overflow="hidden"
    transition="duration-300 colors"
    max-w="[70vh]"
    m="auto"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
