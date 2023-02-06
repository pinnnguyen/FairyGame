<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'
import type { BossElite } from '~/types'
import { formatCash, qualityPalette, timeOffset } from '~/common'
import { ITEMS_NAME, ITEMS_QUALITY, TARGET_TYPE } from '~/constants'

const props = defineProps<{
  boss: BossElite
}>()

const { playerInfo } = storeToRefs(usePlayerStore())
const now = new Date().getTime()
const tooltip = ref(false)

const revive = ref((props.boss.revive - now) / 1000)
const options = reactive({
  showReward: false,
})

setInterval(() => {
  revive.value -= 1
}, 1000)

const startWar = (boss: BossElite) => {
  if (playerInfo.value!.level < boss.level) {
    sendMessage('Chưa đạt cấp độ')
    return
  }

  if (revive.value > 0) {
    sendMessage('Boss đang hồi sinh')
    return
  }

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
  <var-popup v-model:show="options.showReward" position="center">
    <div class="w-[90%] bg-primary m-auto p-2 rounded border border-white/20">
      <Line class="mb-2 text-10">
        Tip
      </Line>
      <div class="leading-5">
        <div class="text-left">
          Phải gây ít nhất 2% sát thương lên boss mới được nhận thưởng
        </div>
        <div>
          Đạo hữu nhận được sẽ là Tiên duyên
        </div>
        <div>
          Phần thưởng sẽ trao sau khi boss bị tiêu diệt
        </div>
        <div class="flex text-left">
          <i class="underline mr-1 whitespace-nowrap">Quỹ boss:</i>
          Phần thưởng chia đều theo sát thương gây ra
        </div>
        <div class="flex text-left">
          <i class="underline mr-1 whitespace-nowrap">Tiêu diệt:</i>
          Phần thưởng dành cho người kết liễu boss.
        </div>
        <div class="flex text-left">
          <i class="underline mr-1 whitespace-nowrap">ST cao nhât:</i>
          Phần thưởng dành cho người có lượng sát thương cao nhất.
        </div>
      </div>
      <Line class="my-2 text-10">
        Phần thưởng
      </Line>
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="(value, key) in boss.reward.base"
          :key="key"
          class="underline pl-1 border border-white/40 p-1"
          :style="{
            color: qualityPalette(ITEMS_QUALITY[key]),
          }"
        >
          {{ ITEMS_NAME[key] }} x{{ value }}
        </div>
      </div>
      <div class="text-center text-primary underline" @click.stop="options.showReward = false">
        Đã hiểu
      </div>
    </div>
  </var-popup>
  <!--  <section class="w-[95%] bg-[#a0aac0cf] relative rounded flex flex-col justify-around p-2"> -->
  <!--    <Icon class="absolute right-1 top-1 text-white" name="ri:question-fill" size="18" @click="tooltip = true" /> -->
  <!--    <div v-if="revive > 0" class="text-10 text-white mb-2"> -->
  <!--      Hồi sinh: {{ timeOffset(revive).minutes }}p {{ timeOffset(revive).seconds }}s -->
  <!--    </div> -->
  <!--    <div v-else class="text-12 text-white mb-2 text-center"> -->
  <!--      <Icon name="material-symbols:swords" size="16" /> -->
  <!--      Sẵn sàng -->
  <!--    </div> -->
  <!--    <div class="flex justify-around mt-2"> -->
  <!--      <div class="flex flex-col justify-between"> -->
  <!--        <div class="relative mr-2 flex flex-col items-center justify-center"> -->
  <!--          <nuxt-img class="w-[55px] h-[55px] rounded-full border border-[#bbc4d2]" format="webp" :src="boss.avatar" /> -->
  <!--          <div class="text-10 text-white h-3 object-cover bottom-[2px] left-[calc(50%_-_20px)]"> -->
  <!--            {{ boss.name }} -->
  <!--          </div> -->
  <!--          <div class="mt-2 flex gap-2"> -->
  <!--            <div class="flex items-center justify-center"> -->
  <!--              <Icon name="fa6-solid:sack-dollar" size="12" /> -->
  <!--              <span class="flex items-center justify-center ml-1"> -->
  <!--                <span class="text-10 text-gray-200">{{ boss.reward?.base?.bag }}</span> -->
  <!--                <nuxt-img format="webp" class="w-3 h-3 ml-[1px]" src="/items/1_s.png" /> -->
  <!--              </span> -->
  <!--            </div> -->
  <!--            <div class="flex items-center justify-center"> -->
  <!--              <Icon name="noto:trophy" size="12" /> -->
  <!--              <span class="flex items-center justify-center ml-1"> -->
  <!--                <span class="text-10 text-gray-200">{{ boss.reward?.base?.top }}</span> -->
  <!--                <nuxt-img format="webp" class="w-3 h-3 ml-[1px]" src="/items/1_s.png" /> -->
  <!--              </span> -->
  <!--            </div> -->
  <!--            <div class="flex items-center justify-center"> -->
  <!--              <Icon name="game-icons:ancient-sword" size="12" /> -->
  <!--              <span class="flex items-center justify-center ml-1"> -->
  <!--                <span class="text-10 text-gray-200">{{ boss.reward?.base?.kill }}</span> -->
  <!--                <nuxt-img format="webp" class="w-3 h-3 ml-[1px]" src="/items/1_s.png" /> -->
  <!--              </span> -->
  <!--            </div> -->
  <!--          </div> -->
  <!--        </div> -->
  <!--        <div class="m-auto mt-1"> -->
  <!--          <ButtonConfirm class-name="h-[25px] text-10" @click.stop="startWar(boss)"> -->
  <!--            <span class="font-semibold text-[#9d521a] z-9">Khiêu chiến</span> -->
  <!--          </ButtonConfirm> -->
  <!--        </div> -->
  <!--      </div> -->
  <!--      <div class="text-10 flex flex-col items-start text-white font-semibold gap-1"> -->
  <!--        <div> -->
  <!--          <Icon name="mdi:cards-heart" size="16" class="text-red-500" /> -->
  <!--          <span> -->
  <!--            Sinh lực: {{ formatCash(boss.attribute.hp) }} -->
  <!--          </span> -->
  <!--        </div> -->
  <!--        <div> -->
  <!--          <Icon name="material-symbols:swords" size="16" class="text-rose-600" /> -->
  <!--          <span> -->
  <!--            Công kích: {{ boss.attribute.damage }} -->
  <!--          </span> -->
  <!--        </div> -->
  <!--        <div> -->
  <!--          <Icon name="material-symbols:shield" size="16" class="text-green-500" /> -->
  <!--          <span> -->
  <!--            Phòng ngự: {{ boss.attribute.def }} -->
  <!--          </span> -->
  <!--        </div> -->
  <!--        <div> -->
  <!--          <Icon name="mdi:bow-arrow" size="16" class="text-[#a855f7]" /> -->
  <!--          <span> -->
  <!--            Tốc độ: {{ boss.attribute.speed ?? 0 }} -->
  <!--          </span> -->
  <!--        </div> -->
  <!--        <div> -->
  <!--          <Icon name="game-icons:pointy-sword" size="16" class="text-yellow-300" /> -->
  <!--          <span> -->
  <!--            Bạo kích: {{ boss.attribute.critical }}% -->
  <!--          </span> -->
  <!--        </div> -->
  <!--        <div> -->
  <!--          <Icon name="game-icons:bloody-sword" size="16" class="text-[#ec4899]" /> -->
  <!--          <span> -->
  <!--            Hút sinh lực: {{ boss.attribute.bloodsucking }}% -->
  <!--          </span> -->
  <!--        </div> -->
  <!--      </div> -->
  <!--    </div> -->
  <!--  </section> -->

  <div class="relative flex border border-white/40 rounded p-2 m-2">
    <div class="p-1">
      <div class="text-12 font-bold" :style="{ color: qualityPalette(boss.quality) }">
        {{ boss.name }}
      </div>
      <div>
        HP quái: 100%
      </div>
      <div class="flex max-w-[calc(100vw_-_40px)]">
        Thưởng:
        <div class="whitespace-nowrap overflow-scroll">
          <span
            v-for="(value, key) in boss.reward.base"
            :key="key"
            class="underline pl-1"
            :style="{
              color: qualityPalette(ITEMS_QUALITY[key]),
            }"
          >
            {{ ITEMS_NAME[key] }} x{{ value }}
          </span>
        </div>
      </div>
    </div>
    <div class="mt-2 absolute top-[20%] right-2">
      <i class="underline text-[#afc671] mr-2" @click.stop="options.showReward = true">Xem thưởng</i>
      <var-button
        class="!text-[#333] font-semibold italic !bg-[#ffffff]"
        size="mini"
        @click.stop="startWar(boss)"
      >
        Diệt tận
      </var-button>
    </div>
  </div>
</template>
