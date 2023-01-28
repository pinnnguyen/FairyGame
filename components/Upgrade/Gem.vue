<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Dialog } from '@varlet/ui'
import { sendMessage, usePlayerSlot, usePlayerStore, useSoundClickEvent } from '#imports'
import type { PlayerEquipment } from '~/types'
import HandleUpGem from '~/components/Upgrade/HandleUpGem.vue'

const emits = defineEmits(['close'])
const { $io } = useNuxtApp()

const { playerInfo } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const equipSelected = ref<Partial<PlayerEquipment>>({})
const needResource = ref<{
  needPunchAHole: number
}>()

const loading = ref(false)
const tooltip = ref(false)
const showEquipInfo = ref(false)

// $io.on('gem:preview:response', (data) => {
//   console.log('data', data)
//   needResource.value = data
// })

// $io.on('gem:punchahole:response', (data) => {
//   console.log('data', data)
//   sendMessage(data.message, 2000)
// })

// onUnmounted(() => {
//   $io.off('gem:preview:response')
//   $io.off('gem:punchahole:response')
// })

// const onEquipSelected = (equip: PlayerEquipment) => {
//   equipSelected.value = equip
//   $io.emit('equip:gem:preview', equip._id)
// }

// const punchAHole = () => {
//   $io.off('equip:gem:preview')
//   $io.off('gem:preview:response')
//   $io.emit('equip:gem:preview', equipSelected.value._id)
//
//   $io.on('gem:preview:response', (data) => {
//     Dialog({
//       title: 'HỆ THỐNG',
//       message: `Đục thêm 1 lỗ trên trang bi này cần ${data?.needPunchAHole} KNB đạo hữu có muốn thực hiện?`,
//       onConfirm: () => {
//         $io.emit('equip:gem:punchahole', equipSelected.value._id)
//       },
//       confirmButtonText: 'Đồng ý',
//       cancelButtonText: 'Huỷ',
//     })
//
//     needResource.value = data
//   })
// }
//
// const mosaic = () => {
//   return 0
// }
</script>

<template>
  <var-popup v-model:show="tooltip" position="center">
    <div class="w-60 p-4 bg-white text-12">
      <p>Mỗi cấp sẽ tăng 3% hiệu quả thuộc tính trang bị</p>
      <br>
      <p>Thất bại sẽ giảm 1 cấp cường hóa.</p>
    </div>
  </var-popup>
  <!--  <var-popup v-model:show="showEquipInfo" position="center"> -->
  <!--    <PopupEquipInfo :item="equipSelected" /> -->
  <!--  </var-popup> -->
  <HandleUpGem>
    <template #title>
      Đá hồn
    </template>
  </HandleUpGem>
  <!--  <div v-if="needResource" class="absolute bottom-0 w-full duration-500"> -->
  <!--    <div class="mb-6 mt-2 flex justify-center"> -->
  <!--      <var-button class="!text-[#333] font-medium font-semibold uppercase mx-1" color="#ffd400" size="small" @click.stop="punchAHole"> -->
  <!--        Đục lỗ -->
  <!--      </var-button> -->
  <!--      <var-button :loading="loading" class="!text-[#333] font-medium font-semibold uppercase mx-1" color="#ffd400" size="small" @click.stop="mosaic"> -->
  <!--        Khảm đá -->
  <!--      </var-button> -->
  <!--    </div> -->
  <!--  </div> -->
  <p class="absolute bottom-5 right-5" @click="tooltip = true">
    <Icon name="ri:question-fill" size="20" class="text-white" />
  </p>
</template>
