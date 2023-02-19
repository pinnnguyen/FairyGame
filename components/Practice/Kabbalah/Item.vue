<script setup lang="ts">
defineProps<{
  kabbalah: any
}>()

const convertTitleTemplate = (str: string, kabbalah: any, level: number) => {
  return str
    .replace('#rate', `${kabbalah.rate}%`)
    .replace('#value', `${kabbalah.value + (level * kabbalah.valueOnLevel)}%`)
    .replace('#targetNum', `${kabbalah?.target?.num}`)
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
      <var-button
        v-if="kabbalah.focus === 'in_battle'"
        class="!text-[#333]"
        size="mini"
      >
        Trang bị
      </var-button>
      <var-button
        size="mini"
        class="!text-[#333]"
      >
        Thăng cấp
      </var-button>
    </div>
  </div>
</template>
