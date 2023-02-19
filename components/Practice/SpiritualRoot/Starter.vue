<script setup lang="ts">
const { spiritualRoot, currentSpiritualRoot } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const unLock = async () => {
  try {
    const resUnlock: any = await $fetch('/api/practice/spiritual-root')

    sendMessage(resUnlock.message)
    if (resUnlock.success)
      await getPlayer()
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <div v-if="!currentSpiritualRoot" text="center" @click.stop="unLock">
    <div text="underline">
      Mở khoá
    </div>
  </div>
</template>
