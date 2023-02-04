<script setup lang="ts">
import { Dialog } from '@varlet/ui'
import { qualityPalette } from '~/common'

defineProps<{
  items: any
}>()

const emits = defineEmits(['buy'])
const show = ref(false)
const itemSelected = ref({})
const onSelectedItem = (item: any) => {
  itemSelected.value = item
  show.value = true
}

const buy = (item: any) => {
  Dialog({
    title: 'Nhắc nhở',
    message: `Bạn có chắc muốn mua ${item.props.name}`,
    confirmButtonText: 'Chắc chắn',
    cancelButtonText: 'Không chắc',
    closeOnClickOverlay: false,
    dialogClass: '!bg-black/80 text-white border border-white/10 italic',
    confirmButtonColor: '#FFF',
    confirmButtonTextColor: '#333',
    cancelButtonTextColor: '#d2d2d2',
    onConfirm: async () => {
      try {
        const buyRes: { success: boolean; message: string } = await $fetch('/api/market/buy', {
          method: 'POST',
          body: {
            _id: item._id,
            name: item.props.name,
          },
        })

        sendMessage(buyRes.message, 2000)
        if (buyRes.success)
          emits('buy')
      }
      catch (e: any) {
        sendMessage(e.statusMessage, 2000)
      }
    },
  })
}
</script>

<template>
  <var-popup v-model:show="show" position="center">
    <bag-item-detail
      :item="itemSelected"
    />
  </var-popup>
  <div class="overflow-auto scrollbar-hide px-6 pt-4">
    <div class="grid grid-cols-3 gap-2 text-10">
      <div
        v-for="item in items"
        :key="item._id"
        class="rounded p-2"
        :style="{
          border: `1px solid ${qualityPalette(item.props?.quality)}`,
        }"
        @click.stop="onSelectedItem(item)"
      >
        <div
          class="text-12"
          :style="{
            color: qualityPalette(item.props?.quality),
          }"
        >
          {{ item.props.name }}
        </div>
        <div class="text-primary my-1">
          (NB: {{ item.player.name }})
        </div>
        <div class="flex justify-between text-primary mb-1 text-8">
          <span>
            Giá bán: {{ item.price }}
          </span>
          <span>SL: {{ item.record.sum }}</span>
        </div>
        <div class="text-center">
          <button
            class="px-2 py-[2px] rounded text-10 font-semibold text-white bg-[#841919] italic w-full"
            @click.stop="buy(item)"
          >
            Mua
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
