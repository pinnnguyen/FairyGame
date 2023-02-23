<script setup lang="ts">
import type { PlayerItem } from '~/types'
import { qualityPalette, randomNumber } from '~/common'
import { tips } from '~/constants'

const { data: items, pending, refresh } = useFetch('/api/bag/items')

const selectedItem = ref<PlayerItem>()
const show = ref(false)
const pickItem = (item: PlayerItem) => {
  set(selectedItem, item)
  set(show, true)
}

const onSell = () => {
  refresh()
  set(show, false)
}
</script>

<template>
  <var-popup v-model:show="show" position="center">
    <bag-item-detail
      :item="selectedItem"
      :sell-action="true"
      @refresh="onSell"
    />
  </var-popup>
  <var-loading :loading="pending" :description="tips[Math.round(randomNumber(0, tips.length))]" size="mini" color="#ffffff">
    <section
      grid="~ cols-3"
      gap="2"
    >
      <div v-if="pending" h="50" w="100" />
      <div
        v-for="item in items"
        v-else
        :key="item.id"
        text="10"
        border="rounded"
        p="2"
        :style="{
          border: `1px solid ${qualityPalette(item.props.quality)}`,
        }"
        @click.stop="pickItem(item)"
      >
        <div
          font="bold"
          class="line-clamp-1" :style="{
            color: qualityPalette(item.props.quality),
          }"
        >
          {{ item?.props.name }}
        </div>
        <div
          p="t-2"
          class="line-clamp-2"
          h="10"
          text="8"
        >
          {{ item?.props.note }}
        </div>
        <div
          p="t-2"
          text="8 right"
        >
          SL: {{ item?.sum }}
        </div>
      </div>
    </section>
  </var-loading>
</template>
