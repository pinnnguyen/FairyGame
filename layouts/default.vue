<script setup>
</script>

<template>
  <div class="flex flex-col overflow-hidden font-san game-center h-screen">
    <slot name="header">
      <PageNavbar />
    </slot>
    <slot />
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
  background: #191b1e;
  font-size: 14px;
  user-select: none;
  font-weight: 600;
  touch-action: none;
  font-style: italic;
}

.footer {
  max-width: calc(100vh * 0.7);
}
</style>
