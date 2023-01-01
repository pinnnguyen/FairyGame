<script setup>
import { useAppStore } from '~/composables/app'
import useSocket from '~/composables/useSocket'

const { loading } = useAppStore()
const { _socket } = useSocket()

useHead({
  title: 'Tu Tiên giới',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/logo.png',
    },
  ],
})

const message = ref('')
onMounted(() => {
  _socket.on('send-message', (message) => {
    console.log('message', message)
    // message.value = message
  })
})

onUnmounted(() => {
  // _socket.emit('disconnect')
})
</script>

<template>
  <Body class="overflow-hidden duration-300 transition-colors game-center font-sans">
   <div id="app-before"></div>
    <NuxtLayout>
      <LoadingScreen v-if="loading" />
      <PageLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <NuxtPage />
      <div id="page-before"></div>
      <ClientOnly>
        <marquee-text :repeat="1" class="w-[0px] fixed top-25 bg-red-500 z-99 w-[90%] left-5 text-white text-xs rounded" :duration="10">
          {{ message }}
        </marquee-text>
      </ClientOnly>
    </NuxtLayout>
  </Body>
</template>
