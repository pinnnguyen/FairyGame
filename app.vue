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
<!--     <ClientOnly>-->
<!--       <marquee-text>-->
<!--         Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.-->
<!--       </marquee-text>-->

<!--       &lt;!&ndash; short text need more duplicates &ndash;&gt;-->
<!--       <marquee-text :repeat="10">-->
<!--         Short text =(-->
<!--       </marquee-text>-->

<!--       &lt;!&ndash; slow duration &ndash;&gt;-->
<!--       <marquee-text :duration="30">-->
<!--         Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.-->
<!--       </marquee-text>-->
<!--     </ClientOnly>-->

      <LoadingScreen v-if="loading" />
      <PageLoadingIndicator :height="5" :duration="3000" :throttle="400" />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
