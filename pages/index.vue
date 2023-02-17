<script setup lang="ts">
import { LazyBattleArena, LazyBattleDaily, LazyBattleElite, LazyBattleFrameTime, LazyBattleNormal } from '#components'
import { BATTLE_KIND } from '~/constants'

const arena = useState('arena', () => BATTLE_KIND.NORMAL)

definePageMeta({
  middleware: ['game'],
  auth: false,
})

const dynamicBattles = computed(() => {
  if (arena.value === BATTLE_KIND.BOSS_DAILY)
    return LazyBattleDaily

  if (arena.value === BATTLE_KIND.BOSS_ELITE)
    return LazyBattleElite

  if (arena.value === BATTLE_KIND.BOSS_FRAME_TIME)
    return LazyBattleFrameTime

  if (arena.value === BATTLE_KIND.ARENA_SOLO_PVP)
    return LazyBattleArena

  return LazyBattleNormal
})
</script>

<template>
  <menus />
  <page-section
    flex="~ 1"
    position="relative"
    justify="center"
    align="items-center"
    z="9"
  >
    <div
      w="full"
      pos="absolute"
      class="top-[40px] h-[34%]"
    >
      <div
        pos="relative"
        h="full"
        border="b white/10"
        bg="primary"
      >
        <!--        <Battle v-if="!isArena" /> -->
        <!--        <Arena v-else /> -->
        <component :is="dynamicBattles" />
      </div>
    </div>
    <div
      pos="absolute"
      bottom="0"
      w="full"
      class="h-[60%]"
    >
      <div
        pos="relative"
        h="full"
      >
        <page-bottom />
      </div>
    </div>
    <exchange />
  </page-section>
</template>
