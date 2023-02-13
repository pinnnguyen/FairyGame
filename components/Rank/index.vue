<script setup lang="ts">
import { randomNumber } from '~/common'
import { tips } from '~/constants'

const { data: ranks, pending } = useFetch('/api/rank')
const options = reactive({
  sid: '',
  toggle: false,
})

const playerPreview = (sid: string) => {
  if (!sid)
    return

  options.toggle = true
  options.sid = sid
}
</script>

<template>
  <player-preview
    :sid="options.sid"
  />
  <var-loading :loading="pending" size="mini" :description="tips[Math.round(randomNumber(0, tips.length))]" color="#ffffff">
    <div
      v-for="rank in ranks"
      :key="rank._id"
      pos="relative"
      border="1 white/40 rounded"
      text="primary"
      p="2"
      m="2"
    >
      <rank-item
        :rank="rank"
        @click.stop="playerPreview(rank.sid)"
      />
    </div>
  </var-loading>
</template>
