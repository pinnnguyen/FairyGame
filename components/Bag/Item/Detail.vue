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
const { sid, fetchPlayer } = usePlayerStore()
const sellPopup = ref(false)
const sellOptions = ref({
  price: 0,
  quantity: 0,
})
const useItem = async () => {
  try {
    const res: any = await $fetch('/api/bag/use', {
      method: 'POST',
      body: {
        sid,
        itemId: props.item?.itemId,
        kind: props.item.props.kind,
        quantity: 1,
      },
    })

    sendMessage(res.statusMessage, 2000)
    emits('refresh')
    fetchPlayer()
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}

// const sell = async () => {
//   if (sellOptions.value.price <= 0) {
//     sendMessage('Giá treo bán không hợp lệ', 2000)
//     return
//   }
//
//   if (sellOptions.value.quantity <= 0 || sellOptions.value.quantity > props.item.sum) {
//     sendMessage('Số lượng treo bán không hợp lệ', 2000)
//     return
//   }
//
//   try {
//     const sellRes: {
//       success: boolean
//       message: string
//     } = await $fetch('/api/market/sell', {
//       method: 'POST',
//       body: {
//         type: 'item',
//         quantity: sellOptions.value.quantity,
//         price: sellOptions.value.price,
//         _id: props.item._id,
//       },
//     })
//
//     if (sellRes.success) {
//       emits('refresh')
//       sendMessage(sellRes.message, 2000)
//     }
//   }
//   catch (e: any) {
//     sendMessage(e.statusMessage, 2000)
//   }
// }
</script>

<template>
  <!--  <var-popup v-model:show="sellPopup" position="bottom"> -->
  <!--    <div class="p-4"> -->
  <!--      <var-input v-model="sellOptions.price" type="number" placeholder="Nhập giá bán" /> -->
  <!--      <var-input v-model="sellOptions.quantity" type="number" placeholder="Nhập số lượng" /> -->
  <!--    </div> -->
  <!--    <div class="text-center my-4"> -->
  <!--      <var-button -->
  <!--        class="!text-[#333] font-medium mx-2" -->
  <!--        size="small" -->
  <!--        @click.stop="sell" -->
  <!--      > -->
  <!--        Treo bán -->
  <!--      </var-button> -->
  <!--    </div> -->
  <!--  </var-popup> -->
  <div
    text="10"
    bg="primary"
    border="rounded"
    p="2"
    w="50"
    m="auto"
    :style="{
      border: `1px solid ${qualityPalette(item.props?.quality)}`,
    }"
  >
    <div class="mb-4">
      <div
        text="12 left"
        font="bold"
        :style="{
          color: qualityPalette(item.props?.quality),
        }"
      >
        {{ item.props.name }}
      </div>
      <div
        text="left"
        m="t-2"
      >
        {{ item.props.note }}
      </div>
    </div>
    <div class="text-center">
      <!--      <var-button -->
      <!--        v-if="sellAction" -->
      <!--        class="!text-[#333] mx-2" -->
      <!--        size="mini" -->
      <!--        @click.stop="sellPopup = true" -->
      <!--      > -->
      <!--        Treo bán -->
      <!--      </var-button> -->
      <var-button
        v-if="item.props.kind === 3"
        class="mb-2 !text-[#333] font-semibold italic"
        size="mini"
        @click.stop="useItem"
      >
        Sử dụng
      </var-button>
    </div>
  </div>
</template>
