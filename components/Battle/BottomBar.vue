<script setup lang="ts">
import { set } from '@vueuse/core'
import { useBattleRoundStore } from '~/composables/useBattleRound'
import { sendMessage } from '~/composables/useMessage'

defineProps<{
  isPve?: boolean
  midId?: number
  warNotice?: boolean
}>()

const emits = defineEmits(['changeBattle'])
const { loading } = storeToRefs(useBattleRoundStore())
const { loadPlayer } = usePlayerStore()

const showTopDmg = ref(false)

const { fn } = useBattleRoundStore()
const changeBattle = async () => {
  try {
    // const player = await $fetch('/api/mid')
    // console.log('player', player)

    set(loading, true)
    const player = await $fetch('/api/mid/set', {
      method: 'POST',
    })

    fn.stopBattle()
    loadPlayer(player)
    set(loading, false)
    sendMessage('Qua ải thành công', 2000)
    emits('changeBattle')
  }
  catch (e: any) {
    sendMessage(e.statusMessage, 2000)
    set(loading, false)
  }
}
</script>

<template>
  <var-popup v-model:show="showTopDmg" position="bottom">
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
</template>
