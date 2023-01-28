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
    set(loading, true)
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
    set(loading, false)
  }
  catch (err) {
    sendMessage(err.message)
    set(loading, false)
  }
}

const close = () => {
  emits('close')
}
</script>

<template>
  <div class="p-4">
    <div class="flex flex-col items-center justify-center mb-1">
      <div class="text-center text-sm font-bold mb-2 uppercase">
        Đột phá cảnh giới
      </div>
    </div>
    <div class="flex justify-between">
      <div class="w-[48%]">
        <div class="border border-[#9e9e9e] rounded h-[35px] leading-[35px] text-center text-10">
          EXP {{ formatCash(playerInfo.exp) }}/{{ formatCash(playerInfo.expLimited) }}
        </div>
      </div>
      <div class="w-[48%]">
        <div class="border border-[#9e9e9e] rounded h-[35px] leading-[35px] text-center flex items-center justify-center text-10">
          <img class="w-[22px] pb-[2px] pr-[2px]" src="/items/3_s.png" alt=""> {{ formatCash(upgrade?.condition?.needGold) }} / {{ formatCash(playerInfo.gold) }}
        </div>
      </div>
    </div>
    <div class="mt-4" />
    <div class="text-center">
      <div class="text-center mb-4 text-14">
        {{ playerInfo.levelTitle }} {{ playerInfo.floor }}
      </div>
      <div class="border border-[#9e9e9e] rounded flex justify-between p-4 leading-6 text-10">
        <div class="flex flex-col items-start">
          <template v-if="playerAfter">
            <span>
              Sinh lực: {{ playerAfter.attribute.hp }}
            </span>
            <span>
              Công kích: {{ playerAfter.attribute.damage }}
            </span>
            <span>
              Phòng thủ: {{ playerAfter.attribute.def }}
            </span>
          </template>
          <template v-else>
            <span>
              Sinh lực: {{ playerInfo.attribute.hp }}
            </span>
            <span>
              Công kích: {{ playerInfo.attribute.damage }}
            </span>
            <span>
              Phòng thủ: {{ playerInfo.attribute.def }}
            </span>
          </template>
        </div>
        <div class="flex flex-col items-start">
          <template v-if="playerBefore">
            <span class="text-[#4caf50]">
              Sinh lực: {{ playerBefore?.attribute?.hp }}
            </span>
            <span class="text-[#4caf50]">
              Công kích: {{ playerBefore?.attribute?.damage }}
            </span>
            <span class="text-[#4caf50]">
              Phòng thủ: {{ playerBefore?.attribute?.def }}
            </span>
          </template>
        </div>
      </div>
      <div class="mt-2">
        <ButtonConfirm class-name="m-auto" :loading="loading" @click.stop="doUpgrade">
          <span class="z-9">
            Đột phá
          </span>
        </ButtonConfirm>
      </div>
    </div>
  </div>
</template>
