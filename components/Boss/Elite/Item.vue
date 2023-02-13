<script setup lang="ts">
import { set, useIntervalFn } from '@vueuse/core'
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
const validate = ref<{
  inRefresh?: boolean
  refreshTime?: number
}>({
  inRefresh: false,
  refreshTime: 0,
})

const revive = ref((props.boss.revive - now) / 1000)
setInterval(() => {
  revive.value -= 1
}, 1000)

const startWar = async (boss: BossElite) => {
  // try {
  //   validate.value = await $fetch('/api/boss/elite.validate')
  //   if (validate.value.inRefresh) {
  //     const { pause } = useIntervalFn(() => {
  //       validate.value.refreshTime = validate.value.refreshTime! - 1
  //       if (validate.value.refreshTime <= 1)
  //         pause()
  //     }, 1000)
  //
  //     sendMessage(`Bị boss đánh bại hãy quay lại sau ${timeOffset(validate.value.refreshTime!).seconds}`)
  //     return
  //   }
  // }
  // catch (e: any) {
  //   sendMessage(e.statusMessage)
  // }
  if (playerInfo.value!.level < boss.level) {
    sendMessage('Chưa đạt cấp độ')
    return
  }

  if (revive.value > 0) {
    sendMessage('Boss đang hồi sinh')
    return
  }

  set(battleRequest, {
    id: boss._id,
    target: TARGET_TYPE.BOSS_ELITE,
  })

  emits('war')
}

const bossLevelTitle = computed(() => {
  return playerTitle(props.boss.level, props.boss?.level + 1)
})
</script>

<template>
  <var-popup v-model:show="showReward">
    <boss-elite-reward :reward="boss.reward" />
  </var-popup>
  <div
    pos="relative"
    border="1 white/40 rounded"
    p="2"
    m="2"
  >
    <div v-if="revive > 0" text="center">
      Hồi sinh sau: {{ timeOffset(revive).minutes }}p {{ timeOffset(revive).seconds }}s
    </div>
    <div v-if="validate.inRefresh && validate.value.refreshTime" text="center">
      Hồi sinh sau: {{ timeOffset(validate.refreshTime).seconds }}
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
        top="[20%]"
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
  </div>
</template>
