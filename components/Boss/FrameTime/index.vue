<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import type { Boss, Equipment } from '~/types'
import { sendMessage } from '~/composables/useMessage'
import { formatCash, timeOffset } from '~/common'

const props = defineProps<{
  boss: any
}>()

const { playerInfo } = storeToRefs(usePlayerStore())
const equipSelected = ref({})
const equipShow = ref(false)
const now = new Date().getTime()
const tooltip = ref(false)

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
  <var-popup v-if="tooltip" v-model:show="tooltip" position="center">
    <div class="w-70 text-black text-12 rounded leading-6 border border-gray-400 bg-[#00000040]">
      <div class="text-center text-white text-12 font-semibold pt-2">
        Phần thưởng
      </div>

      <div class="grid grid-cols-5 gap-2 p-4">
        <lazy-item-rank
          v-for="equipment in boss?.reward?.equipments"
          :key="equipment.name"
          class="w-[40px] h-[40px]"
          :rank="equipment.rank"
          :quality="equipment.quality"
          :preview="equipment.preview"
          :quantity="0"
        />
      </div>
    </div>
  </var-popup>
  <section class="w-[95%] bg-[#a0aac0cf] relative rounded flex flex-col justify-around p-2">
    <Icon class="absolute right-1 top-1 text-white" name="mdi-light:gift" size="18" @click="tooltip = true" />
    <p class="text-[#439546] text-center text-12 font-semibold mr-2">
      <span v-if="!boss.isStart">
        Boss bắt đầu: {{ timeOffset(startTime).hours ? timeOffset(startTime).hours : 0 }}h {{ timeOffset(startTime).minutes ? timeOffset(startTime).minutes : 0 }}phút {{ timeOffset(startTime).seconds ? timeOffset(startTime).seconds : 0 }}s
      </span>
      <span v-else>
        Boss kết thúc: {{ timeOffset(endTime).hours ? timeOffset(endTime).hours : 0 }}h {{ timeOffset(endTime).minutes ? timeOffset(endTime).minutes : 0 }}phút {{ timeOffset(endTime).seconds ? timeOffset(endTime).seconds : 0 }}s
      </span>
    </p>
    <div class="flex justify-around mt-2">
      <div class="flex flex-col justify-between">
        <div class="relative mr-2 flex flex-col items-center justify-center">
          <nuxt-img class="w-[55px] h-[55px] rounded-full border border-[#bbc4d2]" format="webp" :src="boss.avatar" />
          <div class="text-10 text-white h-3 object-cover bottom-[2px] left-[calc(50%_-_20px)]">
            {{ boss.name }}
          </div>
        </div>
        <div class="m-auto mt-1">
          <ButtonConfirm class-name="h-[25px] text-10" @click.stop="startWar(boss)">
            <span class="font-semibold text-[#9d521a] z-9">Khiêu chiến</span>
          </ButtonConfirm>
        </div>
      </div>
      <div class="text-10 flex flex-col items-start text-white font-semibold gap-1">
        <div>
          <Icon name="mdi:cards-heart" size="16" class="text-red-500" />
          <span>
            Sinh lực: {{ formatCash(boss.attribute.hp) }}
          </span>
        </div>
        <div>
          <Icon name="material-symbols:swords" size="16" class="text-rose-600" />
          <span>
            Công kích: {{ boss.attribute.damage }}
          </span>
        </div>
        <div>
          <Icon name="material-symbols:shield" size="16" class="text-green-500" />
          <span>
            Phòng ngự: {{ boss.attribute.def }}
          </span>
        </div>
        <div>
          <Icon name="mdi:bow-arrow" size="16" class="text-[#a855f7]" />
          <span>
            Tốc độ: {{ boss.attribute.speed ?? 0 }}
          </span>
        </div>
        <div>
          <Icon name="game-icons:pointy-sword" size="16" class="text-yellow-300" />
          <span>
            Bạo kích: {{ boss.attribute.critical }}%
          </span>
        </div>
        <div>
          <Icon name="game-icons:bloody-sword" size="16" class="text-[#ec4899]" />
          <span>
            Hút sinh lực: {{ boss.attribute.bloodsucking }}%
          </span>
        </div>
      </div>
    </div>
  </section>
  <!-- <p class="text-[#439546] text-12 font-semibold mr-2">
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
        <nuxt-img class="w-[55px] h-[55px] rounded-full border border-[#bbc4d2]" format="webp" :src="boss.avatar" />
        <nuxt-img class="w-10 h-3 object-cover absolute bottom-0 left-[calc(50%_-_20px)]" format="webp" src="/panel/common_2.png" />
        <p class="text-10 text-white h-3 object-cover absolute bottom-[2px] left-[calc(50%_-_20px)]">
          {{ boss.name }}
        </p>
      </div>
    </div>
    <div class="flex-center ">
      <Lazyitem-rank
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
  </section> -->
</template>
