<script setup>
import { set } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendNotification } from '~/composables/useNotification'
import { formatCash, playerTitle } from '~/common'

const { upgrade, playerInfo } = storeToRefs(usePlayerStore())
const { loadPlayer } = usePlayerStore()

const { $io } = useNuxtApp()
const tupoResponse = ref({})
const loading = ref(false)
const playerBefore = ref()
const playerAfter = ref()
const change = ref(false)

const cPlayerTitle = computed(() => {
  return playerTitle(playerInfo.value?.level, playerInfo.value?.level + 1)
})

const doUpgrade = async () => {
  loading.value = true

  try {
    tupoResponse.value = await $fetch('/api/breakthrough', {
      method: 'POST',
      body: {
        sid: playerInfo.value.sid,
      },
    })

    if (tupoResponse.value?.playerBefore)
      loadPlayer(tupoResponse.value?.playerBefore)

    if (tupoResponse.value.status)
      set(change, true)

    sendNotification(tupoResponse.value.message, 3000)
    set(playerBefore, tupoResponse.value?.playerBefore)
    set(playerAfter, tupoResponse.value?.playerAfter)
    loading.value = false
  }
  catch (err) {
    sendNotification(err.message)
  }
}
</script>

<template>
  <var-popup v-model:show="change">
    <div
      text="10"
      class="w-70 border border-white/20 bg-primary p-4"
    >
      <Line class="pb-4">
        <div class="whitespace-nowrap">
          Thuộc tính tăng
        </div>
      </Line>
      <div class="flex items-center justify-between leading-5">
        <div class="flex flex-col">
          <span>
            Công kích {{ playerAfter?.attribute?.damage }}
          </span>
          <span>
            HP {{ playerAfter?.attribute?.hp }}
          </span>
          <span>
            Thủ {{ playerAfter?.attribute?.def }}
          </span>
        </div>
        <div class="flex flex-col text-green-400">
          <span>
            Công kích {{ playerBefore?.attribute?.damage }}
          </span>
          <span>
            HP {{ playerBefore?.attribute?.hp }}
          </span>
          <span>
            Thủ {{ playerBefore?.attribute?.def }}
          </span>
        </div>
      </div>
    </div>
  </var-popup>
  <div
    text="10"
    class="flex ml-2"
  >
    <div>
      <div>
        Tiêu phí tu vi:
        <span class="text-8">{{ formatCash(playerInfo?.exp) }}/{{ formatCash(playerInfo?.expLimited) }}</span>
      </div>
      <div>Tiêu hao tiền tiên: <span class="text-8">{{ formatCash(upgrade?.condition?.needGold) }}</span></div>
      <div>Đột phá thành công: {{ upgrade?.condition?.rate }}%</div>
      <div>Tổn thất: 0%</div>
    </div>
    <div>
      <button
        :disabled="loading"
        :class="{ 'opacity-40': loading }"
        class="italic mx-2 h-10 w-10 shadow rounded text-12 font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu"
        @click.stop="doUpgrade"
      >
        Đột phá
      </button>
    </div>
  </div>
  <div class="text-center">
    Đột phá {{ cPlayerTitle?.levelTitle }} {{ cPlayerTitle?.floor }}
  </div>
</template>
