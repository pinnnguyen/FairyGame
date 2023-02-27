<script setup lang="ts">
import { mapConfig, receviedBaseExpOrGold } from '@game/config'
import { ItemToName } from '~/constants'

const emits = defineEmits(['changeBattle'])
const { mids } = storeToRefs(usePlayerStore())
const { loadPlayer } = usePlayerStore()
const { loading } = storeToRefs(useBattleRoundStore())
const { fn } = useBattleRoundStore()
const { data: maps } = useFetch('/api/mid')

const currentMap = computed(() => {
  if (!maps.value)
    return []
  return maps.value.filter(m => m.map === mids.value?.current?.map)
})

const current = computed(() => {
  return mapConfig.find(m => m.key === mids.value?.current?.map)
})

const goTo = async (midId: number) => {
  const player = await $fetch('/api/mid/set', {
    method: 'POST',
    body: {
      midId,
    },
  })

  fn.stopBattle()
  loadPlayer(player)
  sendNotification('Di chuyển bản đồ thành công', 2000)
  emits('changeBattle')
}
</script>

<template>
  <div overflow="scroll" bg="[#191b1e]" max-w="[70vh]" h="[70vh]" m="auto" p="2">
    <Line text="primary 10" m="b-2">
      Bản đồ thế giới
    </Line>
    <div h="20" overflow="auto">
      <div grid="~ cols-3" gap="4">
        <common-tab
          :default="current?.key"
          :tab-items="mapConfig"
        />
      </div>
    </div>
    <div m="t-4" class="h-[calc(100%_-_310px)]">
      <Line text="primary 10" m="b-2">
        Người chơi
      </Line>
    </div>
    <div m="t-4 x-2" class="h-[calc(100%_-_320px)]" overflow="scroll">
      <Line text="primary 10" m="b-2">
        Khu vực
      </Line>
      <div grid="~ cols-3" gap="4">
        <div
          v-for="m in currentMap"
          :key="m._id"
          border="1 white/40 rounded"
          text="primary 10"
          p="2"
          opacity="40"
          :class="{ '!opacity-100': m.id <= mids?.current?.id, 'border 1 !border-green-500': m.id === mids?.current?.id }"
          @click.stop="goTo(m.id)"
        >
          <div flex="~ " justify="between" align="items-center">
            {{ m.name }}
            <var-chip v-if="m.isPvp" size="mini" type="primary">
              X2
            </var-chip>
            <var-chip v-if="m.isPvp" size="mini" type="danger">
              PVP
            </var-chip>
          </div>
          <template v-if="m.isPvp">
            <div v-for="(r, key) in m.reward.base" :key="key">
              {{ ItemToName[key] }} ~{{ receviedBaseExpOrGold(key, r * 2) }}
            </div>
          </template>
          <template v-else>
            <div v-for="(r, key) in m.reward.base" :key="key">
              {{ ItemToName[key] }} ~{{ receviedBaseExpOrGold(key, r) }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
