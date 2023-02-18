<script setup lang="ts">
import { LINH_CAN_RULE } from '~/config'

const { linhCan } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const currentLC = computed(() => {
  if (!linhCan.value?.kind)
    return null

  return LINH_CAN_RULE[linhCan.value?.kind]
})

const unLock = async () => {
  try {
    const resUnlock: any = await $fetch('/api/practice/linhcan')

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
  <div v-if="!currentLC" text="center" @click.stop="unLock">
    <div text="underline">
      Mở khoá
    </div>
  </div>
</template>
