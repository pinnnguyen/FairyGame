<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import type { Boss, Equipment } from '~/types'
import { sendMessage } from '~/composables/useMessage'
import { timeOffset } from '~/common'

const props = defineProps<{
  boss: any
}>()

const { playerInfo } = storeToRefs(usePlayerStore())
const equipSelected = ref({})
const equipShow = ref(false)
const now = new Date().getTime()

const startTime = ref((props.boss.startHours - new Date().getTime()) / 1000)
const endTime = ref((props.boss.endHours - now) / 1000)

const pickItem = (equipment: Equipment) => {
  equipSelected.value = equipment
  equipShow.value = true
}

onMounted(() => {
  setInterval(() => {
    startTime.value -= 1
    endTime.value -= 1
  }, 1000)
})
const startWar = (boss: Boss) => {
  if (!props.boss.isStart) {
    sendMessage('Thời gian hoạt động đã kết thúc')
    return
  }

  if (playerInfo.value && playerInfo.value.level < 10) {
    sendMessage('Chưa đạt cấp độ 10')
    return
  }

  navigateTo({
    path: `/battle/${new Date().getTime()}`,
    replace: true,
    query: {
      target: 'boss-frame-time',
      id: boss.id,
    },
  })
}

const parseEquipments = (equipments: Equipment[]) => {
  if (!equipments)
    return []

  if (equipments.length > 3)
    return equipments.splice(0, 1)

  return equipments
}
</script>

<template>
  <p class="text-[#439546] text-12 font-semibold mr-2">
    <span v-if="!boss.isStart">
      Boss bắt đầu: {{ timeOffset(startTime).hours ? timeOffset(startTime).hours : 0 }}h {{ timeOffset(startTime).minutes ? timeOffset(startTime).minutes : 0 }}phút {{ timeOffset(startTime).seconds ? timeOffset(startTime).seconds : 0 }}s
    </span>
    <span v-else>
      Boss kết thúc: {{ timeOffset(endTime).hours ? timeOffset(endTime).hours : 0 }}h {{ timeOffset(endTime).minutes ? timeOffset(endTime).minutes : 0 }}phút {{ timeOffset(endTime).seconds ? timeOffset(endTime).seconds : 0 }}s
    </span>
  </p>
  <section class="w-[90%] h-[80px] bg-[#a0aac0cf] rounded flex justify-between">
    <div class="flex flex-col items-center justify-center">
      <div class="relative mr-2">
        <NuxtImg class="w-[55px] h-[55px] rounded-full border border-[#bbc4d2]" format="webp" :src="boss.avatar" />
        <NuxtImg class="w-10 h-3 object-cover absolute bottom-0 left-[calc(50%_-_20px)]" format="webp" src="/panel/common_2.png" />
        <p class="text-10 text-white h-3 object-cover absolute bottom-[2px] left-[calc(50%_-_20px)]">
          {{ boss.name }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-center ">
      <LazyItemRank
        v-for="equipment in parseEquipments(boss.reward.equipments)"
        :key="equipment.name"
        class="w-[40px] h-[40px]"
        :rank="equipment.rank"
        :preview="equipment.preview"
        :quantity="0"
        @click.stop="pickItem(equipment)"
      />
    </div>
    <div class="flex items-center z-1 flex flex-col justify-center items-center">
      <ButtonConfirm class-name="h-[25px] text-10" @click.stop="startWar(boss)">
        <span class="font-semibold text-[#9d521a] z-9">Khiêu chiến</span>
      </ButtonConfirm>
    </div>
  </section>
</template>
