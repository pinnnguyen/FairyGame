<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'

const { playerInfo, attribute } = storeToRefs(usePlayerStore())
const { loadPlayer } = usePlayerStore()
const classToTitle: Record<number, string> = {
  1: 'Tu tiên',
  2: 'Tu yêu',
  3: 'Tu ma',
  4: 'Nhân tộc',
}

const classListColor: Record<number, string> = {
  1: '#75cd52',
  2: '#b257a0',
  3: '#2f94fa',
  4: '#7788e8',
}

const classTitle = computed(() => classToTitle[playerInfo.value!.class])
const classColor = computed(() => classListColor[playerInfo.value!.class])

const addAttribute = async (target: string) => {
  try {
    const response = await $fetch('/api/attribute/add', {
      method: 'POST',
      body: {
        target,
      },
    })

    sendMessage(response.statusMessage)
    if (response.player)
      loadPlayer(response.player)
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <div>
    <div class="h-[60px] justify-between flex items-center mx-3">
      <div class="flex items-center">
        <NuxtImg class="h-[50px] mr-2" format="webp" src="/pve/player-avatar.png" />
        <div class="flex flex-col items-start">
          <div>
            Tên: {{ playerInfo?.name }}
          </div>
          <div>
            Cảnh giới: {{ playerInfo?.levelTitle }} {{ playerInfo?.floor }}
          </div>
          <div>
            Đẳng cấp: {{ playerInfo?.level }}
          </div>
        </div>
      </div>
      <!--          <a style="background: radial-gradient(black, transparent);" class="text-white giftcode" href="?cmd=Yc2x1pkhPpWR1aWh1YW4mc2lkPTQ3MTRjMmE2NDNmOTQwMTY3NWE5YjY0OTFhZDJiOGQ4">Giftcode</a> -->
    </div>
    <div class="m-3 flex justify-between">
      <div class="leading-[22px] flex flex-col items-start w-[70%]">
        <div class="px-2" :class="`bg-[${classColor}]`">
          Hệ: {{ classTitle }}
        </div>
        <div class="px-2">
          Tiên ngọc: {{ playerInfo?.coin }}
        </div>
        <div class="px-2">
          KNB: {{ playerInfo?.knb ?? 0 }}
        </div>
        <div class="px-2">
          Vàng: {{ playerInfo?.gold }}
        </div>
        <div class=" px-2">
          Tu vị: {{ playerInfo?.exp }}/{{ playerInfo?.expLimited }}
        </div>
        <div class=" px-2">
          Tốc độ: {{ attribute?.speed ?? 0 }}
        </div>
        <div class=" px-2">
          Khí huyết: {{ attribute?.hp ?? 0 }}
        </div>
        <div class=" px-2">
          Công Kích: {{ attribute?.damage ?? 0 }}
        </div>
        <div class=" px-2">
          Phòng Ngự: {{ attribute?.def ?? 0 }}
        </div>
        <div class=" px-2">
          Bạo kích: {{ attribute?.critical ?? 0 }}%
        </div>
        <div class=" px-2">
          Sát thương bạo kích: 150%
        </div>
        <div class=" px-2">
          Hút máu: {{ attribute?.bloodsucking ?? 0 }}%
        </div>
      </div>
      <div class="flex flex-col w-[150px] leading-5">
        <span>
          Điểm thuộc tính: {{ playerInfo?.ofAttribute ?? 0 }}
        </span>
        <div class="flex justify-between items-center border-l-[2px] mb-2 pl-2">
          <span>Sức mạnh: <strong class="text-yellow-500">{{ playerInfo?.ofPower ?? 0 }}</strong></span>
          <button class="ml-2" @click="addAttribute('ofPower')">
            <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
          </button>
        </div>
        <div class="flex justify-between items-center border-l-[2px] mb-2 pl-2">
          <span>Nhanh nhẹn: <strong class="text-green-500">{{ playerInfo?.ofAgility ?? 0 }}</strong></span>
          <button class="ml-2" @click="addAttribute('ofAgility')">
            <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
          </button>
        </div>
        <div class="flex justify-between items-center border-l-[2px] mb-2 pl-2">
          <span>Sức khoẻ: <strong class="text-red-500">{{ playerInfo?.ofVitality ?? 0 }}</strong></span>
          <button class="ml-2" @click="addAttribute('ofSkillful')">
            <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
          </button>
        </div>
        <div class="flex justify-between items-center border-l-[2px] mb-2 pl-2">
          <span>Khéo léo: <strong class="text-[#a855f7]">{{ playerInfo?.ofSkillful ?? 0 }}</strong></span>
          <button class="ml-2" @click="addAttribute('ofVitality')">
            <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
          </button>
        </div>
      </div>
      <div />
    </div>
  </div>
</template>
