<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import type { StoreItem } from '~/types'
import { sendMessage, usePlayerStore } from '#imports'

const emits = defineEmits(['close'])
const { playerInfo } = storeToRefs(usePlayerStore())
const target = ref(null)
onClickOutside(target, () => emits('close'))

const { data: storeItems } = await useFetch('/api/store')
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
      playerInfo.value.knb -= storeItem.price
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <Blocker class="z-99">
    <div ref="target" class="relative w-[95%] h-[80%]">
      <NuxtImg format="webp" class="absolute" src="/common/panel_common_bg1.png" />
      <p class="absolute top-0 left-[calc(50%_-_50px)] w-[100px] text-[#ad3a36] font-semibold">
        Cửa hàng
      </p>
      <div class="absolute w-full h-full flex justify-center">
        <div class="w-[84%] h-[70%] overflow-auto">
          <div class="grid grid-cols-2 m-auto mt-10 gap-2">
            <div v-for="(storeItem, index) in storeItems" :key="index" class="relative">
              <NuxtImg format="webp" src="/common/bg-aution.png" />
              <div class="absolute top-0">
                <ItemRank class="m-2" :quantity="storeItem.quantity" :rank="storeItem.info.rank" :preview="storeItem.info.preview" />
              </div>
              <div class="absolute top-0 right-0 flex mt-2 mr-2 flex-col ">
                <div class="flex">
                  <NuxtImg class="w-4 object-cover" format="webp" src="/items/1_s.png" />
                  <span class="text-12 ml-1 font-semibold">
                    {{ storeItem.price ?? 0 }}
                  </span>
                </div>
                <button class="bg-[#ffd400] text-[#333] mt-2 w-[55px] text-white text-10 px-1 font-semibold rounded" @click="buy(storeItem)">
                  Mua
                </button>
              </div>
              <p class="text-10 absolute bottom-1 font-semibold left-2 line-clamp-1">
                {{ storeItem.info.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Blocker>
</template>
