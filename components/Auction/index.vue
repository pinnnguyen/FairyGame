<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { startTimeEvent, timeOffset } from '~/common'
import type { AuctionItem } from '~/types'
import { sendMessage, usePlayerStore } from '#imports'

const emits = defineEmits(['close'])
const { sid } = storeToRefs(usePlayerStore())

const now = new Date().getTime()
const { $io } = useNuxtApp()

const { data: auction } = await useFetch('/api/auction')

const endTime = ref((auction.value?.endTime - now) / 1000)
const auctionItems = ref(auction.value?.auctionItems)
const startEvent = computed(() => startTimeEvent(auction.value?.startTime, auction.value?.endTime))

onMounted(() => {
  setInterval(() => {
    endTime.value -= 1
  }, 1000)
  $io.on('auction-response', (response: any) => {
    sendMessage(response.statusMessage)

    if (response.auctionItem) {
      for (const i in auctionItems.value) {
        if (auctionItems.value[i]._id === response.auctionItem._id)
          auctionItems.value[i] = response.auctionItem
      }
    }
  })
})

const doAuction = (auctionItem: AuctionItem) => {
  $io.emit('auction', {
    _auctionItemId: auctionItem._id,
    sid: sid.value,
  })
}
</script>

<template>
  <p v-if="auction" class="text-white">
    Kết thúc sau {{ timeOffset(endTime).minutes }}p {{ timeOffset(endTime).seconds }}s
  </p>
  <div class="relative w-[calc(100vw_-_30px)] h-[75vh]">
    <nuxt-img format="webp" class="absolute w-full h-full" src="/common/panel_common_bg1.png" />
    <p class="absolute top-0 left-[calc(50%_-_50px)] flex justify-center w-[100px] text-[#ad3a36] font-semibold">
      Đấu giá
    </p>
    <div class="absolute w-full h-full">
      <div v-if="!startEvent" class="h-full flex items-center justify-center text-white">
        Đấu giá chưa được mở
      </div>
      <div v-else class="grid grid-cols-2 m-auto w-[84%] h-[87%] overflow-auto mt-10 gap-2">
        <div v-for="auctionItem in auctionItems" :key="auctionItem._id" class="relative h-[75px]">
          <nuxt-img format="webp" src="/common/bg-aution.png" />
          <div class="absolute top-0">
            <lazy-item-rank
              class="m-2"
              :quantity="0"
              :quality="auctionItem?.detail.quality"
              :rank="auctionItem?.detail.rank"
              :preview="auctionItem?.detail.preview"
            />
          </div>
          <div class="absolute top-0 right-0 flex mt-2 mr-2 flex-col ">
            <div class="flex">
              <nuxt-img class="w-4 object-cover" format="webp" src="/items/1_s.png" />
              <span class="text-12 ml-1 font-semibold">{{ auctionItem.price }}</span>
            </div>
            <button class="bg-[#8e5b4c] mt-2 w-[55px] text-white text-10 px-1 font-semibold rounded" @click="doAuction(auctionItem)">
              Đấu giá
            </button>
          </div>
          <p class="text-10 absolute bottom-1 left-2 line-clamp-1">
            Sở hữu: {{ auctionItem.player.length > 0 ? auctionItem.player[0].name : 'Trống' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
