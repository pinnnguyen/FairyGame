<script setup>
import { set } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'
import { formatCash } from '~/common'

const emits = defineEmits(['close'])
const { upgrade, playerInfo } = storeToRefs(usePlayerStore())
const { loadPlayer } = usePlayerStore()

const tupoResponse = ref({})
const loading = ref(false)
const playerBefore = ref()
const playerAfter = ref()

const doUpgrade = async () => {
  try {
    tupoResponse.value = await $fetch('/api/breakthrough', {
      method: 'POST',
      body: {
        sid: playerInfo.value.sid,
      },
    })

    if (tupoResponse.value?.playerBefore)
      loadPlayer(tupoResponse.value?.playerBefore)

    sendMessage(tupoResponse.value.message)
    set(playerBefore, tupoResponse.value?.playerBefore)
    set(playerAfter, tupoResponse.value?.playerAfter)
  }
  catch (err) {
    sendMessage(err.message)
  }
}

const close = () => {
  emits('close')
}
</script>

<template>
  <div class="flex ml-2">
    <div>
      <div>Tiêu phí tu vi: <span class="text-8">{{ formatCash(playerInfo.exp) }}/{{ formatCash(playerInfo.expLimited) }}</span></div>
      <div>Đột phá thành công: 50%</div>
      <div>Tổn thất: 0%</div>
    </div>
    <div>
      <button
        class="mx-2 h-10 w-10 shadow rounded text-12 font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu"
        @click.stop="doUpgrade"
      >
        Đột phá
      </button>
    </div>
  </div>
</template>
