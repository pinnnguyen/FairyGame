<script setup>
import { useAppStore } from '~/composables/app'

const { loading } = useAppStore()
useHead({
  title: 'Vitesse Nuxt 3',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})
</script>

<template>
  <Body class="antialiased overflow-hidden duration-300 transition-colors game-center">
    <NuxtLayout>
      <LoadingScreen v-if="loading" />
      <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
