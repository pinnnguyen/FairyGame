<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'
import type { Boss, PlayerEquipment } from '~/types'

defineProps<{
  boss: Boss
}>()

const { playerInfo } = storeToRefs(usePlayerStore())
const equipSelected = ref({})
const equipShow = ref(false)

const pickItem = (equipment: PlayerEquipment) => {
  equipSelected.value = equipment
  equipShow.value = true
}

const startWar = (boss: Boss) => {
  if (playerInfo.value!.level < boss.level) {
    sendMessage('Chưa đạt cấp độ')
    return
  }

  if (boss.numberOfTurn <= 0) {
    sendMessage('Lượt khiêu chiến trong ngày đã hết')
    return
  }

  navigateTo({
    path: `/battle/${new Date().getTime()}`,
    replace: true,
    query: {
      target: 'boss-daily',
      id: boss.id,
    },
  })
}

const parseEquipments = (equipments: PlayerEquipment[]) => {
  if (!equipments)
    return []

  if (equipments.length > 3)
    return equipments.splice(0, 1)

  return equipments
}
</script>

<template>
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
    <div class="flex items-center justify-center">
      <LazyItemRank
        v-for="equipment in parseEquipments(boss?.reward?.equipments)"
        :key="equipment.name"
        class="w-[40px] h-[40px]"
        :rank="equipment.rank"
        :preview="equipment.preview"
        :quantity="0"
        @click.stop="pickItem(equipment)"
      />
    </div>
    <div class="flex items-center z-1 flex flex-col justify-center items-center">
      <p class="text-[#439546] text-12 font-semibold mr-2">
        Lượt {{ boss.numberOfTurn }}
      </p>
      <ButtonConfirm class-name="h-[25px] text-10" @click.stop="startWar(boss)">
        <span class="font-semibold text-[#9d521a] z-9">Khiêu chiến</span>
      </ButtonConfirm>
    </div>
  </section>
</template>
