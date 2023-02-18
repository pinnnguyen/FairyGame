<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerStore } from '#imports'
import type { StoreItem } from '~/types'
import { qualityPalette } from '~/common'
import { CurrencyTitle } from '~/constants'

defineProps<{
  storeItem: StoreItem
}>()

const { playerInfo } = storeToRefs(usePlayerStore())
const loading = ref(false)
const buy = async (storeItem: StoreItem) => {
  try {
    const resBuy: any = await $fetch('/api/store/buy', {
      method: 'POST',
      body: {
        sid: playerInfo.value?.sid,
        itemId: storeItem.itemId,
        kind: storeItem.kind,
        currency: storeItem.currency,
      },
    })

    sendMessage(resBuy.statusMessage)
    if (resBuy.statusCode === 200)
      playerInfo.value!.knb -= storeItem.price
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <div
    class="rounded p-2"
    :style="{
      border: `1px solid ${qualityPalette(storeItem.props?.quality)}`,
    }"
  >
    <div
      h="8"
      class="text-10 font-bold line-clamp-2" :style="{
        color: qualityPalette(storeItem?.props?.quality),
      }"
    >
      {{ storeItem.props?.name }}
    </div>
    <div
      p="t-2"
      text="8 primary"
      class="line-clamp-2"
    >
      {{ storeItem?.props?.note }}
    </div>
    <div
      m="t-2"
      text="8 primary"
      h="5"
    >
      Giá bán: {{ storeItem?.price }} {{ CurrencyTitle[storeItem.currency] }}
    </div>
    <div class="text-center">
      <button
        class="px-2 py-[2px] shadow rounded mt-2 text-10 font-semibold text-white bg-[#841919] w-full italic"
        @click.stop="buy(storeItem)"
      >
        Mua
      </button>
    </div>
  </div>
</template>
