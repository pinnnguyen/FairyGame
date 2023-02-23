<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { set } from '@vueuse/core'
import { sendNotification, usePlayerStore } from '#imports'
import type { PlayerEquipment } from '~/types'

interface Require {
  gold: number
  knb: number
  daNangSao: number
  totalDaNangSao: number
}

const emits = defineEmits(['close'])
const { $io } = useNuxtApp()
const { playerInfo } = storeToRefs(usePlayerStore())
const { getPlayer, fetchPlayer } = usePlayerStore()

const equipSelected = ref<Partial<PlayerEquipment>>({})
const needResource = ref<Require>()

const loading = ref(false)
const tooltip = ref(false)
const showEquipInfo = ref(false)

$io.on('star:preview:response', (require: Require) => {
  needResource.value = require
})

$io.on('equip:star:response', async (require: any) => {
  fetchPlayer()
  set(needResource, require)
  set(loading, false)
  sendNotification('Nâng sao trang bị thành công')
})

const onEquipSelected = (equip: PlayerEquipment) => {
  equipSelected.value = equip
  $io.emit('equip:star:preview', equip._id)
}

const upgrade = () => {
  loading.value = true
  if (!playerInfo.value)
    return

  if (!equipSelected.value._id) {
    sendNotification('Đạo hữu cần chọn trang bị để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value!.gold! > playerInfo.value?.gold) {
    sendNotification('Đạo hữu không đủ Tiền tiên để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value!.knb! > playerInfo.value?.knb) {
    sendNotification('Đạo hữu không đủ KNB để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value!.totalDaNangSao < needResource.value!.daNangSao) {
    sendNotification('Nguyên liệu nâng cấp của đạo hữu không đủ')
    loading.value = false
    return
  }

  $io.emit('equip:star', equipSelected.value?._id)
}

onUnmounted(() => {
  $io.off('equip:star:response')
  $io.off('star:preview:response')
})
</script>

<template>
  <var-popup v-model:show="tooltip" position="center">
    <div class="w-60 p-4 border border-white/40 text-12 text-primary">
      <p>Mỗi cấp sẽ tăng 5% hiệu quả thuộc tính trang bị</p>
      <br>
      <p>Thất bại sẽ giảm 1 cấp.</p>
    </div>
  </var-popup>
  <var-popup v-model:show="showEquipInfo" position="center">
    <equipment-detail :action="false" :equipment="equipSelected" />
  </var-popup>
  <upgrade-item @onselected="onEquipSelected">
    <template #title>
      <Line class="my-2">
        <div class="whitespace-nowrap">
          Nâng sao
        </div>
      </Line>
    </template>
  </upgrade-item>
  <div v-if="needResource" class="absolute bottom-0 w-full duration-500 text-10 font-semibold text-primary">
    <div class="flex-center">
      <div class="flex items-center mx-1">
        Tiền tiên: {{ needResource?.gold }}
      </div>
      <div class="flex items-center mx-1">
        Tiên duyên: {{ needResource?.knb }}
      </div>
      <div class="flex items-center mx-1">
        Đá nâng sao: {{ needResource?.daNangSao }}/{{ needResource?.totalDaNangSao }}
      </div>
    </div>
    <div class="mb-6 mt-2 flex justify-center">
      <var-button
        :loading="loading"
        color="white"
        loading-size="mini"
        class="!text-[#333]"
        size="mini"
        @click.stop="upgrade"
      >
        Nâng sao
      </var-button>
    </div>
  </div>
  <p class="absolute bottom-5 right-5" @click="tooltip = true">
    <Icon name="ri:question-fill" size="20" class="text-white" />
  </p>
</template>
