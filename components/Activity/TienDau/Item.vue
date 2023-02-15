<script setup lang="ts">
import { formatCash, playerTitle } from '~/common'
const props = defineProps<{
  pos: number
  rank: any
  reachLimit: boolean
}>()

const { sid } = usePlayerStore()

const { $io } = useNuxtApp()
const war = (defenderSid: string) => {
  if (props.reachLimit)
    return

  useState('isArena').value = true
  $io.emit('arena:pvp:solo', {
    attackerSid: sid,
    defenderSid,
    pos: props.pos,
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
    >
      <div
        text="12"
        font="bold"
      >
        {{ rank.name }} - <span text="10">{{ getPlayerTitle.levelTitle }} {{ getPlayerTitle.floor }}</span>
      </div>
      <div text="10">
        Tiên lực: {{ formatCash(rank.power) }}
      </div>
      <div v-if="rank?.arenas?.tienDau?.pos" text="10">
        Xếp hạng: {{ rank?.arenas?.tienDau?.pos }}
      </div>
      <div v-else text="10">
        Xếp hạng: Chưa có
      </div>
    </div>
    <div m="t-2" pos="absolute" right="2" top="[20%]">
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
