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
    <div class="h-full w-full overflow-auto scrollbar-hide">
      <div
        class="grid-cols-3 grid gap-2 "
      >
        <div
          v-for="item in items" :key="item.id" class="rounded p-2" :style="{
            border: `1px solid ${qualityPalette(item.props.quality)}`,
          }"
          @click.stop="pickItem(item)"
        >
          <div
            class="text-10 font-bold line-clamp-1" :style="{
              color: qualityPalette(item.props.quality),
            }"
          >
            {{ item?.props.name }}
          </div>
          <div class="pt-2 text-[10px]">
            {{ item?.props.note }}
          </div>
        </div>
      </div>
    </div>
  </var-loading>
</template>
