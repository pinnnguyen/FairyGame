<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import { usePlayerSlot, usePlayerStore, useSocket } from '#imports'
import type { PlayerEquipment } from '~/types'

const emits = defineEmits(['close'])
const { _socket } = useSocket()
const { playerInfo, attribute, equipments } = storeToRefs(usePlayerStore())
const { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8 } = storeToRefs(usePlayerSlot())
const { getSlotEquipUpgrade } = usePlayerSlot()
const { getPlayer } = usePlayerStore()

const equipSelected = ref<Partial<PlayerEquipment>>({})
const needResource = ref()
const toast = useToast()
const loading = ref(false)

onMounted(() => {
  _socket.emit('equip:upgrade:start', `equip:upgrade:${playerInfo.value?.sid}`)
  _socket.on('equip:preview:response', (require) => {
    needResource.value = require
  })
})

onUnmounted(() => {
  _socket.emit('equip:upgrade:leave')
  _socket.emit('disconnect')
})

watch(equipSelected, (equip: Partial<PlayerEquipment>) => {
  console.log('equip', equip)
  _socket.emit('equip:upgrade:preview', equip._id)
})
const upgrade = () => {
  loading.value = true
  if (!playerInfo.value)
    return

  if (!equipSelected.value._id) {
    toast.info('Chọn vật phẩm cần nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value.gold > playerInfo.value?.gold) {
    toast.info('Vàng không đủ để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value.totalCuongHoaThach < needResource.value.cuongHoaThach) {
    toast.info('Nguyên liệu nâng cấp không đủ')
    loading.value = false
    return
  }

  _socket.emit('equip:upgrade', 'upgrade', equipSelected.value?._id)
  _socket.on('equip:upgrade:response', async (require: any) => {
    console.log('loading.value = false')
    await getPlayer()
    needResource.value = require
    loading.value = false
    toast.info('Cường hoá thành công', {
      timeout: 1000,
    })
  })
}

const goToHome = () => {
  emits('close')
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-[calc(100vh_-_30px)] bg-bg_5 bg-cover fixed top-[28px] w-full h-full z-99">
    <div class="w-full h-[80%] absolute top-10">
      <div class="w-full h-full relative">
        <span class="font-semibold absolute left-[calc(50%_-_28px)] top-[1px] text-[#656f99] text-12">Cường hoá</span>
        <NuxtImg class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
        <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full" />
        <div class="flex justify-around w-full absolute top-10">
          <div class="flex flex-col pl-2">
            <div class="relative bg-iconbg_1 bg-contain bg-no-repeat mb-2" @click.stop="equipSelected = slot1">
              <div v-if="slot1?.preview">
                <NuxtImg :src="slot1?.preview" class="w-[60px] h-[55px]" />
                <p class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
                  {{ getSlotEquipUpgrade(1).upgradeLevel }} cấp
                </p>
              </div>
              <div v-else class="w-[60px] h-[55px]" />
            </div>
            <div class="relative bg-iconbg_1 bg-contain bg-no-repeat mb-2" @click.stop="equipSelected = slot2">
              <div v-if="slot2?.preview">
                <NuxtImg :src="slot2?.preview" class="w-[60px] h-[55px]" />
                <p class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
                  {{ getSlotEquipUpgrade(2).upgradeLevel }} cấp
                </p>
              </div>
              <div v-else class="w-[60px] h-[55px]" />
            </div>
            <div class="relative bg-iconbg_1 bg-contain bg-no-repeat mb-2" @click.stop="equipSelected = slot3">
              <div v-if="slot3?.preview">
                <NuxtImg :src="slot3?.preview" class="w-[60px] h-[55px]" />
                <p class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
                  {{ getSlotEquipUpgrade(3).upgradeLevel }} cấp
                </p>
              </div>
              <div v-else class="w-[60px] h-[55px]" />
            </div>
            <div class="relative bg-iconbg_1 bg-contain bg-no-repeat mb-2" @click.stop="equipSelected = slot4">
              <div v-if="slot3?.preview">
                <NuxtImg :src="slot3?.preview" class="w-[60px] h-[55px]" />
                <p class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
                  {{ getSlotEquipUpgrade(3).upgradeLevel }} cấp
                </p>
              </div>
              <div v-else class="w-[60px] h-[55px]" />
            </div>
          </div>
          <div class="flex justify-center items-center relative">
            <NuxtImg format="webp" class="w-[200px]" src="/upgrade/intensive.png" />
            <div class="absolute bg-iconbg_1 bg-contain bg-no-repeat mb-2 top-[90px]">
              <div v-if="equipSelected.preview" class="relative">
                <NuxtImg :src="equipSelected?.preview" class="w-[44px] h-[44px]" />
                <p class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[45px] flex justify-center">
                  {{ getSlotEquipUpgrade(equipSelected.slot).upgradeLevel }} cấp
                </p>
              </div>
              <div v-else class="w-[44px] h-[44px]" />
            </div>
          </div>
          <div class="flex flex-col pr-2">
            <div class="relative bg-iconbg_1 bg-contain bg-no-repeat mb-2" @click.stop="equipSelected = slot5">
              <div v-if="slot5?.preview">
                <NuxtImg :src="slot5?.preview" class="w-[60px] h-[55px]" />
                <p class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
                  {{ getSlotEquipUpgrade(5).upgradeLevel }} cấp
                </p>
              </div>
              <div v-else class="w-[60px] h-[55px]" />
            </div>
            <div class="relative bg-iconbg_1 bg-contain bg-no-repeat mb-2" @click.stop="equipSelected = slot6">
              <div v-if="slot6?.preview">
                <NuxtImg :src="slot6?.preview" class="w-[60px] h-[55px]" />
                <p class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
                  {{ getSlotEquipUpgrade(6).upgradeLevel }} cấp
                </p>
              </div>
              <div v-else class="w-[60px] h-[55px]" />
            </div>
            <div class="relative bg-iconbg_1 bg-contain bg-no-repeat mb-2" @click.stop="equipSelected = slot7">
              <div v-if="slot7?.preview">
                <NuxtImg :src="slot7?.preview" class="w-[60px] h-[55px]" />
                <p class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
                  {{ getSlotEquipUpgrade(7).upgradeLevel }} cấp
                </p>
              </div>
              <div v-else class="w-[60px] h-[55px]" />
            </div>
            <div class="relative bg-iconbg_1 bg-contain bg-no-repeat mb-2" @click.stop="equipSelected = slot8">
              <div v-if="slot8?.preview">
                <NuxtImg :src="slot8?.preview" class="w-[60px] h-[55px]" />
                <p class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
                  {{ getSlotEquipUpgrade(8).upgradeLevel }} cấp
                </p>
              </div>
              <div v-else class="w-[60px] h-[55px]" />
            </div>
          </div>
        </div>
        <div v-if="needResource" class="absolute bottom-0 w-full duration-500">
          <div class="flex items-center justify-center">
            <div class="flex items-center mx-1">
              <NuxtImg format="webp" class="w-5 mr-1" src="/items/3_s.png" />
              <span class="text-12 font-semibold text-[#52648e]">{{ needResource?.gold }}</span>
            </div>
            <div class="flex items-center mx-1">
              <NuxtImg format="webp" class="w-5 mr-1" src="/upgrade/cuonghoathach.png" />
              <span class="text-12 font-semibold text-[#52648e]"> {{ needResource?.cuongHoaThach }}/{{ needResource?.totalCuongHoaThach }}</span>
            </div>
          </div>
          <div class="mb-5 mt-2 flex justify-center">
            <button class="bg-[#f4d59c] text-xs overflow-hidden relative p-4 h-[30px] flex items-center justify-center text-[#8d734b] rounded" @click.stop="upgrade">
              <svg v-if="loading" class="inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span class="z-9 text-12 font-semibold">
                Cường hoá
              </span>
            </button>
          </div>
        </div>
        <!--        <div class="flex"> -->
        <!--          <button> -->
        <!--            <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_active.png" /> -->
        <!--          </button> -->
        <!--          <button> -->
        <!--            <NuxtImg class="w-[60px] h-[70px]" src="/bottom/bottom_tab_deactive.png" /> -->
        <!--          </button> -->
        <!--        </div> -->
      </div>
    </div>
    <div class="absolute bottom-0 w-full h-[65px]">
      <div class="w-full h-full relative">
        <NuxtImg class="w-full h-full" src="/common/bg1_common.png" />
      </div>
    </div>
    <div class="absolute bottom-0 flex justify-end w-full h-[65px]" @click="goToHome">
      <NuxtImg class="h-full" src="/bottom/bottom_back.png" />
    </div>
  </div>
</template>