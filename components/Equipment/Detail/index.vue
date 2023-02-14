<script setup lang="ts">
import { playerTitle } from '~/common'
import type { PlayerEquipment } from '~/types'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'

interface Prop {
  equipment: PlayerEquipment
  action?: boolean
  sellAction?: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['close', 'changeEquip', 'refresh'])

const { fetchPlayer } = usePlayerStore()
const loading = ref(false)
const propItem = ref(props.equipment)
const sellPopup = ref<boolean>(false)
const sellOptions = ref({
  price: 0,
  quantity: 0,
})

const equipmentLevelTitle = computed(() => {
  return playerTitle(props.equipment.level!, props.equipment.level! + 1)
})

const doEquip = async () => {
  const _id = props.equipment._id
  loading.value = true
  await $fetch('/api/player/equip', {
    headers: (useRequestHeaders(['cookie']) as any),
    method: 'POST',
    body: {
      _equipId: _id,
      action: 'equip',
    },
  })

  loading.value = false
  propItem.value.used = true
  emits('changeEquip')
  fetchPlayer()
}

const doUnEquip = async () => {
  const _id = props.equipment._id
  loading.value = true
  await $fetch('/api/player/equip', {
    headers: (useRequestHeaders(['cookie']) as any),
    method: 'POST',
    body: {
      _equipId: _id,
      action: 'unequip',
    },
  })

  propItem.value.used = false
  loading.value = false
  emits('changeEquip')
  fetchPlayer()
}
const sell = async () => {
  try {
    const sellRes: {
      success: boolean
      message: string
    } = await $fetch('/api/market/sell', {
      method: 'POST',
      body: {
        type: 'equipment',
        quantity: 1,
        price: sellOptions.value.price,
        _id: props.equipment._id,
      },
    })

    if (sellRes.success) {
      emits('refresh')
      sendMessage(sellRes.message)
    }
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <var-popup v-model:show="sellPopup" position="bottom">
    <div class="p-4">
      <var-input v-model="sellOptions.price" placeholder="Nhập giá bán" />
    </div>
    <div
      text="center"
      p="y-4"
    >
      <var-button
        class="!text-[#333] mx-2"
        size="small"
        @click.stop="sell"
      >
        Treo bán
      </var-button>
    </div>
  </var-popup>
  <div
    pos="relative"
    text="white"
    bg="primary"
    font="leading-[23px]"
    p="0"
    w="[85vw]"
    m="auto"
    overflow="hidden"
    class="border-box"
  >
    <div
      text="12"
      font="medium"
    >
      <div
        flex="~ "
        align="items-center"
        justify="between"
        p="2 b-0"
      >
        <equipment-detail-base-info
          :slot-num="equipment.slot"
          :name="equipment.name"
          :quality="equipment.quality"
          :enhance="equipment.enhance"
          :star="equipment.star"
          :rank="equipment.rank"
        />
      </div>
      <div
        flex="~ col"
        align="items-start"
        justify="start"
        p="2"
      >
        <equipment-detail-attribute-info
          :stats="equipment.stats"
        />
        <equipment-detail-gem-info
          :gems="equipment.gems"
          :gem-slot="equipment.gemSlot"
        />
      </div>
    </div>
    <div
      v-if="action"
      flex="~ "
      justify="center"
    >
      <div>
        <var-button
          v-if="sellAction"
          class="!text-[#333] mx-2"
          size="mini"
          @click.stop="sellPopup = true"
        >
          Treo bán
        </var-button>
        <var-button
          v-if="!propItem.used"
          type="warning"
          class="!text-[#333]"
          size="mini"
          @click.stop="doEquip"
        >
          Trang bị
        </var-button>
        <var-button
          v-else
          size="mini"
          class="!text-[#333]"
          @click.stop="doUnEquip"
        >
          Tháo trang bị
        </var-button>
      </div>
    </div>
    <div
      border="t white/40"
      p="y-2"
      m="auto t-2"
      text="12"
      class="w-[75%]"
    >
      <div
        text="center 10"
      >
        Cấp độ sử dụng: {{ equipmentLevelTitle.levelTitle }} {{ equipmentLevelTitle.floor }}
      </div>
    </div>
  </div>
</template>
