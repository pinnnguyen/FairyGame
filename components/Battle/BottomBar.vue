<script setup lang="ts">
import { mapConfig } from '@game/config'

defineProps<{
  isPve?: boolean
  mid?: {}
  warNotice?: boolean
}>()

const emits = defineEmits(['changeBattle'])
const { loading } = storeToRefs(useBattleRoundStore())

const { loadPlayer } = usePlayerStore()
const showTopDmg = ref(false)

const { fn } = useBattleRoundStore()
const changeBattle = async () => {
  try {
    set(loading, true)
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
    })

    fn.stopBattle()
    loadPlayer(player)
    set(loading, false)
    sendNotification('Di chuyển bản đồ thành công', 2000)
    emits('changeBattle')
  }
  catch (e: any) {
    sendNotification(e.statusMessage, 2000)
    set(loading, false)
  }
}
</script>

<template>
  <var-popup v-model:show="showTopDmg" position="bottom" :overlay="false">
    <battle-top-d-m-g />
  </var-popup>
  <div
    v-if="warNotice"
    text="10"
    flex="~ "
    align="items-center"
  >
    <button
      h="6"
      p="x-2"
      m="l-1 x-2"
      border="rounded"
      text="10 white"
      font="semibold italic"
      class="bg-[#841919]"
      @click.stop="showTopDmg = true"
    >
      Chiến báo
    </button>
  </div>
  <div
    v-if="isPve"
    text="10"
    flex="~ "
    m="x-2"
    align="items-center"
    w="full"
    justify="between"
  >
    <div>
      {{ mapConfig.find(m => m.key === mid?.current?.map).name }}
    </div>
    <div>
      <span
        m="x-2"
      >
        {{ mid?.current?.name }}
      </span>
      <button
        h="6"
        p="x-2"
        m="l-1 x-2"
        border="rounded"
        text="10 white"
        font="semibold italic"
        class="bg-[#841919]"
        @click.stop="changeBattle"
      >
        Khiêu chiến
      </button>
    </div>
  </div>
</template>
