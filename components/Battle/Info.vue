<script setup lang="ts">
const props = defineProps<{
  name?: string
  isEnemy?: boolean
  receiver: any
  state: any
}>()
</script>

<template>
  <div class="text-[#333] text-10">
    <div v-if="!isEnemy">
      <BattleStatusBar
        :receiver-hp="receiver?.player?.hp"
        :hp="state?.player?.hp"
      />
      <div class="h-4 text-8 text-[#d2d2d2] bg-black/80 relative flex items-center p-[2px] border border-white/40">
        {{ state.player?.levelTitle ?? '...' }} {{ state.player?.floor ?? '...' }}
      </div>
    </div>
    <div v-else>
      <BattleStatusBar
        :receiver-hp="receiver?.enemy?.hp"
        :hp="state?.enemy?.hp"
      />
      <div class="h-4 text-[#d2d2d2] text-8 bg-black/80 relative flex items-center p-[2px] border border-white/40">
        {{ state.enemy?.levelTitle ?? '...' }} {{ state.enemy?.floor ?? '...' }}
      </div>
    </div>
  </div>
</template>
