<script lang="ts" setup>
import { SPIRITUAL_ROOT_RESOURCE } from '@game/config'
import { formatCash } from '~/common'

const { spiritualRoot, moneyManagement } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const loading = ref(false)
const needResource = computed(() => {
  if (!spiritualRoot.value?.level)
    return 0

  return formatCash(SPIRITUAL_ROOT_RESOURCE.CHAN_NGUYEN * spiritualRoot.value?.level)
})

const upgrade = async () => {
  try {
    loading.value = true
    const upgradeRes: any = await $fetch('/api/practice/spiritual-root/upgrade')
    sendNotification(upgradeRes?.message)
    if (!upgradeRes.success) {
      loading.value = false
      return
    }

    if (upgradeRes?.success) {
      await getPlayer()
      loading.value = false
    }
  }
  catch (e: any) {
    loading.value = false
    sendNotification(e?.statusMessage)
  }
}
</script>

<template>
  <div
    text="center"
    p="t-4"
  >
    <span>
      Chân nguyên {{ formatCash(moneyManagement?.chanNguyen) ?? 0 }}/ {{ needResource }}
    </span>
  </div>
  <div text="center" p="t-2">
    <var-button
      :disabled="loading"
      :loading="loading"
      loading-size="mini"
      size="mini"
      class="!text-[#333]"
      @click.stop="upgrade"
    >
      Tôi luyện
    </var-button>
  </div>
</template>
