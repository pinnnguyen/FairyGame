<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/composables/app'
const { togglePlayerInfo } = storeToRefs(useAppStore())
</script>

<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <PlayerInfomation ref="playerInfoComponent" :class="{ '!h-[0px] opacity-0': !togglePlayerInfo }" />
      <slot name="header">
        <PageNavbar />
      </slot>
      <div class="flex-1 w-full flex flex-col bg-black">
        <div
          class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full h-full"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.body {
  background: #9e9e9e;
}

.game-center {
  max-width: calc(100vh * 0.7);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background: white;
  font-size: 14px;
  user-select: none;
}

.footer {
  max-width: calc(100vh * 0.7);
}
</style>
