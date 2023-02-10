<template>
  <div
    text="center 10"
    gap="2"
    w="full"
    class="flex-center"
  >
    <nuxt-img format="webp" src="/bar/line-head.png" class="h-3" />
    <slot />
    <nuxt-img format="webp" src="/bar/line-head.png" class="h-3 transform rotate-180" />
  </div>
</template>
