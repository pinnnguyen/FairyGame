<script setup lang="ts">
import type { KabbalahSign } from '~/types'

defineProps<{
  kabbalah: any
}>()

const loading = ref(false)
const { kabbalahState } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const upgrade = async (sign: KabbalahSign) => {
  loading.value = true
  const usedRes: any = await $fetch('/api/practice/kabbalah/upgrade', {
    method: 'POST',
    body: {
      sign,
    },
  })

  sendMessage(usedRes.message)
  if (usedRes.success)
    await getPlayer()

  loading.value = false
}

const used = async (sign: KabbalahSign, action: 'unused' | 'used') => {
  loading.value = true
  const usedRes: any = await $fetch('/api/practice/kabbalah/used', {
    method: 'POST',
    body: {
      sign,
      action,
    },
  })

  sendMessage(usedRes.message)
  if (usedRes.success)
    await getPlayer()

  loading.value = false
}

const unlock = async (sign: KabbalahSign) => {
  loading.value = true
  const unlockRes: any = await $fetch('/api/practice/kabbalah/unlock', {
    method: 'POST',
    body: {
      sign,
    },
  })

  sendMessage(unlockRes.message)
  if (unlockRes.success)
    await getPlayer()

  loading.value = false
}
</script>

<template>
  <div
    justify="between"
    align="items-center"
    flex="~ "
  >
    <div>
      <practice-kabbalah-in-battle-focus
        v-if="kabbalah.focus === 'in_battle'"
        :kabbalah="kabbalah"
      />
      <practice-kabbalah-start-battle-focus
        v-if="kabbalah.focus === 'start_battle'"
        :kabbalah="kabbalah"
      />
      <practice-kabbalah-attribute-focus
        v-if="kabbalah.focus === 'attribute'"
        :kabbalah="kabbalah"
      />
    </div>
    <div
      flex="~ col"
      gap="2"
    >
      <template
        v-if="kabbalahState && kabbalahState[kabbalah.sign]"
      >
        <var-button
          v-if="kabbalah.focus === 'in_battle' && !kabbalahState[kabbalah.sign].used"
          class="!text-[#333]"
          size="mini"
          :disabled="loading"
          :loading="loading"
          loading-size="mini"
          @click.stop="used(kabbalah.sign, 'used')"
        >
          Trang bị
        </var-button>
        <var-button
          v-else
          class="!text-[#333]"
          size="mini"
          :disabled="loading"
          :loading="loading"
          loading-size="mini"
          @click.stop="used(kabbalah.sign, 'unused')"
        >
          Tháo xuống
        </var-button>
        <var-button
          size="mini"
          class="!text-[#333]"
          :disabled="loading"
          :loading="loading"
          loading-size="mini"
          @click.stop="upgrade(kabbalah.sign)"
        >
          Thăng cấp
        </var-button>
      </template>
      <template
        v-else
      >
        <var-button
          class="!text-[#333]"
          size="mini"
          :loading="loading"
          :disabled="loading"
          loading-size="mini"
          @click.stop="unlock(kabbalah.sign)"
        >
          Mở khoá
        </var-button>
      </template>
    </div>
  </div>
</template>
