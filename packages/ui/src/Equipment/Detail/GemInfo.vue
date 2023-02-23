<script lang="ts" setup>
import type { PlayerGem } from '~/types'

const props = defineProps<{
  gems: PlayerGem[]
  gemSlot: number
}>()

const gemReduceSlot = computed(() => {
  if (!props.gems)
    return props!.gemSlot

  return props.gemSlot! - props.gems!.length
})
</script>

<template>
  <Line
    m="y-2"
  >
    <div
      text="space-nowrap"
    >
      Đá hồn
    </div>
  </Line>
  <div
    v-if="gems?.length > 0"
    m="x-2"
    overflow="auto"
    w="full"
    max-h="[250px]"
  >
    <div
      v-for="(gem, i) in gems"
      :key="i"
      flex="~ "
      align="items-center"
      p="1 x-1"
      m="b-1"
      pos="relative"
      bg="[#00000040]"
      max-w="[60%]"
      border="rounded"
    >
      <gem-item :gem="gem" />
    </div>
    <template v-if="gemReduceSlot > 0">
      <div
        v-for="i in gemReduceSlot"
        :key="i"
        flex="~ "
        align="items-center"
        m="b-2"
      >
        <nuxt-img
          src="/gem/default.png" format="webp"
          w="12"
          h="12"
          bg="[#000000]"
        />
        <span
          m="l-2"
          text="10"
        >
          (Chưa khảm)
        </span>
      </div>
    </template>
  </div>
</template>
