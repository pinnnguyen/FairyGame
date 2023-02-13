<script setup lang="ts">
import { set } from '@vueuse/core'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendMessage } from '~/composables/useMessage'
import type { BossElite } from '~/types'
import { TARGET_TYPE } from '~/constants'
import { playerTitle, timeOffset } from '~/common'

const props = defineProps<{
  boss: BossElite
}>()

const emits = defineEmits(['war'])
const { playerInfo } = storeToRefs(usePlayerStore())
const battleRequest = useState('battleRequest')
const showReward = ref<boolean>(false)

const now = new Date().getTime()
const startTime = ref((props.boss?.startHours - new Date().getTime()) / 1000)
const endTime = ref((props.boss?.endHours - now) / 1000)
onMounted(() => {
  setInterval(() => {
    startTime.value -= 1
    endTime.value -= 1
  }, 1000)
})

const startWar = async (boss: BossElite) => {
  if (!props.boss.isStart) {
    sendMessage('Thời gian hoạt động chưa mở mời đạo hữu quay lại sau')
    return
  }

  if (playerInfo.value!.level < boss.level) {
    sendMessage('Chưa đạt cấp độ')
    return
  }

  set(battleRequest, {
    id: boss._id,
    target: TARGET_TYPE.BOSS_FRAME_TIME,
  })

  emits('war')
}

const bossLevelTitle = computed(() => {
  return playerTitle(props.boss.level, props.boss?.level + 1)
})
</script>

<template>
  <section
    pos="relative"
    border="1 white/40 rounded"
    p="2"
    m="2"
  >
    <div
      text="center"
    >
      <span v-if="!boss.isStart">
        Boss bắt đầu: {{ timeOffset(startTime).hours ? timeOffset(startTime).hours : 0 }}h {{ timeOffset(startTime).minutes ? timeOffset(startTime).minutes : 0 }}phút {{ timeOffset(startTime).seconds ? timeOffset(startTime).seconds : 0 }}s
      </span>
      <span v-else>
        Boss kết thúc: {{ timeOffset(endTime).hours ? timeOffset(endTime).hours : 0 }}h {{ timeOffset(endTime).minutes ? timeOffset(endTime).minutes : 0 }}phút {{ timeOffset(endTime).seconds ? timeOffset(endTime).seconds : 0 }}s
      </span>
    </div>
    <div
      flex="~ "
    >
      <div p="1">
        <boss-name :quality="boss.quality">
          {{ boss.name }} (<span text="10">{{ bossLevelTitle.levelTitle }} {{ bossLevelTitle.floor }}</span>)
        </boss-name>
        <div>
          HP boss: {{ Math.round((boss.attribute.hp / boss.hp) * 100) }}%
        </div>
        <boss-reward-list :reward="boss.reward" />
      </div>
      <div
        m="t-2"
        pos="absolute"
        right="2"
        top="[30%]"
      >
        <i
          text="underline [#afc671]"
          m="r-2"
          @click.stop="showReward = true"
        >
          Xem thưởng
        </i>
        <var-button
          font="semibold italic"
          size="mini"
          class="!text-[#333]"
          @click.stop="startWar(boss)"
        >
          Diệt tận
        </var-button>
      </div>
    </div>
  </section>
</template>
