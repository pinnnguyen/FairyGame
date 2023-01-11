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
    <div ref="target" class="relative text-xs leading-6 text-white bg-[#31384f] p-0 border !border-[#795548] w-[320px]">
      <div class="p-3">
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
          <ButtonConfirm v-if="!hasEquip(item.slot, item._id)" @click.stop="doEquip">
            <svg v-if="loading" class="inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="z-9">Trang bị</span>
          </ButtonConfirm>
          <ButtonConfirm v-else @click.stop="doUnEquip">
            <svg v-if="loading" class="inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="z-9">Tháo trang bị</span>
          </ButtonConfirm>
        </div>
      </div>
    </div>
  </Blocker>
</template>
