<script setup lang="ts">
import { usePlayerStore } from '#imports'
import { randomNumber } from '~~/common'
import { tips } from '~/constants'

const emits = defineEmits(['close'])
const { sid } = storeToRefs(usePlayerStore())

const now = new Date().getTime()
const { $io } = useNuxtApp()
const tab = ref('market')

const typeTab = ref('equipment')
const typeTabItems = [
  {
    key: 'item',
    name: 'Vật phẩm',
  },
  {
    key: 'equipment',
    name: 'Trang bị',
  },
  {
    key: 'gem',
    name: 'Đá hồn',
  },
]

const { data: marketItems, pending, refresh } = useFetch('/api/market')

const markets = computed(() => {
  if (!marketItems.value)
    return []

  return marketItems.value.filter((m: { type: string }) => {
    return m.type === typeTab.value
  })
})

const callBackBuy = () => {
  refresh()
}

const gemTab = computed(() => typeTab.value === 'gem')
const itemTab = computed(() => typeTab.value === 'item')
const equipTab = computed(() => typeTab.value === 'equipment')
</script>

<template>
  <div class="h-full">
    <div
      p="2"
    >
      <button
        v-for="n in typeTabItems"
        :key="n.key"
        :class="{ '!opacity-100 !text-[#4add3b]': n.key === typeTab }"
        transition="~ opacity duration-800"
        m="x-2"
        w="16"
        h="8"
        font="italic bold leading-3"
        opacity="40"
        border="rounded 1 white/40"
        text="primary"
        @click.stop="typeTab = n.key"
      >
        {{ n.name }}
      </button>
    </div>
    <var-loading :loading="pending" :description="tips[Math.round(randomNumber(0, tips.length))]" size="mini" color="#ffffff">
      <div v-if="pending" h="50" w="50" />
      <MarketGems
        v-if="gemTab" :gems="markets" @buy="callBackBuy"
      />
      <MarketItems
        v-if="itemTab" :items="markets" @buy="callBackBuy"
      />
      <MarketEquipments
        v-if="equipTab" :equipments="markets" @buy="callBackBuy"
      />
    </var-loading>
  </div>
</template>
