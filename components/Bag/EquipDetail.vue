<script setup lang="ts">
import type { PlayerEquipment } from '~/types'
import { QUALITY_TITLE, SLOT_NAME } from '~/constants'
import { usePlayerStore } from '~/composables/usePlayer'
import { backgroundQuality } from '~/common'
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
  <div class="relative leading-6 text-white bg-black/60 p-0 w-[90%] m-auto overflow-hidden rounded">
    <div class="text-12 font-medium">
      <div
        class="flex items-center justify-between p-2"
        :style="styles"
      >
        <div class="flex items-center justify-center">
          <item-rank
            class="w-15"
            :quality="item.quality"
            :quantity="0"
            :rank="item.rank"
            :preview="item?.preview"
          />
        </div>
        <div class="mx-2 font-semibold text-14">
          <div>
            {{ qualityTitle }} {{ item.name }} + <span class="text-14">{{ item.enhance }}</span>
          </div>
          <div class="flex">
            <icon v-for="i of item.star" :key="i" class="text-yellow-300" name="material-symbols:star" size="18" />
          </div>
          <div>
            {{ SLOT_NAME[item.slot] }}
          </div>
          <div>Bậc {{ item.rank }}</div>
        </div>
      </div>
      <div class="flex flex-col items-start justify-start">
        <div class="mx-2 my-2 text-10 text-center w-full">
          --------Thuộc tính cơ bản--------
        </div>
        <div class="mx-2">
          <div v-for="(stat, index) in item.stats" :key="index">
            <p v-if="stat.speed && stat.speed.main > 0" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="mdi:bow-arrow" size="16" class="text-[#a855f7]" />
                <span>Tốc độ: {{ Math.round(stat.speed.main) }}</span>
                <span v-if="item.enhance" class="text-green-300 flex items-center">
                  (Cường hoá + {{ Math.round(stat.speed.enhance) }})
                </span>
                <span v-if="item.star > 0" class="text-yellow-300 flex items-center">
                  (<icon name="material-symbols:star" size="15" />
                  {{ stat.speed.star }})
                </span>
              </span>
            </p>
            <p v-if="stat.damage && stat.damage.main > 0" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="material-symbols:swords" size="16" class="text-rose-600" />
                <span>Công kích: {{ Math.round(stat.damage.main) }}</span>
                <span v-if="item.enhance" class="text-green-300 flex items-center">
                  (Cường hoá + {{ Math.round(stat.damage.enhance) }})
                </span>
                <span v-if="item.star > 0" class="text-yellow-300 flex items-center">
                  (<icon name="material-symbols:star" size="15" />
                  {{ stat.damage.star }})
                </span>
              </span>
            </p>
            <p v-if="stat.def && stat.def.main > 0" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="material-symbols:shield" size="16" class="text-green-500" />
                <span>Phòng ngự: {{ Math.round(stat.def.main) }}</span>
                <span v-if="item.enhance" class="text-green-300 flex items-center">
                  (Cường hoá + {{ Math.round(stat.def.enhance) }})
                </span>
                <span v-if="item.star > 0" class="text-yellow-300 flex items-center">
                  (<icon name="material-symbols:star" size="15" />
                  {{ stat.def.star }})
                </span>
              </span>
            </p>
            <p v-if="stat.hp && stat.hp.main > 0" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="mdi:cards-heart" size="16" class="text-red-500" />
                <span> Sinh lực: {{ Math.round(stat.hp.main) }}</span>
                <span v-if="item.enhance" class="text-green-300 flex items-center">
                  (Cường hoá + {{ Math.round(stat.hp.enhance) }})
                </span>
                <span v-if="item.star > 0" class="text-yellow-300 flex items-center">
                  (<icon name="material-symbols:star" size="15" />
                  {{ stat.hp.star }})
                </span>
              </span>
            </p>
            <p v-if="stat.critical && stat.critical.main > 0" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="game-icons:pointy-sword" size="16" class="text-yellow-300" />
                <span>Bạo kích: {{ Math.round(stat.critical.main) }}%</span>
                <span v-if="item.enhance" class="text-green-300 flex items-center">
                  (Cường hoá + {{ Math.round(stat.critical.enhance) }})
                </span>
                <span v-if="item.star > 0" class="text-yellow-300 flex items-center">
                  (<icon name="material-symbols:star" size="15" />
                  {{ stat.critical.star }})
                </span>
              </span>
            </p>
            <p v-if="stat.bloodsucking && stat.bloodsucking.main > 0" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="game-icons:bloody-sword" size="16" class="text-[#ec4899]" />
                <span>Hút sinh lực: {{ Math.round(stat.bloodsucking.main) }}%</span>
                <span v-if="item.enhance" class="text-green-300 flex items-center">
                  (Cường hoá + {{ Math.round(stat.bloodsucking.enhance) }})
                </span>
                <span v-if="item.star > 0" class="text-yellow-300 flex items-center">
                  (<icon name="material-symbols:star" size="15" />
                  {{ stat.bloodsucking.star }})
                </span>
              </span>
            </p>
          </div>
        </div>
        <div class="mx-2 my-2 text-10 text-center w-full">
          -------Đá hồn--------
        </div>
        <div v-if="item?.gems.length > 0" class="mx-2 max-h-[250px] overflow-auto">
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
    <div v-if="action" class="flex justify-center my-4">
      <div>
        <var-button
          v-if="sellAction"
          class="!text-[#333] font-medium mx-2"
          size="small"
          @click.stop="sellPopup = true"
        >
          Treo bán
        </var-button>
        <var-button
          v-if="!propItem.used" class="!text-[#333] font-medium font-semibold uppercase"
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
