<script setup>
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden game-center">
    <slot name="header">
      <PageNavbar />
    </slot>
    <div class="flex-1 w-full flex flex-col bg-white">
      <div
        class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full h-full"
      >
        <slot />
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
  font-weight: 600;
}

.footer {
  max-width: calc(100vh * 0.7);
}
</style>
