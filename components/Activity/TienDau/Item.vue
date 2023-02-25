<script setup lang="ts">
import { set } from '@vueuse/core'
import { formatCash, playerTitle } from '~/common'
import { BATTLE_KIND } from '~/constants'

const props = defineProps<{
  pos: number
  rank: any
  reachLimit?: boolean
  enableAction?: boolean
  enableRank?: boolean
}>()

const { sid } = usePlayerStore()
const { $io } = useNuxtApp()
const war = (defenderSid: string) => {
  if (props.reachLimit)
    return

  set(useState('arena'), BATTLE_KIND.ARENA_SOLO_PVP)
  $io.emit('arena:pvp:solo', {
    attackerSid: sid,
    defenderSid,
  })
}

const getPlayerTitle = computed(() => {
  return playerTitle(props?.rank.level, props.rank?.level + 1)
})
</script>

<template>
  <section
    flex="~ "
  >
    <div
      p="1"
      w="full"
    >
      <div
        text="12"
        font="bold"
      >
        {{ rank.name }} - <span text="10">{{ getPlayerTitle.levelTitle }} {{ getPlayerTitle.floor }}</span>
      </div>
      <div text="10">
        Tiên lực: {{ formatCash(rank?.power) }}
      </div>
      <div text="10" gap="2" flex="~ " justify="between">
        <div>
          Điểm: {{ rank?.arenas?.tienDau?.pos ?? 0 }}
        </div>
        <div v-if="enableRank">
          Xếp hạng: {{ pos }}
        </div>
      </div>
    </div>
    <div v-if="enableAction" m="t-2" pos="absolute" right="2" top="[20%]">
      <var-button
        v-if="sid !== rank.sid"
        :disabled="reachLimit"
        class="!text-[#333]"
        size="mini"
        font="semibold italic"
        @click.stop="war(rank.sid)"
      >
        Khiêu chiến
      </var-button>
    </div>
  </section>
</template>
