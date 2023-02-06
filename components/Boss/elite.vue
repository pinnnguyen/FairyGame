<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { set } from '@vueuse/core'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'
import type { BossElite } from '~/types'
import { qualityPalette, timeOffset } from '~/common'
import { ITEMS_NAME, ITEMS_QUALITY, TARGET_TYPE } from '~/constants'

const props = defineProps<{
  boss: BossElite
}>()

const emits = defineEmits(['war'])
const { playerInfo } = storeToRefs(usePlayerStore())
const now = new Date().getTime()
const battleRequest = useState('battleRequest')

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

  if (revive.value > 0)
    sendMessage('Boss đang hồi sinh')

  set(battleRequest, {
    id: boss._id,
    target: TARGET_TYPE.BOSS_ELITE,
  })

  emits('war')
}
</script>

<template>
  <var-popup v-if="options.showReward" v-model:show="options.showReward" position="center">
    <div
      w="11/12"
      bg="primary"
      m="auto"
      p="2"
      border="rounded 1 white/20"
    >
      <Line
        m="b-2"
        text="10"
      >
        Tip
      </Line>
      <div
        font="leading-5"
      >
        <div text="left">
          Phải gây ít nhất 2% sát thương lên boss mới được nhận thưởng
        </div>
        <div>
          Đạo hữu nhận được sẽ là Tiên duyên
        </div>
        <div>
          Phần thưởng sẽ trao sau khi boss bị tiêu diệt
        </div>
        <div display="flex" text="left">
          <i text="underline space-nowrap" m="r-1">Quỹ boss:</i>
          Phần thưởng chia đều theo sát thương gây ra
        </div>
        <div display="flex" text="left">
          <i text="underline space-nowrap" m="r-1">Tiêu diệt:</i>
          Phần thưởng dành cho người kết liễu boss.
        </div>
        <div display="flex" text="left">
          <i text="underline space-nowrap" m="r-1">ST cao nhât:</i>
          Phần thưởng dành cho người có lượng sát thương cao nhất.
        </div>
      </div>
      <Line m="y-2" text="10">
        Phần thưởng
      </Line>
      <div
        grid="~ cols-4"
        gap="4"
      >
        <div
          v-for="(value, key) in boss.reward.base"
          :key="key"
          text="underline"
          p="l-1 1"
          border="1 white/40"
          :style="{
            color: qualityPalette(ITEMS_QUALITY[key]),
          }"
        >
          {{ ITEMS_NAME[key] }} x{{ value }}
        </div>
      </div>
      <div
        text="center primary underline"
        @click.stop="options.showReward = false"
      >
        Đã hiểu
      </div>
    </div>
  </var-popup>

  <div
    position="relative"
    border="1 white/40 rounded"
    p="2"
    m="2"
  >
    <div v-if="revive > 0" text="center">
      Hồi sinh: {{ timeOffset(revive).minutes }}p {{ timeOffset(revive).seconds }}s
    </div>
    <div
      display="flex"
    >
      <div p="1">
        <div text="12" font="bold" :style="{ color: qualityPalette(boss?.quality) }">
          {{ boss.name }}
        </div>
        <div>
          HP boss: {{ Math.round((boss.attribute.hp / boss.hp) * 100) }}%
        </div>
        <div
          display="flex"
          class="max-w-[calc(100vw_-_40px)]"
        >
          Thưởng:
          <div text="space-nowrap" overflow="scroll">
            <span
              v-for="(value, key) in boss.reward.base"
              :key="key"
              text="underline"
              p="l-1"
              :style="{
                color: qualityPalette(ITEMS_QUALITY[key]),
              }"
            >
              {{ ITEMS_NAME[key] }} x{{ value }}
            </span>
          </div>
        </div>
      </div>
      <div
        m="t-2"
        position="absolute"
        right="2"
        top="[20%]"
      >
        <i
          text="underline [#afc671]"
          m="r-2"
          @click.stop="options.showReward = true"
        >
          Xem thưởng
        </i>
        <var-button
          :disabled="revive > 0"
          font="semibold italic"
          class="!text-[#333] !bg-[#ffffff]"
          size="mini"
          @click.stop="startWar(boss)"
        >
          Diệt tận
        </var-button>
      </div>
    </div>
  </div>
</template>
