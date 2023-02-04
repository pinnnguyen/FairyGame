<script setup lang="ts">
import { set } from '@vueuse/core'
import type { PlayerEquipment } from '~/types'
import { useFetch } from '#app'
import { qualityPalette } from '~/common'
import { QUALITY_TITLE } from '~/constants'

const { data: equipments, pending, refresh } = await useFetch('/api/bag/equipments')
const equipItemSelected = ref<PlayerEquipment>()
const show = ref(false)
const pickEquipItem = (item: PlayerEquipment) => {
  set(equipItemSelected, item)
  set(show, true)
}

const onchangeEquip = () => {
  refresh()
  set(show, false)
}
</script>

<template>
  <var-popup v-model:show="show" position="center">
    <bag-equip-detail
      :item="equipItemSelected"
      :action="true"
      :sell-action="true"
      @refresh="onchangeEquip"
      @changeEquip="onchangeEquip"
    />
  </var-popup>
  <var-loading :loading="pending" description="Đang tải trang bị" color="#333">
    <div
      v-if="equipments.length > 0"
      class="grid-cols-3 grid gap-2"
    >
      <div
        v-for="equipment in equipments"
        :key="equipment?._id"
        class="rounded p-2"
        :style="{
          border: `1px solid ${qualityPalette(equipment.quality)}`,
        }"
        @click.stop="pickEquipItem(equipment)"
      >
        <div
          class="text-10 font-bold"
          :style="{
            color: qualityPalette(equipment.quality),
          }"
        >
          {{ `${QUALITY_TITLE[equipment.quality ?? 1]} -` }} {{ equipment?.name }}
        </div>
      </div>
    </div>
  </var-loading>
</template>
