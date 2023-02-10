<script setup lang="ts">
import { set } from '@vueuse/core'
import { useBattleRoundStore } from '~/composables/useBattleRound'
import { sendMessage } from '~/composables/useMessage'

defineProps<{
  isPve: boolean
  midId: number
}>()

const emits = defineEmits(['changeBattle'])
const { loading } = storeToRefs(useBattleRoundStore())
const { loadPlayer } = usePlayerStore()
const { fn } = useBattleRoundStore()
const changeBattle = async () => {
  try {
    set(loading, true)
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
    })

    fn.stopBattle()
    emits('changeBattle')
    loadPlayer(player)
    set(loading, false)
    sendMessage('Qua ải thành công', 2000)
  }
  catch (e) {
    sendMessage('Hãy vượt ải trước đó để tiếp tục', 2000)
    set(loading, false)
  }
}
</script>

<template>
  <var-loading v-if="isPve" size="mini" color="#ffffff">
    <div
      v-if="midId"
      text="10"
      flex="~ "
      align="items-center"
    >
      <span
        m="x-2"
      >
        Hiện tại: thứ {{ midId }} Ải
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
  </var-loading>
</template>
