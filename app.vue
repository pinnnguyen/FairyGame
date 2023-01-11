<script setup>
import { useAppStore } from '~/composables/app'
import 'vexip-ui/css/index.css'
import 'vexip-ui/css/button.css'
const { loading } = useAppStore()
useHead({
  title: 'Tu Tiên giới',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/logo.png',
    },
  ],
})

const message = ref('')
// onMounted(() => {
//   // _socket.on('send-message', (message) => {
//   //   console.log('message', message)
//   //   // message.value = message
//   // })
// })
</script>

<template>
  <Body class="overflow-hidden duration-300 transition-colors game-center font-sans">
    <div id="app-before" />
    <NuxtLayout>
      <LoadingScreen v-if="loading" />
      <PageLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <div id="page-before" />
      <NuxtPage />
      <!--      <ClientOnly> -->
      <!--        <marquee-text :repeat="1" class="w-[0px] fixed top-25 bg-red-500 z-99 w-[90%] left-5 text-white text-xs rounded" :duration="10"> -->
      <!--          {{ message }} -->
      <!--        </marquee-text> -->
      <!--      </ClientOnly> -->
    </NuxtLayout>
  </Body>
</template>
