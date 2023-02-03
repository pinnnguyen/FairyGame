<script setup lang="ts">
import { set } from '@vueuse/core'
import type { PlayerItem } from '~/types'
import { useFetch } from '#app'
import { qualityPalette } from '~/common'

const { data: items, pending, refresh } = await useFetch('/api/bag/items')

const selectedItem = ref()
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
  <var-loading :loading="pending" description="Đang tải trang bị" color="#333">
    <div
      class="grid-cols-3 grid gap-1 overflow-auto max-h-[58%] scrollbar-hide"
    >
      <div
        v-for="item in items" :key="item.id" class="border rounded p-2" :style="{
          border: `1px solid ${qualityPalette(item.info.rank ?? item.info.quality)}`,
        }"
        @click.stop="pickItem(item)"
      >
        <div
          class="text-12 font-bold line-clamp-1" :style="{
            color: qualityPalette(item.info.rank ?? item.info.quality),
          }"
        >
          {{ item?.info.name }}
        </div>
        <div class="pt-4 text-[10px]">
          {{ item?.info.info }}
        </div>
      </div>
    </div>
  </var-loading>
</template>
