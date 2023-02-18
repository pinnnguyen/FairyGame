<script lang="ts" setup>
import { formatCash } from '~/common'
import { LINH_CAN_RESOURCE } from '~/config'

const { linhCan, moneyManagement } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const needResource = computed(() => {
  if (!linhCan.value?.level)
    return 0

  return formatCash(LINH_CAN_RESOURCE.CHAN_NGUYEN * linhCan.value?.level)
})

const upgrade = async () => {
  try {
    const upgradeRes: any = await $fetch('/api/practice/linhcan/upgrade')
    console.log('upgradeRes', upgradeRes)
    sendMessage(upgradeRes?.message)
    if (upgradeRes?.success)
      await getPlayer()
  }
  catch (e: any) {
    sendMessage(e?.statusMessage)
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
  <div text="center">
    <var-button
      size="mini"
      class="!text-[#333]"
      @click.stop="upgrade"
    >
      Tôi luyện
    </var-button>
  </div>
</template>
