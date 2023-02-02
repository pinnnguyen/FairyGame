<script setup lang="ts">
import { set } from '@vueuse/core'
import type { PlayerEquipment } from '~/types'
import { useFetch } from '#app'
import { qualityPalette } from '~/common'

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
      class="grid-cols-6 grid gap-1 overflow-auto max-h-[88%] scrollbar-hide"
    >
      <lazy-item-rank
        v-for="equipment in equipments"
        :key="equipment?._id"
        :preview="equipment?.preview"
        :rank="equipment?.rank"
        :quality="equipment.quality"
        :quantity="0"
        class="w-12"
        @click.stop="pickEquipItem(equipment)"
      >
        <p
          class="text-10 font-semibold line-clamp-1" :style="{
            color: qualityPalette(equipment.quality),
          }"
        >
          {{ equipment?.name }}
        </p>
      </lazy-item-rank>
    </div>
  </var-loading>
</template>
