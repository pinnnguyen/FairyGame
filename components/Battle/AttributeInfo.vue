<script setup lang="ts">
defineProps<{
  state: any
  receiver: any
}>()
</script>

<template>
  <div class="flex justify-between p-2 pt-2">
    <div>
      <div class="flex justify-start items-end">
        <nuxt-img format="webp" class="h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full" src="/pve/player-avatar.png" />
        <span class="text-10 ml-1">{{ state?.player?.name }}</span>
      </div>
      <BattleInfo
        :name="state?.player?.name"
        :hp="state?.player?.hp"
        :damage="state?.player?.damage"
        :def="state?.player?.def"
        :receiver-hp="receiver?.player?.hp"
        :state-hp="state?.player?.hp"
        :is-enemy="false"
        class-name="items-start"
      />
    </div>

    <div>
      <div class="flex items-end justify-end">
        <span class="text-10">
          {{ state?.enemy?.name }}
        </span>
        <nuxt-img format="webp" class="h-[35px] bg-[#000000] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full" src="/pve/monter-avatar.png" />
      </div>
      <BattleInfo
        :name="state?.enemy?.name"
        :damage="state?.enemy?.damage"
        :def="state?.enemy?.def"
        :receiver-hp="receiver?.enemy?.hp"
        :state-hp="state?.enemy?.hp"
        :is-enemy="true"
        class-name="items-end"
      />
    </div>
  </div>
</template>
