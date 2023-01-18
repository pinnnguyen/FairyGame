<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'
import { formatCash } from '~/common'

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
const tooltip = ref(false)

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
  <var-popup v-model:show="tooltip" position="center">
    <div class="w-80 p-4 bg-white text-black rounded">
      Lên 1 level sẽ được thêm 2 điểm thuộc tính
      <p class="border-t my-2" />
      <p class="flex flex-col">
        <span>
          1 Sức mạnh
        </span>
        <span class="pl-3">
          <Icon name="mdi:cards-heart" size="16" class="text-red-500" />
          30 Sinh lực
        </span>
        <span class="pl-3">
          <Icon name="material-symbols:swords" size="16" class="text-rose-600" />
          0.2% Tấn công cơ bản
        </span>
      </p>
      <p class="border-t my-2" />
      <p class="flex flex-col">
        <span>
          1 Nhanh nhẹn
        </span>
        <span class="pl-3">
          <Icon name="mdi:bow-arrow" size="16" class="text-[#a855f7]" />
          1 Tốc độ
        </span>
        <span class="pl-3">
          <Icon name="game-icons:pointy-sword" size="16" class="text-yellow-300" />
          0.2% Bạo kích cơ bản
        </span>
      </p>
      <p class="border-t my-2" />
      <p class="flex flex-col">
        <span>
          1 Sức khoẻ
        </span>
        <span class="pl-3">
          <Icon name="mdi:cards-heart" size="16" class="text-red-500" />
          20 Sinh lực
        </span>
        <span class="pl-3">
          <Icon name="mdi:heart-plus" size="16" class="text-red-500" />
          0.2% Sinh lực cơ bản
        </span>
        <span class="pl-3">
          <Icon name="material-symbols:shield" size="16" class="text-green-500" />
          0.2% Phòng thủ cơ bản
        </span>
      </p>
      <p class="border-t my-2" />
      <p class="flex flex-col">
        <span>
          1 Khéo léo
        </span>
        <span class="pl-3">
          <Icon name="mdi:bow-arrow" size="16" class="text-[#a855f7]" />
          0.5 Tốc độ
        </span>
        <span class="pl-3">
          <Icon name="mdi:shield-plus" size="16" class="text-green-500" />
          10 Phòng ngự
        </span>
        <span class="pl-3">
          <Icon name="game-icons:pointy-sword" size="16" class="text-yellow-300" />
          0.2% Bạo kích cơ bản
        </span>
      </p>
    </div>
  </var-popup>
  <div class="p-2">
    <div class="h-[60px] justify-between flex items-center mx-3">
      <div class="flex items-center">
        <nuxt-img class="h-[50px] mr-2" format="webp" src="/pve/player-avatar.png" />
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
        <span class="">
          Hệ: <span :class="`bg-[${classColor}]`">{{ classTitle }}</span>
        </span>
        <span class="">
          Tiên ngọc: {{ Math.round(playerInfo!.coin) }}
        </span>
        <span class="">
          KNB: {{ Math.round(playerInfo!.knb) ?? 0 }}
        </span>
        <span class="">
          Vàng: {{ Math.round(playerInfo!.gold) }}
        </span>
        <span class=" ">
          Tu vị: {{ formatCash((playerInfo?.exp)) }}/{{ formatCash(playerInfo?.expLimited) }}
        </span>
        <span class=" ">
          Tốc độ: {{ attribute?.speed ?? 0 }}
        </span>
        <span class=" ">
          Sinh lực: {{ attribute?.hp ?? 0 }}
        </span>
        <span class=" ">
          Công Kích: {{ attribute?.damage ?? 0 }}
        </span>
        <span class=" ">
          Phòng Ngự: {{ attribute?.def ?? 0 }}
        </span>
        <span class=" ">
          Bạo kích: {{ attribute?.critical ?? 0 }}%
        </span>
        <span class=" ">
          Sát thương bạo kích: 150%
        </span>
        <span class=" ">
          Hút máu: {{ attribute?.bloodsucking ?? 0 }}%
        </span>
      </div>
      <div class="flex flex-col w-[150px] leading-[22px]">
        <span>
          Điểm thuộc tính: {{ playerInfo?.ofAttribute ?? 0 }}
        </span>
        <div class="flex justify-between items-center">
          <span>Sức mạnh: <strong class="text-yellow-500">{{ playerInfo?.ofPower ?? 0 }}</strong></span>
          <button class="ml-2" @click="addAttribute('ofPower')">
            <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
          </button>
        </div>
        <div class="flex justify-between items-center">
          <span>Nhanh nhẹn: <strong class="text-green-500">{{ playerInfo?.ofAgility ?? 0 }}</strong></span>
          <button class="ml-2" @click="addAttribute('ofAgility')">
            <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
          </button>
        </div>
        <div class="flex justify-between items-center">
          <span>Sức khoẻ: <strong class="text-red-500">{{ playerInfo?.ofVitality ?? 0 }}</strong></span>
          <button class="ml-2" @click="addAttribute('ofVitality')">
            <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
          </button>
        </div>
        <div class="flex justify-between items-center">
          <span>Khéo léo: <strong class="text-[#a855f7]">{{ playerInfo?.ofSkillful ?? 0 }}</strong></span>
          <button class="ml-2" @click="addAttribute('ofSkillful')">
            <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
          </button>
        </div>
      </div>
      <div />
    </div>
    <p class="absolute bottom-4 right-2" @click="tooltip = true">
      <Icon name="ri:question-fill" size="20" />
    </p>
  </div>
</template>
