<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { sendMessage, usePlayerStore } from '#imports'

const { playerInfo, attribute } = storeToRefs(usePlayerStore())
const { loadPlayer } = usePlayerStore()
const tooltip = ref(false)

const addAttribute = async (target: string) => {
  try {
    const response: any = await $fetch('/api/attribute/add', {
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
    <div class="w-80 p-4 border border-white/40 bg-[#000000] text-primary rounded">
      Lên 1 level sẽ được thêm 2 điểm thuộc tính
      <p class="flex flex-col">
        <span>
          1 Sức mạnh
        </span>
        <span class="pl-3">
          30 Sinh lực
        </span>
        <span class="pl-3">
          0.2% Tấn công cơ bản
        </span>
      </p>
      <p class="border-t my-2" />
      <p class="flex flex-col">
        <span>
          1 Nhanh nhẹn
        </span>
        <span class="pl-3">
          1 Tốc độ
        </span>
        <span class="pl-3">
          0.2% Bạo kích cơ bản
        </span>
      </p>
      <p class="border-t my-2" />
      <p class="flex flex-col">
        <span>
          1 Sức khoẻ
        </span>
        <span class="pl-3">
          20 Sinh lực
        </span>
        <span class="pl-3">
          0.2% Sinh lực cơ bản
        </span>
        <span class="pl-3">
          0.2% Phòng thủ cơ bản
        </span>
      </p>
      <p class="border-t my-2" />
      <p class="flex flex-col">
        <span>
          1 Khéo léo
        </span>
        <span class="pl-3">
          0.5 Tốc độ
        </span>
        <span class="pl-3">
          10 Phòng ngự
        </span>
        <span class="pl-3">
          0.2% Bạo kích cơ bản
        </span>
      </p>
    </div>
  </var-popup>
  <Line class="py-2">
    <div class="text-10">
      Điểm thuộc tính {{ playerInfo?.ofAttribute ?? 0 }}
    </div>
  </Line>
  <div class="flex items-start justify-between gap-4 p-4">
    <div class="flex justify-between items-start gap-3">
      <div class="w-4">
        Sức mạnh <strong class="text-yellow-500">{{ playerInfo?.coreAttribute?.ofPower ?? 0 }}</strong>
      </div>
      <button class="ml-2" @click="addAttribute('ofPower')">
        <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
      </button>
    </div>
    <div class="flex justify-between items-start gap-3">
      <div class="w-4">
        Nhanh nhẹn <strong class="text-green-500">{{ playerInfo?.coreAttribute?.ofAgility ?? 0 }}</strong>
      </div>
      <button class="ml-2" @click="addAttribute('ofAgility')">
        <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
      </button>
    </div>
    <div class="flex justify-between items-start gap-3">
      <div class="w-4">
        Sức khoẻ <strong class="text-red-500">{{ playerInfo?.coreAttribute?.ofVitality ?? 0 }}</strong>
      </div>
      <button class="ml-2" @click="addAttribute('ofVitality')">
        <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
      </button>
    </div>
    <div class="flex justify-between items-start gap-3">
      <div class="w-4">
        Khéo léo <strong class="text-[#a855f7]">{{ playerInfo?.coreAttribute?.ofSkillful ?? 0 }}</strong>
      </div>
      <button class="ml-2" @click="addAttribute('ofSkillful')">
        <svg class="w-[20px]" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" /></svg>
      </button>
    </div>
  </div>
  <Line class="py-2 pt-4">
    <div class="text-10">
      Thuộc tính cơ bản
    </div>
  </Line>
  <div class="pl-4">
    <div class="flex justify-between items-start gap-4">
      <div class="whitespace-normal">
        Tốc độ {{ attribute?.speed ?? 0 }}
      </div>
      <div class="whitespace-normal">
        Sinh lực {{ attribute?.hp ?? 0 }}
      </div>
      <div class="whitespace-normal">
        Công Kích {{ attribute?.damage ?? 0 }}
      </div>
      <div class="whitespace-normal">
        Phòng Ngự {{ attribute?.def ?? 0 }}
      </div>
      <div class="whitespace-normal">
        Bạo kích {{ attribute?.critical ?? 0 }}%
      </div>
      <div class="whitespace-normal">
        Sát thương bạo kích {{ attribute?.criticalDamage ?? 0 }}%
      </div>
      <div class="whitespace-normal">
        Miễn sát thương bạo kích {{ attribute?.reductionCriticalDamage ?? 0 }}%
      </div>
    </div>
    <Line class="py-2 pt-4">
      <div class="text-10">
        Thuộc tính cấp 2
      </div>
    </Line>
    <div class="flex flex-col gap-4">
      <div class="flex ">
        <div class="whitespace-normal">
          Hút sinh lực {{ attribute?.bloodsucking ?? 0 }}%
        </div>
        <div class="whitespace-normal">
          Kháng hút sinh lực {{ attribute?.reductionBloodsucking ?? 0 }}%
        </div>
        <div class="whitespace-normal">
          Né tránh {{ attribute?.avoid ?? 0 }}%
        </div>
        <div class="whitespace-normal">
          Bỏ qua né tránh {{ attribute?.reductionAvoid ?? 0 }}%
        </div>
      </div>
      <div class="flex">
        <div class="whitespace-normal">
          Phản sát thương {{ attribute?.counterAttack ?? 0 }}%
        </div>
        <div class="whitespace-normal">
          Bỏ qua phản sát thương {{ attribute?.reductionCounterAttack ?? 0 }}%
        </div>
        <div class="whitespace-normal">
          Hiệu xuất hồi phục {{ attribute?.recoveryPerformance ?? 0 }}%
        </div>
        <div class="whitespace-normal">
          Bỏ qua hồi phục {{ attribute?.reductionRecoveryPerformance ?? 0 }}%
        </div>
      </div>
    </div>
    <Line class="py-2 pt-4">
      <div class="text-10">
        Thuộc tính cấp 3
      </div>
    </Line>
    <div class="text-center">
      Chưa được mở khoá
    </div>
    <p class="absolute bottom-2 right-0" @click="tooltip = true">
      <button class="mx-2 h-6 w-6 shadow rounded text-8 italic font-semibold border-1 text-primary rounded-full border-white/40 bg-button-menu">
        Gợi ý
      </button>
    </p>
  </div>
</template>
