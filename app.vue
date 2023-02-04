<script setup>
import {
  StyleProvider,
} from '@varlet/ui'
import '@varlet/ui/es/snackbar/style/index'
import '@varlet/ui/es/dialog/style/index'
import { useAppStore } from '~/composables/app'

StyleProvider({
  '--snackbar-font-size': '12px',
  '--snackbar-content-padding': '6px 16px',
  '--snackbar-background': 'radial-gradient(#4041448c, #191b1e)',
  '--snackbar-border-radius': '0px',
  '--snackbar-width': '200px',
  '--popup-content-background-color': '1',
  '--dialog-message-color': 'white',
  '--dialog-background': '#191b1e',
  '--dialog-cancel-button-color': '#d2d2d2',
})

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
  <Body class="overflow-hidden duration-300 transition-colors">
    <NuxtLayout>
      <LoadingScreen v-if="loading" />
      <PageLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <NuxtPage />
      <!--      <ClientOnly> -->
      <!--        <marquee-text :repeat="1" class="w-[0px] fixed top-25 bg-red-500 z-99 w-[90%] left-5 text-white text-xs rounded" :duration="10"> -->
      <!--          {{ message }} -->
      <!--        </marquee-text> -->
      <!--      </ClientOnly> -->
    </NuxtLayout>
  </Body>
</template>
