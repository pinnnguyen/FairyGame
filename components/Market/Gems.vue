<script setup lang="ts">
import { Dialog } from '@varlet/ui'
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
    closeOnClickOverlay: false,
    dialogClass: '!bg-black/70 text-white',
    confirmButtonColor: '#5388c1',
    confirmButtonTextColor: 'white',
    cancelButtonTextColor: '#5388c1',
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
    <bag-gem-detail
      :gem="gemSelected"
    />
  </var-popup>

  <div class="absolute top-10 px-6 w-full">
    <div class="grid grid-cols-2 m-auto overflow-auto mt-10 gap-2">
      <div v-for="gem in gems" :key="gem._id" class="relative">
        <nuxt-img class="h-[75px] w-full" format="webp" src="/common/bg-aution.png" />
        <div class="absolute w-15 h-15 transform-center left-[22%]" @click.stop="onSelectedGem(gem)">
          <nuxt-img format="webp" :src="`/quality_bg/iconbg_${gem.record.quality}.png`" class="absolute top-0" />
          <nuxt-img format="webp" :src="`/gem/${gem.record.gemId}.png`" class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" />
        </div>
        <div class="absolute top-0 right-0 flex mt-2 mr-2 flex-col w-1/2 h-full justify-around text-8">
          <span><icon name="tabler:user-check" size="12" /> {{ gem.player.name }}</span>
          <span>{{ gem.record.name }}</span>
          <div class="flex justify-between">
            <span>SL: {{ gem.record.sum }}</span>
            <div class="flex">
              <nuxt-img class="w-3 object-contain" format="webp" src="/items/1_s.png" />
              <span class="ml-1 font-semibold">{{ gem.price }}</span>
            </div>
          </div>
          <button
            class="mb-3 px-1 py-[2px] shadow rounded mr-2 text-10 font-semibold !text-white !border-2 !border-[#040404] bg-[#841919]"
            @click.stop="buy(gem)"
          >
            Mua
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
