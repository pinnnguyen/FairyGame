<script setup lang="ts">
import type { PlayerEquipment } from '~/types'
import { EQUIPMENT_SLOT } from '~/constants'
import { usePlayerStore } from '~/composables/usePlayer'

interface Prop {
  item: PlayerEquipment
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
  <div class="relative text-xs leading-6 text-white bg-[#1d160e] rounded p-0 border !border-[#795548] w-[320px]">
    <div class="p-3 text-10 font-medium">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center justify-center">
          <item-rank class="w-15" :quantity="0" :rank="item.rank" :preview="item?.preview" />
        </div>
        <div class="mx-2">
          <div class="text-14">
            {{ item.name }} + {{ item.enhance }}
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
                +
                <span class="text-green-500">{{ stat.speed.enhance }}</span>
                ({{ stat.speed.main + stat.speed.enhance }})
              </span>
            </p>
            <p v-if="stat.damage" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="material-symbols:swords" size="16" class="text-rose-600" />
                <span>Công kích: {{ stat.damage.main }}</span>
                +
                <span class="text-green-500">{{ stat.damage.enhance }}</span>
                ({{ stat.damage.main + stat.damage.enhance }})
              </span>
            </p>
            <p v-if="stat.def" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="material-symbols:shield" size="16" class="text-green-500" />
                <span>Phòng ngự: {{ stat.def.main }}</span>
                +
                <span class="text-green-500">{{ stat.def.enhance }}</span>
                ({{ stat.def.main + stat.def.enhance }})
              </span>
            </p>
            <p v-if="stat.hp" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="mdi:cards-heart" size="16" class="text-red-500" />
                <span> Sinh lực: {{ stat.hp.main }}</span>
                +
                <span class="text-green-500">{{ stat.hp.enhance }}</span>
                ({{ stat.hp.main + stat.hp.enhance }})
              </span>
            </p>
            <p v-if="stat.critical" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="game-icons:pointy-sword" size="16" class="text-yellow-300" />
                <span>Bạo kích: {{ stat.critical.main }}</span>
                +
                <span class="text-green-500">{{ stat.critical.enhance }}</span>
                ({{ stat.critical.main + stat.critical.enhance }})
              </span>
            </p>
            <p v-if="stat.bloodsucking" class="flex justify-between">
              <span class="flex items-center gap-2">
                <Icon name="game-icons:bloody-sword" size="16" class="text-[#ec4899]" />
                <span>Hút máu: {{ stat.bloodsucking.main }}</span>
                +
                <span class="text-green-500">{{ stat.bloodsucking.enhance }}</span>
                ({{ stat.bloodsucking.main + stat.bloodsucking.enhance }})
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-center mb-2">
        <div class="mt-4">
          <var-button v-if="!propItem.used" class="!text-[#333] font-medium font-semibold uppercase" color="#ffd400" size="small" @click.stop="doEquip">
            Trang bị
          </var-button>
          <Button v-else class="!text-[#333] font-medium uppercase" size="small" @click.stop="doUnEquip">
            Tháo trang bị
          </Button>
        </div>
      </div>
    </div>
    <div class="border-t py-2 w-[75%] m-auto">
      <span>Cấp độ sử dụng: {{ item.level }}</span>
    </div>
  </div>
</template>
