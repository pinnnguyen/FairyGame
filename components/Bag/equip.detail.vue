<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import type { PlayerEquipment } from '~/types'
import { EQUIPMENT_SLOT } from '~/constants'
import { usePlayerStore } from '~/composables/usePlayer'

interface Prop {
  item: PlayerEquipment
}

const props = defineProps<Prop>()
const emits = defineEmits(['close'])
const { changeEquip, hasEquip } = usePlayerStore()
const loading = ref(false)

const target = ref(null)
onClickOutside(target, () => {
  console.log('click')
  emits('close')
})

const doEquip = async () => {
  const _id = props.item._id
  loading.value = true
  const equipDataRes = await $fetch('/api/player/equip', {
    headers: (useRequestHeaders(['cookie']) as any),
    method: 'POST',
    body: {
      _equipId: _id,
      action: 'equip',
    },
  })

  if (equipDataRes.statusCode === 200)
    changeEquip(props.item?.slot, props.item?._id)

  loading.value = false
  emits('close')
}

const doUnEquip = async () => {
  const _id = props.item._id
  loading.value = true
  const equipDataRes = await $fetch('/api/player/equip', {
    headers: (useRequestHeaders(['cookie']) as any),
    method: 'POST',
    body: {
      _equipId: _id,
      action: 'unequip',
    },
  })

  if (equipDataRes.statusCode === 200)
    changeEquip(props.item?.slot, '')

  loading.value = false
  emits('close')
}
</script>

<template>
  <Blocker class="z-99">
    <div ref="target" class="relative text-xs leading-6 text-white bg-[#1d160e] rounded p-0 border !border-[#795548] w-[320px]">
      <div class="p-3 text-12 font-medium">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center justify-center">
            <ItemRank class="w-15" :quantity="0" :rank="item.rank" :preview="item?.preview" />
          </div>
          <div class="mx-2">
            <div>
              {{ item.name }}
            </div>
            <div>
              Vị trí: {{ EQUIPMENT_SLOT[item.slot] }}
            </div>
            <div>
              Đẳng cấp: {{ item.level }}
            </div>
          </div>
        </div>
        <div class="flex items-center justify-start">
          <div class="mx-2">
            <div class="flex justify-between">
              <span>
                Công kích: {{ item.damage }}
              </span>
            </div>
            <div class="flex justify-between">
              <span>Phòng ngự: {{ item.def }}</span>
            </div>
            <div class="flex justify-between">
              <span>Khí huyết: {{ item.hp ?? 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span>Bạo kích: {{ item.critical ?? 0 }}%</span>
            </div>
            <div class="flex justify-between">
              <span>Hút máu: {{ item.bloodsucking ?? 0 }}%</span>
            </div>
          </div>
        </div>
        <div class="flex justify-center mb-2">
          <div class="mt-4">
            <var-button v-if="!hasEquip(item.slot, item._id)" class="!text-[#333] font-medium" type="default" size="small" @click.stop="doEquip">
              Trang bị
            </var-button>
            <var-button v-else class="!text-[#333] font-medium" type="warning" size="small" @click.stop="doUnEquip">
              Tháo trang bị
            </var-button>
          </div>
        </div>
      </div>
    </div>
  </Blocker>
</template>
