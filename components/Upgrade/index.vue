<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerSlot, usePlayerStore, useSoundClickEvent } from '#imports'
import type { PlayerEquipment } from '~/types'

const emits = defineEmits(['close'])
const { $io } = useNuxtApp()
const { playerInfo } = storeToRefs(usePlayerStore())
const { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8 } = storeToRefs(usePlayerSlot())

const { getSlotEquipUpgrade } = usePlayerSlot()
const { getPlayer } = usePlayerStore()

const equipSelected = ref<Partial<PlayerEquipment>>({})
const needResource = ref()
const loading = ref(false)
const tooltip = ref(false)
const showEquipInfo = ref(false)

onMounted(() => {
  $io.emit('equip:upgrade:start', `equip:upgrade:${playerInfo.value?.sid}`)
  $io.on('upgrade:preview:response', (require) => {
    needResource.value = require
  })

  $io.on('equip:upgrade:response', async (require: any) => {
    await getPlayer()
    console.log('require', require)
    needResource.value = require
    loading.value = false
    sendMessage('Cường hoá thành công')
  })
})

onUnmounted(() => {
  $io.emit('equip:upgrade:leave')
})

watch(equipSelected, (equip: Partial<PlayerEquipment>) => {
  console.log('equip', equip)
  $io.emit('equip:upgrade:preview', equip._id)
})

const upgrade = () => {
  useSoundClickEvent()
  loading.value = true
  if (!playerInfo.value)
    return

  if (!equipSelected.value._id) {
    sendMessage('Chọn vật phẩm cần nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value.gold > playerInfo.value?.gold) {
    sendMessage('Vàng không đủ để nâng cấp')
    loading.value = false
    return
  }

  if (needResource.value.totalCuongHoaThach < needResource.value.cuongHoaThach) {
    sendMessage('Nguyên liệu nâng cấp không đủ')
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
  <div class="flex items-center justify-center w-[calc(100vw_-_30px)] h-[70vh]">
    <div class="w-full h-full relative">
      <span class="font-bold absolute left-[calc(50%_-_28px)] top-0 text-[#656f99] text-12">Cường hoá</span>
      <nuxt-img class="w-full h-full" format="webp" src="/common/bj_tongyong_1.png" />
      <div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full" />
      <div class="flex justify-around w-full absolute top-10 px-2">
        <div class="flex flex-col pl-2 gap-2">
          <item-rank v-if="slot1?.preview" class="w-[55px] h-[55px]" :quantity="0" :rank="slot1.rank" :preview="slot1?.preview" @click.stop="equipSelected = slot1">
            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
              {{ getSlotEquipUpgrade(1)?.enhance }} cấp
            </div>
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-[#659e58] rounded" />
          <item-rank v-if="slot2?.preview" class="w-[55px] h-[55px]" :quantity="0" :rank="slot2.rank" :preview="slot2?.preview" @click.stop="equipSelected = slot2">
            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
              {{ getSlotEquipUpgrade(2)?.enhance }} cấp
            </div>
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-[#659e58] rounded" />
          <item-rank v-if="slot3?.preview" class="w-[55px] h-[55px]" :quantity="0" :rank="slot3.rank" :preview="slot3?.preview" @click.stop="equipSelected = slot3">
            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
              {{ getSlotEquipUpgrade(3)?.enhance }} cấp
            </div>
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-[#659e58] rounded" />
          <item-rank v-if="slot4?.preview" class="w-[55px] h-[55px]" :quantity="0" :rank="slot4.rank" :preview="slot4?.preview" @click.stop="equipSelected = slot4">
            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
              {{ getSlotEquipUpgrade(4)?.enhance }} cấp
            </div>
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-[#659e58] rounded" />
        </div>
        <div class="flex justify-center items-center relative">
          <nuxt-img format="webp" class="w-[200px]" src="/upgrade/intensive.png" />
          <div class="absolute top-[84px] rounded" @click="showEquipInfo = true">
            <item-rank v-if="equipSelected.preview" class="relative" :quantity="0" :rank="equipSelected.rank" :preview="equipSelected.preview">
              <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[45px] flex justify-center">
                {{ getSlotEquipUpgrade(equipSelected?.slot)?.enhance }} cấp
              </div>
            </item-rank>
          </div>
        </div>
        <div class="flex flex-col pr-2 gap-2">
          <item-rank v-if="slot5?.preview" class="w-[55px] h-[55px]" :quantity="0" :rank="slot5.rank" :preview="slot5?.preview" @click.stop="equipSelected = slot5">
            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
              {{ getSlotEquipUpgrade(5)?.enhance }} cấp
            </div>
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-[#659e58] rounded" />
          <item-rank v-if="slot6?.preview" class="w-[55px] h-[55px]" :quantity="0" :rank="slot6.rank" :preview="slot6?.preview" @click.stop="equipSelected = slot6">
            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
              {{ getSlotEquipUpgrade(6)?.enhance }} cấp
            </div>
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-[#659e58] rounded" />
          <item-rank v-if="slot7?.preview" class="w-[55px] h-[55px]" :quantity="0" :rank="slot7.rank" :preview="slot7?.preview" @click.stop="equipSelected = slot7">
            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
              {{ getSlotEquipUpgrade(7)?.enhance }} cấp
            </div>
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-[#659e58] rounded" />
          <item-rank v-if="slot8?.preview" class="w-[55px] h-[55px]" :quantity="0" :rank="slot8.rank" :preview="slot8?.preview" @click.stop="equipSelected = slot8">
            <div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center">
              {{ getSlotEquipUpgrade(8)?.enhance }} cấp
            </div>
          </item-rank>
          <div v-else class="w-[55px] h-[55px] bg-[#659e58] rounded" />
        </div>
      </div>
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
    </div>
  </div>
</template>
