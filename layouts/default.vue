<script setup>
</script>

<template>
  <div class="flex flex-col overflow-hidden game-center">
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
  background: white;
  font-size: 14px;
  user-select: none;
  font-weight: 600;
}

.footer {
  max-width: calc(100vh * 0.7);
}
</style>
