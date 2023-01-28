<script setup lang="ts">
const props = defineProps<{
  preview?: string
  rank?: number
  quantity?: number
  quality?: number
  wClass?: string
}>()

const bgRank = computed(() => {
  if (props.quality === 0)
    return 'bg-iconbg_0'

  if (props.quality === 1)
    return 'bg-iconbg_1'

  if (props.quality === 2)
    return 'bg-iconbg_2'

  if (props.quality === 3)
    return 'bg-iconbg_3'

  if (props.quality === 4)
    return 'bg-iconbg_4'

  if (props.quality === 5)
    return 'bg-iconbg_5'

  if (props.quality! >= 6)
    return 'bg-iconbg_6'

  return 'bg-iconbg_0'
})
</script>

<template>
  <div
    :class="bgRank"
    class="w-12 bg-contain bg-no-repeat relative"
  >
    <div class="relative" :class="wClass">
      <nuxt-img format="webp" :src="preview" />
      <div v-if="quantity > 0" class="absolute bg-black/60 text-8 font-bold text-white bottom-1 right-1 px-1 rounded-2xl text-yellow-300">
        {{ quantity }}
      </div>
      <div v-if="rank > 0" class="absolute text-8 font-bold text-yellow-300 bg-black/20 top-1 right-1 pr-1">
        Bậc {{ rank }}
      </div>
    </div>
    <slot />
  </div>
</template>
