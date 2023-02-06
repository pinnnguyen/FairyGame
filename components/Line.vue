<template>
  <div class="text-center text-12 flex-center gap-2 w-full">
    <nuxt-img format="webp" src="/bar/line-head.png" class="h-3" />
    <slot />
    <nuxt-img format="webp" src="/bar/line-head.png" class="h-3 transform rotate-180" />
  </div>
</template>
