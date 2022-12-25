<script setup>
import { useAppStore } from '~/composables/app'

const { loading } = useAppStore()
useHead({
  title: 'Tu Tiên giới',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/logo.png',
    },
  ],
})
</script>

<template>
  <Body class="overflow-hidden duration-300 transition-colors game-center font-sans">
    <NuxtLayout>
      <LoadingScreen v-if="loading" />
      <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
