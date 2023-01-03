<script setup lang="ts">
import { convertMillisecondsToSeconds } from '~/common'
import { WINNER } from '~/constants/war'
import { ITEMS_ICON } from '~/constants/items'
import type { BaseReward, PlayerEquipment } from '~/types'
interface Props {
  battleResult: {
    show: boolean
    win: string
  }
  reward: {
    base: BaseReward
    equipments?: PlayerEquipment[]
  }
}

const props = defineProps<Props>()
const emits = defineEmits(['close'])
const endTime = ref(6000)

const close = () => {
  emits('close')
}

const youWin = computed(() => props.battleResult.win === WINNER.youwin)

if (youWin.value) {
  const time = setInterval(() => {
    endTime.value = endTime.value - 1000
    if (endTime.value <= 0) {
      close()
      clearInterval(time)
    }
  }, 1000)
}
</script>

<template>
  <Blocker class="duration-500 transition-colors transition-opacity z-9">
    <div class="flex flex-col items-center">
      <NuxtImg class="w-[300px]" format="webp" :src="battleResult.win === WINNER.youwin ? '/battle/win.png' : '/battle/lose.png' " />
      <div class="w-[250px] h-[250px] border border-[#6d6c6c] bg-black rounded-md">
        <ul v-if="youWin" class="h-full w-full p-1">
          <li v-for="(value, key) in reward.base" :key="key" class="float-left w-[calc(23%_-_8px)] h-[48px] ml-2 m-1 bg-iconbg_3 bg-cover ">
            <div class="relative">
              <NuxtImg :src="ITEMS_ICON[key]" format="webp" />
              <div class="absolute bottom-0 right-0 text-xs text-white pr-1 w-full text-right">
                <div class="">
                  {{ value }}
                </div>
              </div>
            </div>
          </li>
          <li v-for="(value, key) in reward.equipments" :key="key" class="float-left w-[calc(23%_-_8px)] h-[48px] ml-2 m-1 bg-iconbg_3 bg-cover ">
            <div class="relative">
              <NuxtImg v-if="value.preview" :src="value.preview" format="webp" />
              <div class="absolute bottom-0 right-0 text-xs text-white pr-1 w-full text-right" />
            </div>
          </li>
        </ul>
      </div>
      <div v-if="youWin">
        <ButtonConfirm class-name="h-[30px]" class="m-2" @close="close">
          <span class="font-semibold z-9">Nhận thưởng ({{ convertMillisecondsToSeconds(endTime) }})</span>
        </ButtonConfirm>
      </div>
      <div v-else class="flex">
        <ButtonCancel class-name="h-[30px]" class="m-2" @close="close" @click.stop="navigateTo('/')">
          <span class="font-semibold z-9">Quay về</span>
        </ButtonCancel>
        <ButtonConfirm class-name="h-[30px]" class="m-2" @close="close">
          <span class="font-semibold z-9">Thử lại</span>
        </ButtonConfirm>
      </div>
    </div>
  </Blocker>
</template>
