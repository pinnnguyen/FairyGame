<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerSlot, usePlayerStore } from '#imports'
import type { PlayerEquipment } from '~/types'

interface Require {
  gold: number
  knb: number
  daNangSao: number
  totalDaNangSao: number
}

const emits = defineEmits(['close'])
const { getSlotEquipUpgrade } = usePlayerSlot()
const { $io } = useNuxtApp()
const { playerInfo } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const equipSelected = ref<Partial<PlayerEquipment>>({})
const needResource = ref<Require>()

const loading = ref(false)
const tooltip = ref(false)
const showEquipInfo = ref(false)

$io.on('star:preview:response', (require: Require) => {
  console.log('require', require)
  needResource.value = require
})

$io.on('equip:star:response', async (require: any) => {
  await getPlayer()
  console.log('require', require)
  needResource.value = require
  loading.value = false
  sendMessage('Nâng sao trang bị thành công')
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
    sendMessage('Đạo hữu cần chọn trang bị để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value!.gold! > playerInfo.value?.gold) {
    sendMessage('Đạo hữu không đủ vàng để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value!.knb! > playerInfo.value?.knb) {
    sendMessage('Đạo hữu không đủ KNB để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value!.totalDaNangSao < needResource.value!.daNangSao) {
    sendMessage('Nguyên liệu nâng cấp của đạo hữu không đủ')
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
    <div class="w-60 p-4 bg-white text-12">
      <p>Mỗi cấp sẽ tăng 5% hiệu quả thuộc tính trang bị</p>
      <br>
      <p>Thất bại sẽ giảm 1 cấp.</p>
    </div>
  </var-popup>
  <var-popup v-model:show="showEquipInfo" position="center">
    <BagEquipDetail :action="false" :item="equipSelected" />
  </var-popup>
  <upgrade-item @equipSelected="onEquipSelected">
    <template #title>
      Nâng sao
    </template>
    <!--    <template #upgrade-level> -->
    <!--      <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[45px] flex justify-center"> -->
    <!--        {{ getSlotEquipUpgrade(equipSelected?.slot)?.star }} sao -->
    <!--      </div> -->
    <!--    </template> -->
  </upgrade-item>
  <div v-if="needResource" class="absolute bottom-0 w-full duration-500">
    <div class="flex items-center justify-center">
      <div class="flex items-center mx-1">
        <nuxt-img format="webp" class="w-5 mr-1" src="/items/3_s.png" />
        <span class="text-12 font-semibold text-[#52648e]">{{ needResource?.gold }}</span>
      </div>
      <div class="flex items-center mx-1">
        <nuxt-img format="webp" class="w-5 mr-1" src="/items/1_s.png" />
        <span class="text-12 font-semibold text-[#52648e]">{{ needResource?.knb }}</span>
      </div>
      <div class="flex items-center mx-1">
        <nuxt-img format="webp" class="w-5 mr-1" src="/items/17.png" />
        <span class="text-12 font-semibold text-[#52648e]"> {{ needResource?.daNangSao }}/{{ needResource?.totalDaNangSao }}</span>
      </div>
    </div>
    <div class="mb-6 mt-2 flex justify-center">
      <var-button :loading="loading" class="!text-[#333] font-medium font-semibold uppercase" color="#ffd400" size="small" @click.stop="upgrade">
        Nâng sao
      </var-button>
    </div>
  </div>
  <p class="absolute bottom-5 right-5" @click="tooltip = true">
    <Icon name="ri:question-fill" size="20" class="text-white" />
  </p>
</template>
