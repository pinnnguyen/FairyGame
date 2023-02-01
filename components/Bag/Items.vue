<script setup lang="ts">
import { set } from '@vueuse/core'
import type { PlayerItem } from '~/types'
import { useFetch } from '#app'

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
      class="grid-cols-6 grid gap-1 overflow-auto max-h-[88%] scrollbar-hide"
    >
      <lazy-item-rank
        v-for="item in items" :key="item.id"
        :preview="item.info.preview"
        :rank="item.info.rank"
        :quantity="item.sum"
        :quality="item.info.rank"
        class="w-12"
        @click.stop="pickItem(item)"
      >
        <p class="text-10 font-semibold line-clamp-1">
          {{ item?.info.name }}
        </p>
      </lazy-item-rank>
    </div>
  </var-loading>
</template>
