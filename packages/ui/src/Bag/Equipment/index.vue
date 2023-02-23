<script setup lang="ts">
import { set } from '@vueuse/core'
import { useFetch } from '#app'
import { randomNumber } from '~/common'
import { tips } from '~/constants'

const { data: equipments, pending, refresh } = useFetch('/api/bag/equipments')
const show = ref(false)

const onchangeEquip = () => {
  refresh()
  set(show, false)
}
</script>

<template>
  <var-loading :loading="pending" :description="tips[Math.round(randomNumber(0, tips.length))]" size="mini" color="#ffffff">
    <div v-if="pending" h="50" w="100" />
    <div
      v-else
      class="grid-cols-3 grid gap-2"
    >
      <bag-equipment-item
        v-for="equipment in equipments"
        :key="equipment?._id"
        :equipment="equipment"
        @onchange-equip="onchangeEquip"
      />
    </div>
  </var-loading>
</template>
