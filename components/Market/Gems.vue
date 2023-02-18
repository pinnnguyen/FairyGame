<script setup lang="ts">
import { Dialog } from '@varlet/ui'
import { qualityPalette } from '~/common'
defineProps<{
  gems: any
}>()

const emits = defineEmits(['buy'])
const show = ref(false)
const gemSelected = ref({})
const onSelectedGem = (gem: any) => {
  gemSelected.value = gem.record
  show.value = true
}

const buy = (gem: any) => {
  Dialog({
    title: 'Nhắc nhở',
    message: `Bạn có chắc muốn mua ${gem.record.name}`,
    confirmButtonText: 'Chắc chắn',
    cancelButtonText: 'Không chắc',
    dialogClass: '!bg-[#00000040] text-white border border-white/10 italic',
    confirmButtonColor: '#FFF',
    confirmButtonTextColor: '#333',
    cancelButtonTextColor: '#d2d2d2',
    onConfirm: async () => {
      try {
        const buyRes: { success: boolean; message: string } = await $fetch('/api/market/buy', {
          method: 'POST',
          body: {
            _id: gem._id,
            name: gem.record.name,
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
    <gem-detail
      :gem="gemSelected"
      target="preview"
    />
  </var-popup>

  <div class="px-6 pt-2 overflow-auto scrollbar-hide">
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="gem in gems" :key="gem._id"
        class="rounded p-2 relative flex flex-col gap-2"
        :style="{
          border: `1px solid ${qualityPalette(gem?.record?.quality)}`,
        }"
        @click.stop="onSelectedGem(gem)"
      >
        <div class="flex gap-2">
          <div class="relative w-12 h-12">
            <nuxt-img
              format="webp"
              :src="`/quality_bg/iconbg_${gem?.record?.quality}.png`"
              class="absolute top-0"
            />
            <nuxt-img
              format="webp"
              :src="`/gem/${gem?.record?.gemId}.png`"
              class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover"
            />
            <div class="absolute bg-[#00000040] text-8 font-bold text-white bottom-1 right-1 px-1 rounded-2xl text-yellow-300">
              {{ gem?.record?.sum }}
            </div>
          </div>
          <div w="[55%]">
            <market-name
              h="5"
              :quality="gem?.record?.quality"
            >
              {{ gem?.record?.name }}
            </market-name>
            <market-owner>
              (NB: {{ gem.player?.name }})
            </market-owner>
            <market-price>
              {{ gem.price }}
            </market-price>
          </div>
        </div>
        <button
          class="px-2 py-[2px] shadow rounded text-10 font-semibold !text-white bg-[#841919] italic"
          @click.stop="buy(gem)"
        >
          Mua
        </button>
      </div>
    </div>
  </div>
</template>
