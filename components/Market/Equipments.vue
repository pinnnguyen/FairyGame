<script setup lang="ts">
import { Dialog } from '@varlet/ui'
import { qualityToName, slotToName } from '../../constants'
import { qualityPalette } from '~/common'

defineProps<{
  equipments: any
}>()

const emits = defineEmits(['buy'])
const show = ref(false)
const equipItemSelected = ref({})
const onItemSelected = (equipment: any) => {
  equipItemSelected.value = equipment.record
  show.value = true
}

const buy = (equipment: any) => {
  Dialog({
    title: 'Nhắc nhở',
    message: `Bạn có chắc muốn mua ${equipment.record.name}`,
    confirmButtonText: 'Chắc chắn',
    cancelButtonText: 'Không chắc',
    dialogClass: '!bg-[#00000040] text-white border border-white/10 italic',
    confirmButtonColor: '#FFF',
    confirmButtonTextColor: '#333',
    cancelButtonTextColor: '#d2d2d2',
    onConfirm: async () => {
      try {
        const buyRes: { success: boolean; message: string } = await $fetch('/api/market/buy', {
          method: 'POST',
          body: {
            _id: equipment._id,
            name: equipment.record.name,
          },
        })

        sendNotification(buyRes.message, 2000)
        if (buyRes.success)
          emits('buy')
      }
      catch (e: any) {
        sendNotification(e.statusMessage, 2000)
      }
    },
  })
}
</script>

<template>
  <var-popup v-model:show="show" position="center">
    <equipment-detail
      :equipment="equipItemSelected"
    />
  </var-popup>
  <div class="overflow-auto scrollbar-hide p-4">
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="equipment in equipments"
        :key="equipment._id"
        class="rounded p-2"
        :style="{
          border: `1px solid ${qualityPalette(equipment?.record?.quality)}`,
        }"
        @click.stop="onItemSelected(equipment)"
      >
        <market-name :quality="equipment?.record?.quality">
          [{{ slotToName[equipment?.record?.slot] }}]
          {{ qualityToName[equipment?.record?.quality] }} - {{ equipment?.record?.name }} (+{{ equipment?.record?.enhance }})
        </market-name>
        <div
          flex="~ "
        >
          <icon v-for="i of equipment?.record?.star" :key="i" name="material-symbols:star" size="10" />
        </div>
        <market-owner>
          (NB: {{ equipment.player.name }})
        </market-owner>
        <market-price>
          {{ equipment.price }}
        </market-price>
        <div class="text-center">
          <button
            class="px-2 py-[2px] shadow rounded text-10 font-semibold !text-white bg-[#841919] italic w-full"
            @click.stop="buy(equipment)"
          >
            Mua
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
