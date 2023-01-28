<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerStore } from '#imports'
import type { PlayerEquipment } from '~/types'

interface Require {
  gold: number
  knb: number
  needFoodNumber: number
  playerEquipments: PlayerEquipment[]
  message: string
}

const emits = defineEmits(['close'])
const { $io } = useNuxtApp()
const { playerInfo } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const equipSelected = ref<Partial<PlayerEquipment>>({})
const needResource = ref<Require>()
const loading = ref(false)

const tooltip = ref(false)
const showEquipInfo = ref(false)
const currentFood = ref<string[]>([])

// onMounted(() => {
// $io.emit('equip:rank:start', `equip:rank:${playerInfo.value?.sid}`)
$io.on('rank:preview:response', (require: Require) => {
  console.log('require', require)
  loading.value = false
  needResource.value = require
})

$io.on('equip:rank:response', async (require: any) => {
  await getPlayer()
  console.log('require', require)
  needResource.value = require
  loading.value = false
  sendMessage(require.message)
})

onUnmounted(() => {
  $io.off('rank:preview:response')
  $io.off('equip:rank:response')
})

const onEquipSelected = (equip: PlayerEquipment) => {
  equipSelected.value = equip
  loading.value = true
  currentFood.value = []
  $io.emit('equip:rank:preview', equip._id)
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

  if (currentFood.value.length < needResource.value!.needFoodNumber) {
    sendMessage('Số lượng trang bị phôi của đạo hữu không đủ')
    loading.value = false
    return
  }

  $io.emit('equip:rank:levelup', {
    _equipId: equipSelected.value?._id,
    listFood: currentFood.value,
  })
}

const pickEquipmentFood = (_id?: string) => {
  if (!currentFood.value.includes(_id!))
    currentFood.value.push(_id!)
  else
    currentFood.value.splice(currentFood.value.indexOf(_id!), 1)
}
</script>

<template>
  <var-popup v-model:show="tooltip" position="center">
    <div class="w-60 p-4 bg-white text-12">
      <p>Mỗi bậc sẽ tăng 10% toàn bộ thuộc tính gốc cho trang bị</p>
      <br>
      <p class="pb-4">
        Mỗi lần lên cấp sẽ cần số lượng phôi cùng cấp bậc với trang bị cần nâng
      </p>
      <p class="pb-4">
        Sau khi tăng bậc phôi sẽ bị mất
      </p>
      <p>Tăng bậc trang bị sẽ có tỉ lên thành công 100%</p>
    </div>
  </var-popup>
  <var-popup v-model:show="showEquipInfo" position="center">
    <BagEquipDetail
      :action="false"
      :item="equipSelected"
    />
  </var-popup>
  <upgrade-item @equipSelected="onEquipSelected">
    <template #title>
      Nâng bậc
    </template>
  </upgrade-item>
  <div class="absolute bottom-25 h-20 w-full">
    <div
      v-if="needResource?.playerEquipments && needResource?.playerEquipments?.length > 0"
      class="grid grid-cols-6 h-full overflow-auto p-4"
    >
      <lazy-item-rank
        v-for="equipment in needResource?.playerEquipments" :key="equipment._id"
        :preview="equipment?.preview"
        :rank="equipment?.rank"
        :quality="equipment?.quality"
        :quantity="0"
        class="!w-10 pb-2"
        :class="{ 'filter grayscale': currentFood.includes(equipment._id) }"
        @click.stop="pickEquipmentFood(equipment._id)"
      >
        <p class="text-10 font-semibold line-clamp-1">
          {{ equipment?.name }}
        </p>
      </lazy-item-rank>
    </div>
  </div>
  <div v-if="needResource" class="absolute bottom-0 w-full duration-500 h-20">
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
        <span class="text-12 font-semibold text-[#52648e]">Trang bị: {{ currentFood.length }}/{{ needResource?.needFoodNumber }}</span>
      </div>
    </div>
    <div class="mb-6 mt-2 flex justify-center">
      <var-button :loading="loading" class="!text-[#333] font-medium font-semibold uppercase" color="#ffd400" size="small" @click.stop="upgrade">
        TĂNG BẬC
      </var-button>
    </div>
  </div>
  <p class="absolute bottom-5 right-5" @click="tooltip = true">
    <Icon name="ri:question-fill" size="20" />
  </p>
</template>
