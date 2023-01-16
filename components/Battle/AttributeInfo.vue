<script setup lang="ts">
defineProps<{
  state: any
}>()
</script>

<template>
  <div class="flex justify-between p-2 pt-2">
    <div>
      <div class="flex items-center justify-start">
        <NuxtImg format="webp" class="h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full" src="/pve/player-avatar.png" />
      </div>
      <BattleInfo
        :level-title="state.player?.levelTitle"
        :floor="state.player?.floor"
        :name="state?.player?.name"
        :hp="state?.player?.hp"
        :damage="state?.player?.damage"
        :def="state?.player?.def"
      />
    </div>

    <div>
      <div class="flex items-center justify-end">
        <NuxtImg format="webp" class="h-[35px] bg-black border border-[#d0d0d0] bg-[#d0d0d0] rounded-full" src="/pve/monter-avatar.png" />
      </div>
      <BattleInfo
        :level-title="state.enemy?.levelTitle"
        :floor="state.enemy?.floor"
        :name="state?.enemy?.name"
        :hp="state?.enemy?.hp"
        :damage="state?.enemy?.damage"
        :def="state?.enemy?.def"
      />
    </div>
  </div>
</template>
