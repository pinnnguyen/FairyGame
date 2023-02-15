<script setup lang="ts">
import { randomNumber } from '~/common'
import { tips } from '~/constants'

const { sid, playerInfo } = storeToRefs(usePlayerStore())
const refreshArena = useState('refreshArena')
const { data: ranks, pending, refresh } = useFetch<any>('/api/arena/tienDau')
const options = reactive({
  sid: '',
  toggle: false,
})

watch(refreshArena, () => {
  refresh()
})
const playerPreview = (sid: string) => {
  if (!sid)
    return

  options.toggle = true
  options.sid = sid
}

const reachLimit = computed(() => ranks.value.reachLimit?.remaining >= ranks.value.reachLimit?.maximum)
</script>

<template>
  <player-preview
    :sid="options.sid"
  />
  <var-loading :loading="pending" size="mini" :description="tips[Math.round(randomNumber(0, tips.length))]" color="#ffffff">
    <div
      m="x-4 t-2"
      flex="~ "
      justify="between"
    >
      <div>Điểm Tiên Đấu: {{ playerInfo.arenas.tienDau.score ?? 0 }}</div>
      <div>Lượt: {{ ranks.reachLimit?.remaining }}/{{ ranks.reachLimit?.maximum }}</div>
    </div>
    <div
      v-for="(rank, index) in ranks.data"
      :key="rank._id"
      pos="relative"
      border="1 white/40 rounded"
      text="primary"
      p="2"
      m="x-4 y-2"
      :class="{
        '!border-green-400': sid === rank.sid,
      }"
    >
      <activity-tien-dau-item
        :rank="rank"
        :pos="index + 1"
        :reach-limit="reachLimit"
        @click.stop="playerPreview(rank.sid)"
      />
    </div>
  </var-loading>
</template>
