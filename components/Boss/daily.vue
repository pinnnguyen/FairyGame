<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'
import type { Boss } from '~/types'
import { formatCash } from '~/common'

defineProps<{
  boss: Boss
}>()

const { playerInfo } = storeToRefs(usePlayerStore())
const equipSelected = ref({})
const equipShow = ref(false)
const tooltip = ref(false)

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
</script>

<template>
  <var-popup v-model:show="tooltip" position="center">
    <div class="w-70 text-black text-12 rounded leading-6 border border-gray-400 bg-black/40">
      <div class="text-center text-white text-12 font-semibold pt-2">
        Phần thưởng
      </div>

      <div class="grid grid-cols-4 gap-2 p-4">
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
    <div class="text-12 text-white mb-2 text-center">
      Lượt {{ boss.numberOfTurn }}
    </div>
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
</template>
