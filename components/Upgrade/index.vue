<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerSlot, usePlayerStore, useSoundClickEvent } from '#imports'
import type { PlayerEquipment } from '~/types'
const emits = defineEmits(['close'])

const { getSlotEquipUpgrade } = usePlayerSlot()
const { $io } = useNuxtApp()

const { playerInfo } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const equipSelected = ref<Partial<PlayerEquipment>>({})
const needResource = ref()
const loading = ref(false)
const tooltip = ref(false)
const showEquipInfo = ref(false)

// onMounted(() => {
// $io.emit('equip:upgrade:start', `equip:upgrade:${playerInfo.value?.sid}`)
$io.on('upgrade:preview:response', (require) => {
  console.log('require', require)
  needResource.value = require
})

$io.on('equip:upgrade:response', async (require: any) => {
  await getPlayer()
  needResource.value = require
  loading.value = false
  sendMessage('Cường hoá thành công')
})
// })

onUnmounted(() => {
  $io.off('equip:upgrade:response')
  $io.off('upgrade:preview:response')
})

const onEquipSelected = (equip: PlayerEquipment) => {
  equipSelected.value = equip
  $io.emit('equip:upgrade:preview', equip._id)
}

const upgrade = () => {
  useSoundClickEvent()
  loading.value = true
  if (!playerInfo.value)
    return

  if (!equipSelected.value._id) {
    sendMessage('Đạo hữu cần chọn trang bị để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value.gold > playerInfo.value?.gold) {
    sendMessage('Đạo hữu không đủ vàng để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value.totalCuongHoaThach < needResource.value.cuongHoaThach) {
    sendMessage('Nguyên liệu nâng cấp của đạo hữu không đủ')
    loading.value = false
    return
  }

  $io.emit('equip:upgrade', 'upgrade', equipSelected.value?._id)
}

const goToHome = () => {
  emits('close')
}
</script>

<template>
  <var-popup v-model:show="tooltip" position="center">
    <div class="w-60 p-4 bg-white text-12">
      <p>Mỗi cấp sẽ tăng 3% hiệu quả thuộc tính trang bị</p>
      <br>
      <p>Thất bại sẽ giảm 1 cấp cường hóa.</p>
    </div>
  </var-popup>
  <var-popup v-model:show="showEquipInfo" position="center">
    <PopupEquipInfo :item="equipSelected" />
  </var-popup>
  <upgrade-item @equipSelected="onEquipSelected">
    <template #title>
      Cường hoá
    </template>
    <!--    <template #upgrade-level> -->
    <!--      <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[45px] flex justify-center"> -->
    <!--        {{ getSlotEquipUpgrade(equipSelected?.slot)?.enhance }} cấp -->
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
        <nuxt-img format="webp" class="w-5 mr-1" src="/upgrade/cuonghoathach.png" />
        <span class="text-12 font-semibold text-[#52648e]"> {{ needResource?.cuongHoaThach }}/{{ needResource?.totalCuongHoaThach }}</span>
      </div>
    </div>
    <div class="mb-6 mt-2 flex justify-center">
      <var-button :loading="loading" class="!text-[#333] font-medium font-semibold uppercase" color="#ffd400" size="small" @click.stop="upgrade">
        Cường hoá
      </var-button>
    </div>
  </div>
  <p class="absolute bottom-5 right-5" @click="tooltip = true">
    <Icon name="ri:question-fill" size="20" class="text-white" />
  </p>
</template>
