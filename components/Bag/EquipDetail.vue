<script setup lang="ts">
import type { PlayerEquipment } from '~/types'
import { EQUIPMENT_SLOT } from '~/constants'
import { usePlayerStore } from '~/composables/usePlayer'

interface Prop {
  item: PlayerEquipment
  action?: boolean
}

const props = defineProps<Prop>()
const emits = defineEmits(['close', 'changeEquip'])

const { getPlayer } = usePlayerStore()
const loading = ref(false)
const propItem = ref(props.item)

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
  await getPlayer()
}
</script>

<template>
  <div class="relative leading-6 text-white bg-[#252c47] p-0 w-[calc(100vw_-_40px)]">
    <div class="p-3 text-12 font-medium">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center justify-center">
          <item-rank class="w-15" :quantity="0" :rank="item.rank" :preview="item?.preview" />
        </div>
        <div class="mx-2">
          <div class="text-14">
            {{ item.name }} + <span class="text-16">{{ item.enhance }}</span>
          </div>
          <div class="flex">
            <icon v-for="i of item.star" :key="i" class="text-yellow-300" name="material-symbols:star" size="18" />
          </div>
          <div>
            Vị trí: {{ EQUIPMENT_SLOT[item.slot] }}
          </div>
          <div>Bậc {{ item.rank }}</div>
        </div>
      </div>
      <div class="flex flex-col items-start justify-start">
        <div class="mx-2">
          <div v-for="(stat, index) in item.stats" :key="index">
            <p v-if="stat.speed" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="mdi:bow-arrow" size="16" class="text-[#a855f7]" />
                <span>Tốc độ: {{ stat.speed.main }}</span>
                <span class="text-green-500 flex items-center">
                  <icon name="game-icons:sword-in-stone" size="15" />
                  {{ stat.speed.enhance }}
                </span>
                <span v-if="item.star! > 0" class="text-yellow-300 flex items-center">
                  <icon name="material-symbols:star" size="15" />
                  {{ stat.speed.star }}
                </span>
                <span>
                  ({{ stat.speed?.main + stat.speed?.enhance + (stat.speed?.star ?? 0) }})
                </span>
              </span>
            </p>
            <p v-if="stat.damage" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="material-symbols:swords" size="16" class="text-rose-600" />
                <span>Công kích: {{ stat.damage.main }}</span>
                <span class="text-green-500 flex items-center">
                  <icon name="game-icons:sword-in-stone" size="15" />
                  {{ stat.damage.enhance }}
                </span>
                <span v-if="item.star! > 0" class="text-yellow-300 flex items-center">
                  <icon name="material-symbols:star" size="15" />
                  {{ stat.damage.star }}
                </span>
                ({{ stat.damage?.main + stat.damage?.enhance + (stat.damage?.star ?? 0) }})
              </span>
            </p>
            <p v-if="stat.def" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="material-symbols:shield" size="16" class="text-green-500" />
                <span>Phòng ngự: {{ stat.def.main }}</span>
                <span class="text-green-500 flex items-center">
                  <icon name="game-icons:sword-in-stone" size="15" />
                  {{ stat.def.enhance }}
                </span>
                <span v-if="item.star! > 0" class="text-yellow-300 flex items-center">
                  <icon name="material-symbols:star" size="15" />
                  {{ stat.def.star }}
                </span>
                ({{ stat.def?.main + stat.def?.enhance + (stat.def?.star ?? 0) }})
              </span>
            </p>
            <p v-if="stat.hp" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="mdi:cards-heart" size="16" class="text-red-500" />
                <span> Sinh lực: {{ stat.hp.main }}</span>
                <span class="text-green-500 flex items-center">
                  <icon name="game-icons:sword-in-stone" size="15" />
                  {{ stat.hp.enhance }}
                </span>
                <span v-if="item.star! > 0" class="text-yellow-300 flex items-center">
                  <icon name="material-symbols:star" size="15" />
                  {{ stat.hp.star }}
                </span>
                ({{ stat.hp?.main + stat.hp?.enhance + (stat.hp?.star ?? 0) }})
              </span>
            </p>
            <p v-if="stat.critical" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="game-icons:pointy-sword" size="16" class="text-yellow-300" />
                <span>Bạo kích: {{ stat.critical.main }}</span>
                <span class="text-green-500 flex items-center">
                  <icon name="game-icons:sword-in-stone" size="15" />
                  {{ stat.critical.enhance }}
                </span>
                <span v-if="item.star! > 0" class="text-yellow-300 flex items-center">
                  <icon name="material-symbols:star" size="15" />
                  {{ stat.critical.star }}
                </span>
                ({{ stat.critical?.main + stat.critical?.enhance + (stat.critical?.star ?? 0) }})
              </span>
            </p>
            <p v-if="stat.bloodsucking" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="game-icons:bloody-sword" size="16" class="text-[#ec4899]" />
                <span>Hút máu: {{ stat.bloodsucking.main }}</span>
                <span class="text-green-500 flex items-center">
                  <icon name="game-icons:sword-in-stone" size="15" />
                  {{ stat.bloodsucking.enhance }}
                </span>
                <span v-if="item.star! > 0" class="text-yellow-300 flex items-center">
                  <icon name="material-symbols:star" size="15" />
                  {{ stat.bloodsucking.star }}
                </span>
                ({{ stat?.bloodsucking?.main + stat?.bloodsucking?.enhance + (stat.bloodsucking?.star ?? 0) }})
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="action" class="flex justify-center my-4">
      <div>
        <var-button v-if="!propItem.used" class="!text-[#333] font-medium font-semibold uppercase" color="#ffd400" size="small" @click.stop="doEquip">
          Trang bị
        </var-button>
        <var-button v-else class="!text-[#333] font-medium uppercase" size="small" @click.stop="doUnEquip">
          Tháo trang bị
        </var-button>
      </div>
    </div>
    <div class="border-t py-2 w-[75%] m-auto text-12 py-4">
      <span>Cấp độ sử dụng: {{ item.level }}</span>
    </div>
  </div>
</template>
