<script setup lang="ts">
import { set } from '@vueuse/core'
import { sendMessage, usePlayerStore } from '#imports'
import { playerTitle } from '~/common'
import type { BossDaily } from '~/types'
import { BATTLE_KIND, TARGET_TYPE } from '~/constants'

const props = defineProps<{
  boss: BossDaily
}>()

const emits = defineEmits(['war'])
const { playerInfo } = storeToRefs(usePlayerStore())
const { useBattleRequest } = useRequest()
const showReward = ref(false)

const startWar = (boss: BossDaily) => {
  if (playerInfo.value!.level < boss.level) {
    sendMessage('Chưa đạt cấp độ')
    return
  }

  if (boss.numberOfTurn! <= 0) {
    sendMessage('Lượt khiêu chiến trong ngày đã hết')
    return
  }

  set(useState('arena'), BATTLE_KIND.BOSS_DAILY)
  set(useBattleRequest, {
    id: boss.id,
    target: TARGET_TYPE.BOSS_DAILY,
  })

  emits('war')
}

const bossLevelTitle = computed(() => {
  return playerTitle(props.boss.level, props.boss?.level + 1)
})
</script>

<template>
  <var-popup v-model:show="showReward">
    <boss-daily-reward :reward="boss.reward" />
  </var-popup>
  <div class="relative flex border border-white/40 rounded p-2 m-2">
    <div class="p-1">
      <boss-name :quality="boss.quality">
        {{ boss.name }} (<span text="10">{{ bossLevelTitle.levelTitle }} {{ bossLevelTitle.floor }}</span>)
      </boss-name>
      <div>
        HP boss: 100%
      </div>
      <boss-reward-list :reward="boss.reward" />
    </div>
    <div class="absolute top-1 right-2 text-8">
      Lượt tiêu diệt {{ boss.numberOfTurn }}
    </div>
    <div class="mt-2 absolute top-[20%] right-2">
      <i class="underline text-[#afc671] mr-2" @click.stop="showReward = true">Xem thưởng</i>
      <var-button
        :disabled="boss.numberOfTurn <= 0"
        class="!text-[#333]"
        size="mini"
        @click.stop="startWar(boss)"
      >
        Diệt tận
      </var-button>
    </div>
  </div>
</template>
