<script setup lang="ts">
import { CLASS_RULE } from '~/config'

const { playerInfo } = usePlayerStore()
</script>

<template>
  <section
    m="y-2"
    p="3"
    w="full"
  >
    <div text="center">
      Đang phát triển
    </div>
    <!--    Huyết tộc hiện tại: {{ CLASS_RULE[playerInfo.class].name }} -->
  </section>
</template>
