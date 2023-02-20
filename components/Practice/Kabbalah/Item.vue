<script setup lang="ts">
import type { KabbalahRule, KabbalahSign } from '~/types'

const props = defineProps<{
  kabbalah: KabbalahRule
}>()

const loading = ref(false)
const { kabbalahState } = storeToRefs(usePlayerStore())
const { getPlayer } = usePlayerStore()

const isFocusInBattle = computed(() => props.kabbalah.focus === 'in_battle')
const isFocusStartBattle = computed(() => props.kabbalah.focus === 'start_battle')
const isFocusAttribute = computed(() => props.kabbalah.focus === 'attribute')

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
    <section>
      <practice-kabbalah-in-battle-focus
        v-if="isFocusInBattle"
        :kabbalah="kabbalah"
      />
      <practice-kabbalah-start-battle-focus
        v-if="isFocusStartBattle"
        :kabbalah="kabbalah"
      />
      <practice-kabbalah-attribute-focus
        v-if="isFocusAttribute"
        :kabbalah="kabbalah"
      />
    </section>
    <div
      flex="~ col"
      gap="2"
    >
      <template
        v-if="kabbalahState && kabbalahState[kabbalah.sign]"
      >
        <var-button
          v-if="isFocusInBattle && !kabbalahState[kabbalah.sign].used"
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
          v-if="isFocusInBattle && kabbalahState[kabbalah.sign].used"
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
