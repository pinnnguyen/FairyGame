<script setup>
</script>

<template>
  <div
    flex="~ col"
    overflow="hidden"
    h="full"
    class="game-center"
  >
    <slot name="header">
      <PageNavbar />
    </slot>
    <slot />
  </div>
</template>

<style lang="scss">
.game-center {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background: #191b1e;
  font-size: 14px;
  user-select: none;
  font-weight: 600;
  touch-action: none;
  font-style: italic;
}
</style>
