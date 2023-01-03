<script setup lang="ts">
const props = defineProps<{
  preview: string
  rank: number
}>()

const bgRank = computed(() => {
  if (props.rank === 0)
    return 'bg-iconbg_0'

  if (props.rank === 1)
    return 'bg-iconbg_1'

  if (props.rank === 2)
    return 'bg-iconbg_2'

  if (props.rank === 3)
    return 'bg-iconbg_3'

  if (props.rank === 4)
    return 'bg-iconbg_4'

  if (props.rank === 5)
    return 'bg-iconbg_5'

  if (props.rank === 6)
    return 'bg-iconbg_6'

  return 'bg-iconbg_0'
})
</script>

<template>
  <div
    :class="bgRank"
    class="w-12 bg-contain bg-no-repeat relative"
  >
    <NuxtImg :src="preview" />
    <slot />
  </div>
</template>
