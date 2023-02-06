<script setup lang="ts">
import type { PlayerEquipment } from '~/types'
import { ATTRIBUTE_NAME, QUALITY_TITLE, SLOT_NAME } from '~/constants'
import { usePlayerStore } from '~/composables/usePlayer'
import { backgroundQuality, qualityPalette } from '~/common'
import { sendMessage } from '~/composables/useMessage'

interface Prop {
  item: PlayerEquipment
  action?: boolean
  sellAction?: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['close', 'changeEquip', 'refresh'])

const { getPlayer } = usePlayerStore()
const loading = ref(false)
const propItem = ref(props.item)
const sellPopup = ref(false)
const sellOptions = ref({
  price: 0,
  quantity: 0,
})

const styles = computed(() => {
  return backgroundQuality(props.item.quality)
})

const qualityTitle = computed(() => {
  return QUALITY_TITLE[props.item.quality]
})

const gemReduceSlot = computed(() => {
  if (!props.item.gems)
    return props.item!.gemSlot

  return props.item.gemSlot! - props.item.gems!.length
})

const doEquip = async () => {
  const _id = props.item._id
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
  await getPlayer()
}

const doUnEquip = async () => {
  const _id = props.item._id
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
  await getPlayer()
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
        _id: props.item._id,
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

    <div class="text-center my-4">
      <var-button
        class="!text-[#333] font-medium mx-2"
        size="small"
        @click.stop="sell"
      >
        Treo bán
      </var-button>
    </div>
  </var-popup>
  <div
    class="relative text-white bg-primary leading-[23px] p-0 w-[85vw] m-auto overflow-hidden rounded border border-white/40"
  >
    <div class="text-12 font-medium">
      <div
        class="flex items-center justify-between p-2 pb-0"
      >
        <div class="mx-2 font-semibold text-left">
          <div
            :style="{ color: qualityPalette(item.quality) }"
          >
            {{ qualityTitle }} - {{ item.name }} + <span class="text-[13px]">{{ item.enhance }}</span>
          </div>
          <div class="flex">
            <icon v-for="i of item.star" :key="i" class="text-yellow-300" name="material-symbols:star" size="18" />
          </div>
          <p class="text-10">
            {{ SLOT_NAME[item.slot] }}
          </p>
          <p class="text-10">
            Bậc {{ item.rank }}
          </p>
        </div>
      </div>
      <div class="flex flex-col items-start justify-start p-2">
        <Line class="my-1">
          <div class="whitespace-nowrap">
            Thuộc tính cơ bản
          </div>
        </Line>
        <div class="mx-2 w-full">
          <div
            v-for="(stat, si) in item.stats"
            :key="si"
          >
            <div
              v-for="(value, key) in stat"
              :key="key"
            >
              <div v-if="value.main > 0 && value" class="flex justify-between">
                <span> {{ ATTRIBUTE_NAME[key] }}: {{ Math.round(value.main) }}</span>
                <span v-if="value.enhance" class="text-green-300 px-2">
                  (Cường hoá + {{ Math.round(value.enhance) }})
                  <span v-if="value.star > 0" class="text-yellow-300">
                    ({{ Math.round(value.star) }})
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <Line class="my-2">
          <div class="whitespace-nowrap">
            Đá hồn
          </div>
        </Line>
        <div v-if="item?.gems?.length > 0" class="mx-2 max-h-[250px] overflow-auto w-full">
          <div v-for="(gem, i) in item?.gems" :key="i" class="flex items-center px-1 p-1 bg-black/40 mb-1 relative">
            <gem-item :gem="gem" />
          </div>
          <template v-if="gemReduceSlot > 0">
            <div v-for="i in gemReduceSlot" :key="i" class="flex items-center mb-2">
              <nuxt-img src="/gem/default.png" format="webp" class="w-12 h-12 bg-black" />
              <span class="ml-2 text-10">
                (Chưa khảm)
              </span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="action" class="flex justify-center">
      <div>
        <var-button
          v-if="sellAction"
          class="!text-[#333] font-semibold mx-2 italic"
          size="small"
          @click.stop="sellPopup = true"
        >
          Treo bán
        </var-button>
        <var-button
          v-if="!propItem.used" class="!text-[#333] font-semibold italic"
          color="#ffd400"
          size="small"
          @click.stop="doEquip"
        >
          Trang bị
        </var-button>
        <var-button
          v-else
          class="!text-[#333] font-medium uppercase"
          size="small"
          @click.stop="doUnEquip"
        >
          Tháo trang bị
        </var-button>
      </div>
    </div>
    <div class="border-t border-white/40 py-2 w-[75%] m-auto text-12 mt-2">
      <div class="text-center text-10">
        Cấp độ sử dụng: {{ item.level }}
      </div>
    </div>
  </div>
</template>
