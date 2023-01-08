<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { timeOffset } from '~/common'
import useSocket from '~/composables/useSocket'
import type { AuctionItem } from '~/types'
import { usePlayerStore } from '~~/composables/usePlayer'

const emits = defineEmits(['close'])
const { sid } = usePlayerStore()
const now = new Date().getTime()
const { _socket } = useSocket()
const { data: auction } = await useFetch('/api/auction')

const target = ref(null)
onClickOutside(target, () => emits('close'))
const endTime = computed(() => now - auction.value.endTime)

console.log('auction', auction.value)
console.log('endTime', endTime.value)
onMounted(() => {
  // _socket.emit('auction:join', {
  //   _auctionId: auction.value._id,
  // })
})

const doAuction = (auctionItem: AuctionItem) => {
  console.log('auctionItem', auctionItem)
  _socket.emit('auction', {
    _auctionItemId: auctionItem._id,
    sid,
  })
}
</script>

<template>
  <Blocker class="z-99">
    <p class="text-white">
      Kết thúc sau {{ timeOffset(endTime).hours }}
    </p>
    <div ref="target" class="relative w-[95%] h-[80%]">
      <NuxtImg format="webp" class="absolute" src="/common/panel_common_bg1.png" />
      <p class="absolute top-0 left-[calc(50%_-_50px)] w-[100px] text-[#ad3a36] font-semibold">
        Đấu giá
      </p>
      <div class="absolute w-full h-full">
        <div class="grid grid-cols-2 m-auto w-[84%] h-[87%] overflow-auto mt-10 gap-2">
          <div v-for="auctionItem in auction.auctionItems" :key="auctionItem._id" class="relative h-[75px]">
            <NuxtImg format="webp" src="/common/bg-aution.png" />
            <div class="absolute top-0">
              <ItemRank class="m-2" :rank="auctionItem?.detail.rank" :preview="auctionItem?.detail.preview" />
              <!-- <p class="text-10">
                {{ item.name }}
              </p> -->
            </div>
            <div class="absolute top-0 right-0 flex mt-2 mr-2 flex-col ">
              <div class="flex">
                <NuxtImg class="w-4 object-cover" format="webp" src="/items/1_s.png" />
                <span class="text-12 ml-1 font-semibold">{{ auctionItem.price }}</span>
              </div>
              <button class="bg-[#8e5b4c] mt-2 w-[55px] text-white text-10 px-1 font-semibold rounded" @click="doAuction(auctionItem)">
                Đấu giá
              </button>
            </div>
            <p class="text-10 absolute bottom-1 left-2 line-clamp-1">
              Sở hữu: {{ auctionItem.own ? auctionItem.own : 'Trống' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Blocker>
</template>
