<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { set } from '@vueuse/core'
import { qualityToName } from '../../constants'
import { formatCash, qualityPalette } from '~/common'
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
const { fetchPlayer } = usePlayerStore()

const needResource = ref<Require>()
const loading = ref(false)

const options = reactive<{
  equipSelected: Partial<PlayerEquipment>
  showEquipInfo: boolean
  tooltip: boolean
}>({
  equipSelected: {},
  showEquipInfo: false,
  tooltip: false,
})

const currentFood = ref<string[]>([])

$io.on('rank:preview:response', (require: Require) => {
  set(loading, false)
  set(needResource, require)
})

$io.on('equip:rank:response', async (require: any) => {
  fetchPlayer()
  set(needResource, require)
  set(loading, false)
  sendMessage(require.message)
})

onUnmounted(() => {
  $io.off('rank:preview:response')
  $io.off('equip:rank:response')
})

const onEquipSelected = (equip: PlayerEquipment) => {
  options.equipSelected = equip
  set(loading, true)
  set(currentFood, [])
  $io.emit('equip:rank:preview', equip._id)
}

const upgrade = () => {
  set(loading, true)
  if (!playerInfo.value)
    return

  if (!options.equipSelected._id) {
    sendMessage('Đạo hữu cần chọn trang bị để nâng cấp', 2000, 'bottom')
    set(loading, false)
    return
  }

  if (needResource.value!.gold! > playerInfo.value?.gold) {
    sendMessage('Đạo hữu không đủ Tiền tiên để nâng cấp', 2000, 'bottom')
    set(loading, false)
    return
  }

  if (needResource.value!.knb! > playerInfo.value?.knb) {
    sendMessage('Đạo hữu không đủ KNB để nâng cấp', 2000, 'bottom')
    set(loading, false)
    return
  }

  if (currentFood.value.length < needResource.value!.needFoodNumber) {
    sendMessage('Số lượng trang bị phôi của đạo hữu không đủ', 2000, 'bottom')
    set(loading, false)
    return
  }

  $io.emit('equip:rank:levelup', {
    _equipId: options.equipSelected?._id,
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
  <var-popup v-model:show="options.tooltip" position="center">
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
  <var-popup v-model:show="options.showEquipInfo" position="center">
    <equipment-detail
      :action="false"
      :item="options.equipSelected"
    />
  </var-popup>
  <upgrade-item @onselected="onEquipSelected">
    <template #title>
      <Line class="my-2">
        <div class="whitespace-nowrap">
          Nâng bậc
        </div>
      </Line>
    </template>
  </upgrade-item>
  <div class="absolute bottom-20 h-20 w-full">
    <Line>
      <div
        text="space-nowrap primary 8"
      >
        Kho trang bị
      </div>
    </Line>
    <div
      v-if="needResource?.playerEquipments && needResource?.playerEquipments?.length > 0"
      p="2"
      h="full"
      overflow="scroll"
      gap="2"
      class="grid grid-cols-2"
    >
      <div
        v-for="equipment in needResource?.playerEquipments"
        :key="equipment?._id"
        :class="{
          'border border-green-400': currentFood.includes(equipment._id),
        }"
        class="rounded p-1 border border-white/40"
        @click.stop="pickEquipmentFood(equipment._id)"
      >
        <div
          class="text-8 font-bold"
          :style="{
            color: qualityPalette(equipment.quality),
          }"
        >
          {{ `${qualityToName[equipment.quality ?? 1]} -` }} {{ equipment?.name }} (+{{ equipment.enhance }})
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="needResource"
    pos="absolute"
    text="8 semibold primary"
    bottom="0"
    flex="~ "
    align="items-center"
    h="20"
    w="full"
    justify="around"
  >
    <div
      flex="~ "
      align="items-center"
      w="14"
    >
      <span>Tiền tiên: {{ formatCash(needResource?.gold) }}</span>
    </div>
    <div
      flex="~ "
      align="items-center"
      w="17"
    >
      <span>Tiên duyên: {{ needResource?.knb }}</span>
    </div>
    <div
      flex="~ "
      align="items-center"
      w="12"
    >
      <span>Trang bị: {{ currentFood.length }}/{{ needResource?.needFoodNumber }}</span>
    </div>
    <var-button
      loading-size="mini"
      :loading="loading"
      class="!text-[#333]"
      size="mini"
      @click.stop="upgrade"
    >
      Tăng bậc
    </var-button>
  </div>
</template>
