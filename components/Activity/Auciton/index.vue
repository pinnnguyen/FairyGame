<script setup lang="ts">
import { qualityPalette, randomNumber, timeOffset } from '~/common'
import { tips } from '~/constants'

const { sid } = usePlayerStore()
const { $io } = useNuxtApp()
const show = ref(false)
const gemSelected = ref({})
const { data: auction, pending, refresh } = useFetch('/api/auction')
const now = new Date().getTime()
const endTime = ref(((auction.value?.endTime ?? 0) - now) / 1000)

onMounted(() => {
  console.log('endTime', endTime.value)

  $io.on('auction-response', () => {
    refresh()
  })

  setInterval(() => {
    endTime.value -= 1
  }, 1000)
})

onUnmounted(() => {
  $io.off('auction-response')
})
const onAuction = (auctionId: string) => {
  $io.emit('auction', auctionId, sid)
}

const onSelectedGem = (gem: any) => {
  gemSelected.value = {
    gemId: gem.id,
    ...gem,
  }
  show.value = true
}
</script>

<template>
  <var-popup v-model:show="show" position="center">
    <gem-detail
      :gem="gemSelected"
      target="preview"
    />
  </var-popup>
  <var-loading :loading="pending" :description="tips[Math.round(randomNumber(0, tips.length))]" size="mini" color="#ffffff">
    <div v-if="pending" h="50" w="100" />
    <div
      v-else
      p="x-4"
    >
      <template v-if="auction">
        <div text="center 12" m="y-2">
          <Line>
            {{ auction.name }}
          </Line>

          <div v-if="endTime" text="10">
            Kết thúc
            <span p="x-1">{{ timeOffset(endTime).minutes }}phút</span>
            <span>{{ timeOffset(endTime).seconds }}s</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 text-10">
          <div
            v-for="item in auction.auctionItems"
            :key="item._id"
            class="rounded p-2"
            :style="{
              border: `1px solid ${qualityPalette(item.gem[0]?.quality)}`,
            }"
            @click.stop="onSelectedGem(item.gem[0])"
          >
            <div class="flex gap-2">
              <div
                pos="relative"
                h="12"
                w="[40%]"
              >
                <nuxt-img
                  format="webp"
                  :src="`/quality_bg/iconbg_${item?.gem[0]?.quality}.png`"
                  class="absolute top-0"
                />
                <nuxt-img
                  format="webp"
                  :src="`/gem/${item?.gem[0]?.id}.png`"
                  class="absolute transform-center w-10 h-10 rounded-full object-cover"
                />
                <div class="absolute bg-[#00000040] text-8 font-bold text-white bottom-1 right-1 px-1 rounded-2xl text-yellow-300">
                  {{ item?.quantity }}
                </div>
              </div>
              <div>
                <market-name :quality="item?.gem[0].quality" class="line-clamp-1">
                  {{ item?.gem[0]?.name }}
                </market-name>
                <market-owner v-if="item.player?.length > 0" class="line-clamp-2">
                  (Thuộc về: {{ item.player[0].name }})
                </market-owner>
                <market-owner v-else>
                  (Thuộc về: Hiện đang trống)
                </market-owner>
                <market-price>
                  {{ item.price }}
                </market-price>
              </div>
            </div>
            <div
              text="center"
              w="full"
              p="t-2"
            >
              <button
                w="full"
                class="px-2 py-[2px] shadow rounded text-10 font-semibold !text-white bg-[#841919] italic"
                @click.stop="onAuction(item._id)"
              >
                Đấu giá
              </button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div text="center" flex="~ " align="items-center" justify="center" h="50">
          Tạm thời chưa có đấu giá nào đang được mở
        </div>
      </template>
    </div>
  </var-loading>
</template>
