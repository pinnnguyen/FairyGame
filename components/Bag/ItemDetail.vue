<script setup lang="ts">
import { sendMessage, usePlayerStore } from '#imports'
import { backgroundQuality, qualityPalette } from '~/common'
import type { BasicItem, PlayerItem } from '~/types'
interface Prop {
  item: any
  sellAction?: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['refresh'])
const { sid } = usePlayerStore()
const sellPopup = ref(false)
const sellOptions = ref({
  price: 0,
  quantity: 0,
})

const styles = computed(() => {
  return backgroundQuality(props.item?.rank!)
})

const useItem = async () => {
  try {
    const res: any = await $fetch('/api/bag/use', {
      method: 'POST',
      body: {
        sid,
        itemId: props.item?.itemId,
        kind: props.item.kind,
        quantity: 1,
      },
    })

    sendMessage(res.statusMessage, 1500)
    emits('refresh')
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}

const sell = async () => {
  if (sellOptions.value.price <= 0) {
    sendMessage('Giá treo bán không hợp lệ')
    return
  }

  if (sellOptions.value.quantity <= 0 || sellOptions.value.quantity > props.item.sum) {
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
        type: 'item',
        quantity: sellOptions.value.quantity,
        price: sellOptions.value.price,
        _id: props.item._id,
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
    class="rounded p-2 bg-black/70"
    :style="{
      border: `1px solid ${qualityPalette(item.props?.quality)}`,
    }"
  >
    <div class="flex flex-col items-start justify-start mb-4">
      <div class="mt-2">
        <div
          class="text-12 font-bold uppercase text-left" :style="{
            color: qualityPalette(item.props?.quality),
          }"
        >
          {{ item.props.name }}
        </div>
        <div class="text-left mt-2">
          {{ item.props.note }}
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <var-button
        v-if="sellAction"
        class="!text-[#333] font-semibold mx-2 italic"
        size="small"
        @click.stop="sellPopup = true"
      >
        Treo bán
      </var-button>
      <var-button
        v-if="item.kind === 3"
        class="mb-2 !text-[#333] font-semibold italic"
        color="#ffd400"
        size="small"
        @click.stop="useItem"
      >
        Sử dụng
      </var-button>
    </div>
  </div>
</template>
