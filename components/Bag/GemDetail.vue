<script setup lang="ts">
import { sendMessage, usePlayerStore } from '#imports'
import type { PlayerGem } from '~/types'
import { colorQuality, qualityPalette } from '~/common'
import { QUALITY_TITLE, SLOT_NAME } from '~/constants'
interface Prop {
  gem: PlayerGem
  selectAction?: boolean
  sellAction?: boolean
  mergeGem?: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['selected', 'mergegem', 'refresh'])
const { sid } = usePlayerStore()
const { $io } = useNuxtApp()
const sellPopup = ref(false)
const sellOptions = ref({
  price: 0,
  quantity: 0,
})

const qualityTitle = computed(() => {
  return QUALITY_TITLE[props.gem.quality!]
})

$io.on('gem:merge:response', (data) => {
  sendMessage(data.message, 2000)
  if (data.success)
    emits('mergegem')
})

const onmergeGems = (gem: PlayerGem) => {
  if (gem.sum! < 3) {
    sendMessage('Số lượng đá hồn không đủ để hợp nhất', 2000)
    return
  }

  $io.emit('gem:merge', gem)
}

const sell = async () => {
  if (sellOptions.value.price <= 0) {
    sendMessage('Giá treo bán không hợp lệ')
    return
  }

  if (sellOptions.value.quantity <= 0 || sellOptions.value.quantity > props.gem.sum!) {
    sendMessage('Số lượng treo bán không hợp lệ')
    return
  }

  try {
    const sellRes: {
      success: boolean
      message: string
    } = await $fetch('/api/market/sell', {
      method: 'POST',
      body: {
        type: 'gem',
        quantity: sellOptions.value.quantity,
        price: sellOptions.value.price,
        _id: props.gem._id,
      },
    })

    if (sellRes.success) {
      emits('refresh')
      sendMessage(sellRes.message)
    }
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <var-popup v-model:show="sellPopup" position="bottom">
    <div class="p-4">
      <var-input v-model="sellOptions.price" type="number" placeholder="Nhập giá bán" />
      <var-input v-model="sellOptions.quantity" type="number" placeholder="Nhập số lượng" />
    </div>
    <div class="text-center my-4">
      <var-button
        class="!text-[#333] font-medium mx-2"
        size="small"
        @click.stop="sell"
      >
        Treo bán
      </var-button>
    </div>
  </var-popup>
  <div
    class="relative text-xs leading-6 text-white rounded shadow-md p-0 bg-primary border border-white/30 w-[90%] m-auto"
  >
    <div
      class="flex flex-col items-center justify-between px-3 pt-4 leading-5"
    >
      <div class="flex w-full">
        <div class="relative w-15 h-15 mr-2">
          <nuxt-img class="absolute top-0" format="webp" :src="`/quality_bg/iconbg_${gem.quality}.png`" />
          <nuxt-img class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" format="webp" :src="`/gem/${gem.gemId}.png`" />
        </div>
        <div class="text-left">
          <p
            class="text-12 font-bold"
            :style="{ color: qualityPalette(gem.quality) }"
          >
            {{ gem.name }}
          </p>
          <p v-if="gem.sum > 0" class="text-10 font-bold">
            Hiện có: {{ gem.sum }}
          </p>
        </div>
      </div>
    </div>
    <div class="text-12 border-t border-white/40 m-4 p-2">
      <div class="flex">
        <div class="w-25">
          Vị trí:
        </div> {{ SLOT_NAME[gem.slot] }}
      </div>
      <div class="flex">
        <div class="w-25">
          Trưởng Thành:
        </div>
        {{ gem.rateOnLevel }}%
      </div>
      <div class="flex">
        <div class="w-25">
          Phẩm đá hồn :
        </div>
        <span
          :style="{
            color: qualityPalette(gem.quality),
          }"
        >
          {{ qualityTitle }}
        </span>
      </div>
      <div class="flex">
        <div class="w-25">
          Thuộc tính:
        </div>
        <div class="flex flex-col">
          <gem-values :gem="gem" />
        </div>
      </div>
      <Line class="py-2">
        <div class="whitespace-nowrap">
          Ghép Đá Hồn
        </div>
      </Line>
      <div class="mt-2 flex justify-between items-center gap-2 mb-2">
        <div class="flex items-center border border-white/20 p-2">
          <div class="relative w-10 h-10 mr-2">
            <nuxt-img class="absolute top-0" format="webp" :src="`/quality_bg/iconbg_${gem.quality}.png`" />
            <nuxt-img class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" format="webp" :src="`/gem/${gem.gemId}.png`" />
          </div>
          <span class="text-8 w-[25px]" :style="colorQuality(gem.quality)">
            {{ qualityTitle }}
            <br>
            x3
          </span>
        </div>
        <icon name="mdi:arrow-right-bold-outline" size="20" class="text-blue-300" />
        <div class="flex items-center border border-white/20 p-2">
          <div class="relative w-10 h-10 mr-2">
            <nuxt-img class="absolute top-0" format="webp" :src="`/quality_bg/iconbg_${gem.quality}.png`" />
            <nuxt-img class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" format="webp" :src="`/gem/${gem.gemId}.png`" />
          </div>
          <span class="text-8 w-[25px]" :style="colorQuality(gem.quality + 1)">
            {{ QUALITY_TITLE[gem.quality + 1] }}
            <br>
            x3
          </span>
        </div>
        <icon name="mdi:arrow-right-bold-outline" size="20" class="text-blue-300" />
        <div class="flex items-center border border-white/20 p-2">
          <div class="relative w-10 h-10 mr-2">
            <nuxt-img class="absolute top-0" format="webp" :src="`/quality_bg/iconbg_${gem.quality}.png`" />
            <nuxt-img class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" format="webp" :src="`/gem/${gem.gemId}.png`" />
          </div>
          <span class="text-8 w-[25px]" :style="colorQuality(gem.quality + 2)">
            {{ QUALITY_TITLE[gem.quality + 2] }}
            <br>
            x3
          </span>
        </div>
      </div>
      <div class="text-center text-10">
        (Chỉ được khảm 1 đá hồn này lên trang bị)
      </div>
      <div class="text-center py-2">
        <var-button
          v-if="sellAction"
          class="!text-[#333] font-semibold mx-2 italic"
          size="small"
          @click.stop="sellPopup = true"
        >
          Treo bán
        </var-button>
        <var-button
          v-if="selectAction"
          class="!text-[#333] mx-2 italic font-semibold"
          size="small"
          @click.stop="emits('selected', gem)"
        >
          Khảm đá
        </var-button>
        <var-button
          v-if="gem.sum >= 3"
          class="font-semibold mx-2 !text-[#333] italic"
          size="small"
          @click.stop="onmergeGems(gem)"
        >
          Ghép đá
        </var-button>
      </div>
    </div>
  </div>
</template>
