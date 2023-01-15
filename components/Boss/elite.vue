<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'
import type { Boss, Equipment } from '~/types'
import { formatCash } from '~~/common'
import { TARGET_TYPE } from '~~/constants'

defineProps<{
  boss: Boss
}>()

const startWar = (boss: Boss) => {
//   if (playerInfo.value!.level < boss.level) {
//     sendMessage('Chưa đạt cấp độ')
//     return
//   }

  //   if (boss.numberOfTurn <= 0) {
  //     sendMessage('Lượt khiêu chiến trong ngày đã hết')
  //     return
  //   }

  navigateTo({
    path: `/battle/${new Date().getTime()}`,
    replace: true,
    query: {
      target: TARGET_TYPE.BOSS_ELITE,
      id: boss._id,
    },
  })
}
</script>

<template>
  <section class="w-[90%] bg-[#a0aac0cf] rounded flex justify-between p-4">
    <div class="flex flex-col justify-between">
      <div class="relative mr-2 flex flex-col items-center justify-center">
        <NuxtImg class="w-[55px] h-[55px] rounded-full border border-[#bbc4d2]" format="webp" :src="boss.avatar" />
        <div class="text-10 text-white h-3 object-cover bottom-[2px] left-[calc(50%_-_20px)]">
          {{ boss.name }}
        </div>
      </div>
      <div>
        <ButtonConfirm class-name="h-[25px] text-10" @click.stop="startWar(boss)">
          <span class="font-semibold text-[#9d521a] z-9">Khiêu chiến</span>
        </ButtonConfirm>
      </div>
    </div>
    <div class="text-12 flex flex-col items-start text-white font-semibold gap-1">
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
          Tốc độ: {{ boss.attribute.speed ?? 0 }}%
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
          Hút máu: {{ boss.attribute.bloodsucking }}%
        </span>
      </div>
    </div>
  </section>
</template>
