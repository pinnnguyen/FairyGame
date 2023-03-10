<script setup lang="ts">
import { set } from '@vueuse/core'
import { useRequest } from '#imports'
import { usePlayerStore } from '~/composables/usePlayer'
import { sendNotification } from '~/composables/useNotification'
import type { BossElite } from '~/types'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'
import { playerTitle, timeOffset } from '~/common'

const props = defineProps<{
  boss: BossElite
}>()

const emits = defineEmits(['war'])
const { playerInfo } = storeToRefs(usePlayerStore())
const { useBattleRequest } = useRequest()
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
  if (playerInfo.value!.level < boss.level) {
    sendNotification('Chưa đạt cấp độ')
    return
  }

  if (revive.value > 0) {
    sendNotification('Boss đang hồi sinh')
    return
  }

  set(useState('arena'), BATTLE_KIND.BOSS_ELITE)
  set(useBattleRequest, {
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
