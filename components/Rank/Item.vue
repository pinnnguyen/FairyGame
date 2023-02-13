<script setup lang="ts">
import { formatCash, playerTitle } from '~/common'

const props = defineProps<{
  rank: any
}>()

const getPlayerTitle = computed(() => {
  return playerTitle(props?.rank.level, props.rank?.level + 1)
})
</script>

<template>
  <section
    flex="~ "
  >
    <div
      p="1"
    >
      <div
        text="12"
        font="bold"
      >
        {{ rank.name }} - <span text="10">{{ getPlayerTitle.levelTitle }} {{ getPlayerTitle.floor }}</span>
      </div>
      <div text="10">
        Tiên lực: {{ formatCash(rank.power) }}
      </div>
    </div>
    <div m="t-2" pos="absolute" right="2" top="[20%]">
      <button
        class="var-button var--box var-button--mini var--inline-flex var-button--default var-elevation--2 !text-[#333]"
        type="button"
        font="semibold italic"
        @click.stop="playerPreview
        "
      >
        <span class="var-button__content">
          Chi tiết
        </span>
      </button>
    </div>
  </section>
</template>
