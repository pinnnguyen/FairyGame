<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerStore, useSoundClickEvent } from '#imports'
import type { PlayerEquipment } from '~/types'
const emits = defineEmits(['close'])

const $io = useNuxtApp().$io
const { playerInfo } = storeToRefs(usePlayerStore())
const { fetchPlayer } = usePlayerStore()

const needResource = ref()
const loading = ref(false)
const tooltip = ref(false)
const options = reactive<{
  showEquipInfo: boolean
  equipSelected: Partial<PlayerEquipment>
}>({
  showEquipInfo: false,
  equipSelected: {},
})

$io.on('upgrade:preview:response', (require) => {
  needResource.value = require
})

$io.on('equip:upgrade:response', async (require: any) => {
  fetchPlayer()
  needResource.value = require
  loading.value = false
  sendMessage('Cường hoá thành công', 2000, 'bottom')
})

onUnmounted(() => {
  $io.off('equip:upgrade:response')
  $io.off('upgrade:preview:response')
})

const onEquipSelected = (equip: PlayerEquipment) => {
  console.log('equip', equip)
  options.equipSelected = equip
  $io.emit('equip:upgrade:preview', equip._id)
}

const upgrade = () => {
  useSoundClickEvent()
  loading.value = true
  if (!playerInfo.value)
    return

  if (!options.equipSelected._id) {
    sendMessage('Đạo hữu cần chọn trang bị để nâng cấp', 2000, 'bottom')
    loading.value = false
    return
  }

  if (needResource.value.gold > playerInfo.value?.gold) {
    sendMessage('Đạo hữu không đủ Tiền tiên để nâng cấp', 2000, 'bottom')
    loading.value = false
    return
  }

  if (needResource.value.totalCuongHoaThach < needResource.value.cuongHoaThach) {
    sendMessage('Nguyên liệu nâng cấp của đạo hữu không đủ', 2000, 'bottom')
    loading.value = false
    return
  }

  $io.emit('equip:upgrade', 'upgrade', options.equipSelected?._id)
}
</script>

<template>
  <var-popup v-if="tooltip" v-model:show="tooltip" position="center">
    <div class="w-60 p-4 bg-white text-12">
      <p>Mỗi cấp sẽ tăng 3% hiệu quả thuộc tính trang bị</p>
      <br>
      <p>Thất bại sẽ giảm 1 cấp cường hóa.</p>
    </div>
  </var-popup>
  <var-popup v-if="options.showEquipInfo" v-model:show="options.showEquipInfo">
    <equipment-detail :equipment="options.equipSelected" />
  </var-popup>
  <upgrade-item @onselected="onEquipSelected">
    <template #title>
      <Line class="my-2">
        <div class="whitespace-nowrap">
          Cường hoá
        </div>
      </Line>
    </template>
  </upgrade-item>
  <div v-if="needResource" class="absolute bottom-0 w-full duration-500 text-10">
    <div class="flex items-center flex-col justify-center text-primary">
      <div class="flex items-center mx-1">
        <span class="">Tiền tiên: {{ needResource?.gold }}</span>
      </div>
      <div class="flex items-center mx-2">
        <span class=""> Đá cường hoá: {{ needResource?.cuongHoaThach }}/{{ needResource?.totalCuongHoaThach }}</span>
      </div>
    </div>
    <div class="mb-6 mt-2 flex justify-center">
      <var-button
        :loading="loading"
        color="white"
        loading-size="mini"
        size="mini"
        @click.stop="upgrade"
      >
        Cường hoá
      </var-button>
    </div>
  </div>
  <p class="absolute bottom-5 right-5" @click="tooltip = true">
    <Icon name="ri:question-fill" size="20" class="text-white" />
  </p>
</template>
