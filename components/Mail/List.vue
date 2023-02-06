<script setup lang="ts">
import { qualityPalette } from '~/common'

const props = defineProps<{
  records: any
  recordType: string
  _mailId: string
  mail: any
}>()

const toggle = reactive({
  show: false,
})
const gemSelected = ref({})
const onSelectedGem = (gem: any) => {
  gemSelected.value = gem
  toggle.show = true
}

const take = async () => {
  if (props.mail.isRead) {
    sendMessage('Phần thưởng đã được nhận trước đó', 2500)
    return
  }

  try {
    const takeRes: any = await $fetch('/api/mail/take', {
      method: 'POST',
      body: {
        _mailId: props._mailId,
      },
    })

    sendMessage(takeRes.message, 2500)
    toggle.show = false
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <var-popup v-model:show="toggle.show" position="center">
    <bag-gem-detail
      v-if="recordType === 'gem'"
      :gem="gemSelected"
    />
    <bag-equip-detail
      v-if="recordType === 'equipment'"
      :item="gemSelected"
    />
  </var-popup>

  <div
    v-for="record in records" :key="record._id"
    class="absolute bottom-0 transform-center w-25 flex-center"
    @click.stop="onSelectedGem(record)"
  >
    <div class="text-center">
      <div class="relative w-12 h-12 m-auto mt-2">
        <nuxt-img format="webp" :src="`/quality_bg/iconbg_${record.quality || record.rank}.png`" class="absolute top-0" />
        <nuxt-img v-if="recordType === 'gem'" format="webp" :src="`gem/${record.gemId}.png`" class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" />
        <nuxt-img v-else format="webp" :src="record.preview" class="absolute transform-center w-[80%] h-[80%] rounded-full object-cover" />
        <div class="absolute bg-black/60 text-8 font-bold text-white bottom-1 right-1 px-1 rounded-2xl text-yellow-300">
          {{ record.sum }}
        </div>
      </div>
      <p
        class="text-10 font-semibold whitespace-nowrap pt-1" :style="{
          color: qualityPalette(record.quality),
        }"
      >
        {{ record.name }}
      </p>
      <span v-if="mail.isRead" class="text-white/40">Đã nhận</span>
      <var-button v-else size="mini" class="!text-[#333] my-2" @click.stop="take()">
        Nhận
      </var-button>
    </div>
  </div>
</template>
