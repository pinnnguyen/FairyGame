<script setup lang="ts">
import type { PlayerGem } from '~/types'

const props = defineProps<{
  gem: PlayerGem
  sellAction?: boolean
  selectAction?: boolean
  mergeAction?: boolean
}>()

const emits = defineEmits(['sell', 'selected', 'refresh'])

const { $io } = useNuxtApp()
const sellPopup = ref(false)
const sellOptions = ref<any>({
  price: 1,
  quantity: 1,
})

const mergeGems = () => {
  if (props.gem.sum! < 3) {
    sendMessage('Số lượng đá hồn không đủ để hợp nhất', 2000)
    return
  }

  $io.emit('gem:merge', props.gem)
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
      sellPopup.value = false
      sendMessage(sellRes.message)
    }
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <var-popup
    v-model:show="sellPopup"
    position="bottom"
  >
    <div
      p="4"
    >
      <var-input v-model="sellOptions.price" placeholder="Nhập giá bán" />
      <var-input v-model="sellOptions.quantity" placeholder="Nhập số lượng" />
    </div>
    <div
      text="center"
      p="y-4"
    >
      <var-button
        font="semibold"
        m="x-2"
        class="!text-[#333]"
        size="small"
        @click.stop="sell"
      >
        Treo bán
      </var-button>
    </div>
  </var-popup>
  <div
    text="center"
    p="y-2"
  >
    <var-button
      v-if="sellAction"
      font="semibold italic"
      m="x-2"
      class="!text-[#333]"
      size="small"
      @click.stop="sellPopup = true"
    >
      Treo bán
    </var-button>
    <var-button
      v-if="selectAction"
      font="semibold italic"
      m="x-2"
      class="!text-[#333]"
      size="small"
      @click.stop="emits('selected')"
    >
      Khảm đá
    </var-button>
    <var-button
      v-if="gem.sum >= 3 && mergeAction"
      font="semibold italic"
      m="x-2"
      size="small"
      class="!text-[#333]"
      @click.stop="mergeGems"
    >
      Ghép đá
    </var-button>
  </div>
</template>
