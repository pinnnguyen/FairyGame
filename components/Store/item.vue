<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerStore } from '#imports'
import type { StoreItem } from '~/types'

defineProps<{
  storeItem: StoreItem
}>()

const { playerInfo } = storeToRefs(usePlayerStore())
const loading = ref(false)
const buy = async (storeItem: StoreItem) => {
  try {
    const resBuy = await $fetch('/api/store/buy', {
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
  <div class="relative">
    <nuxt-img format="webp" src="/common/bg-aution.png" />
    <div class="absolute top-0">
      <item-rank
        class="m-2"
        :quantity="storeItem.quantity"
        :rank="storeItem.info.rank"
        :preview="storeItem.info.preview"
      />
    </div>
    <div class="absolute top-0 right-0 flex mt-2 mr-2 flex-col ">
      <div class="flex">
        <nuxt-img class="w-4 object-cover" format="webp" src="/items/1_s.png" />
        <span class="text-12 ml-1 font-semibold">
          {{ storeItem.price ?? 0 }}
        </span>
      </div>
      <Button :loading="loading" type="warning" size="mini" @click="buy(storeItem)">
        Mua
      </Button>
    </div>
    <p class="text-10 absolute bottom-1 font-semibold left-2 line-clamp-1">
      {{ storeItem.info.name }}
    </p>
  </div>
</template>
