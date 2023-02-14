<script setup lang="ts">
import { set } from '@vueuse/core'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'
import type { BossFrameTime } from '~/types'
import { TARGET_TYPE } from '~/constants'
import { playerTitle, startTimeEvent, timeOffset } from '~/common'

const props = defineProps<{
  boss?: BossFrameTime
}>()

const emits = defineEmits(['war'])
const { playerInfo } = storeToRefs(usePlayerStore())
const battleRequest = useState('battleRequest')
const showReward = ref<boolean>(false)

const now = new Date().getTime()
const startTime = ref(((props.boss?.startHours ?? 0) - new Date().getTime()) / 1000)
const endTime = ref(((props.boss?.endHours ?? 0) - now) / 1000)
const isStart = computed(() => {
  return startTimeEvent(props.boss?.startHours, props.boss?.endHours)
})

onMounted(() => {
  setInterval(() => {
    startTime.value -= 1
    endTime.value -= 1
  }, 1000)
})

const startWar = async (boss?: BossFrameTime) => {
  console.log('boss', boss)
  if (!boss)
    return

  if (!isStart.value) {
    sendMessage('Thời gian hoạt động chưa mở mời đạo hữu quay lại sau')
    return
  }

  set(battleRequest, {
    id: boss._id,
    target: TARGET_TYPE.BOSS_FRAME_TIME,
  })

  emits('war')
}

const bossLevelTitle = computed(() => {
  if (!props.boss)
    return

  return playerTitle(props.boss.level, props.boss?.level + 1)
})
</script>

<template>
  <section pos="relative" border="1 white/40 rounded" p="2" m="2">
    <div text="center">
      <span v-if="!isStart">
        Boss bắt đầu:
        <span v-if="timeOffset(startTime).hours > 0">{{ timeOffset(startTime).hours }}h</span>
        <span v-if="timeOffset(startTime).minutes > 0" p="x-1">{{ timeOffset(startTime).minutes }}phút</span>
        <span>{{ timeOffset(startTime).seconds }}s</span>
      </span>
      <span v-else>
        Boss kết thúc:
        <span v-if="timeOffset(endTime).hours > 0">{{ timeOffset(endTime).hours }}h</span>
        <span v-if="timeOffset(endTime).minutes > 0" p="x-1">{{ timeOffset(endTime).minutes }}phút</span>
        <span>{{ timeOffset(endTime).seconds }}s</span>
      </span>
    </div>
    <div flex="~ ">
      <div p="1">
        <boss-name :quality="boss.quality">
          {{ boss.name }} (<span text="10">{{ bossLevelTitle?.levelTitle }} {{ bossLevelTitle?.floor }}</span>)
        </boss-name>
        <div>HP boss: {{ Math.round((boss?.attribute.hp / boss.hp) * 100) }}%</div>
        <boss-reward-list :reward="boss?.reward" />
      </div>
      <div m="t-2" pos="absolute" right="2" top="[30%]">
        <i text="underline [#afc671]" m="r-2" @click.stop="showReward = true"> Xem thưởng </i>
        <var-button font="semibold italic" size="mini" class="!text-[#333]" @click.stop="startWar(boss)">
          Diệt tận
        </var-button>
      </div>
    </div>
  </section>
</template>
